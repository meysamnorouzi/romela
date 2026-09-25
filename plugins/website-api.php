<?php
/**
 * Plugin Name: Website API
 * Description: REST API برای مقالات وردپرس — محتوا از ویرایشگر پیش‌فرض پست (بدون فیلد سفارشی)
 * Version: 1.0.0
 * Author: Mohammad Mehrabi
 * Company: Nova Web
 * License: GPL2
 * Plugin URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Author URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Public website/v1 API around the default WordPress post type.
 * Post body is apply_filters('the_content') — classic / block editor HTML only.
 */
class Website_API {

    private static $instance = null;

    const NS = 'website/v1';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_routes'], 20);
    }

    public function register_routes() {
        register_rest_route(self::NS, '/post-list', [
            'methods' => 'GET',
            'callback' => [$this, 'get_post_list'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(self::NS, '/post-search', [
            'methods' => 'GET',
            'callback' => [$this, 'get_post_search'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(self::NS, '/post-by-slug/(?P<slug>[^/]+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_post_by_slug'],
            'permission_callback' => '__return_true',
            'args' => [
                'slug' => [
                    'required' => true,
                    'type' => 'string',
                ],
            ],
        ]);

        register_rest_route(self::NS, '/categories', [
            'methods' => 'GET',
            'callback' => [$this, 'get_categories'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(self::NS, '/tags', [
            'methods' => 'GET',
            'callback' => [$this, 'get_tags'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_post_list(WP_REST_Request $request) {
        $query = $this->query_posts($request);
        return rest_ensure_response([
            'total' => (int) $query->found_posts,
            'page' => (int) $query->get('paged') ?: 1,
            'per_page' => (int) $query->get('posts_per_page'),
            'posts' => $this->format_posts($query->posts, $this->should_include_content($request, true)),
        ]);
    }

    public function get_post_search(WP_REST_Request $request) {
        $q = trim((string) $request->get_param('q'));
        $query = $this->query_posts($request, $q);
        return rest_ensure_response([
            'query' => $q,
            'total' => (int) $query->found_posts,
            'page' => (int) $query->get('paged') ?: 1,
            'per_page' => (int) $query->get('posts_per_page'),
            'posts' => $this->format_posts($query->posts, $this->should_include_content($request, true)),
        ]);
    }

    public function get_post_by_slug(WP_REST_Request $request) {
        $slug = $this->normalize_slug((string) $request->get_param('slug'));
        $post = $this->find_post_by_slug($slug);

        if (!$post) {
            return new WP_Error('not_found', 'Post not found', ['status' => 404]);
        }

        return rest_ensure_response($this->format_post($post, true));
    }

    public function get_categories(WP_REST_Request $request) {
        return $this->get_terms($request, 'category', 'categories');
    }

    public function get_tags(WP_REST_Request $request) {
        return $this->get_terms($request, 'post_tag', 'tags');
    }

    private function get_terms(WP_REST_Request $request, $taxonomy, $list_key) {
        $page = max(1, (int) ($request->get_param('page') ?: 1));
        $per_page = min(200, max(1, (int) ($request->get_param('per_page') ?: 20)));
        $hide_empty = $this->to_bool($request->get_param('hide_empty'), false);
        $posts_per = max(0, (int) ($request->get_param($taxonomy === 'category' ? 'posts_per_category' : 'posts_per_tag') ?: 0));

        $terms = get_terms([
            'taxonomy' => $taxonomy,
            'hide_empty' => $hide_empty,
            'number' => $per_page,
            'offset' => ($page - 1) * $per_page,
        ]);

        if (is_wp_error($terms)) {
            return new WP_Error('terms_error', $terms->get_error_message(), ['status' => 500]);
        }

        $total = wp_count_terms([
            'taxonomy' => $taxonomy,
            'hide_empty' => $hide_empty,
        ]);

        $items = [];
        foreach ($terms as $term) {
            $item = $this->format_term($term);
            if ($posts_per > 0) {
                $latest = get_posts([
                    'post_type' => 'post',
                    'post_status' => 'publish',
                    'numberposts' => $posts_per,
                    'tax_query' => [[
                        'taxonomy' => $taxonomy,
                        'field' => 'term_id',
                        'terms' => [$term->term_id],
                    ]],
                ]);
                $item['latest_posts'] = $this->format_posts($latest, true);
            }
            $items[] = $item;
        }

        return rest_ensure_response([
            'total' => is_wp_error($total) ? 0 : (int) $total,
            'page' => $page,
            'per_page' => $per_page,
            $list_key => $items,
        ]);
    }

    private function query_posts(WP_REST_Request $request, $search = '') {
        $page = max(1, (int) ($request->get_param('page') ?: 1));
        $per_page = min(100, max(1, (int) ($request->get_param('per_page') ?: 10)));

        $args = [
            'post_type' => 'post',
            'post_status' => 'publish',
            'paged' => $page,
            'posts_per_page' => $per_page,
            'ignore_sticky_posts' => true,
            'no_found_rows' => false,
        ];

        $id = (int) $request->get_param('id');
        if ($id > 0) {
            $args['p'] = $id;
        }

        $slug = $this->normalize_slug((string) $request->get_param('slug'));
        if ($slug !== '') {
            $args['name'] = $slug;
        }

        if ($search !== '') {
            $args['s'] = $search;
        }

        $tax_query = $this->build_tax_query($request);
        if ($tax_query) {
            $args['tax_query'] = $tax_query;
        }

        return new WP_Query($args);
    }

    private function build_tax_query(WP_REST_Request $request) {
        $tax_query = [];

        $cat_ids = $this->parse_int_list($request->get_param('category_ids') ?: $request->get_param('category_id'));
        $cat_slugs = $this->parse_slug_list($request->get_param('category_slugs') ?: $request->get_param('category_slug'));
        $cat_names = $this->parse_string_list($request->get_param('category_names') ?: $request->get_param('category_name'));

        $tag_ids = $this->parse_int_list($request->get_param('tag_ids') ?: $request->get_param('tag_id'));
        $tag_slugs = $this->parse_slug_list($request->get_param('tag_slugs') ?: $request->get_param('tag_slug'));
        $tag_names = $this->parse_string_list($request->get_param('tag_names') ?: $request->get_param('tag_name'));

        if ($cat_ids) {
            $tax_query[] = ['taxonomy' => 'category', 'field' => 'term_id', 'terms' => $cat_ids];
        }
        if ($cat_slugs) {
            $tax_query[] = ['taxonomy' => 'category', 'field' => 'slug', 'terms' => $cat_slugs];
        }
        if ($cat_names) {
            $tax_query[] = ['taxonomy' => 'category', 'field' => 'name', 'terms' => $cat_names];
        }
        if ($tag_ids) {
            $tax_query[] = ['taxonomy' => 'post_tag', 'field' => 'term_id', 'terms' => $tag_ids];
        }
        if ($tag_slugs) {
            $tax_query[] = ['taxonomy' => 'post_tag', 'field' => 'slug', 'terms' => $tag_slugs];
        }
        if ($tag_names) {
            $tax_query[] = ['taxonomy' => 'post_tag', 'field' => 'name', 'terms' => $tag_names];
        }

        if (count($tax_query) > 1) {
            $tax_query['relation'] = 'AND';
        }

        return $tax_query;
    }

    private function find_post_by_slug($slug) {
        if ($slug === '') {
            return null;
        }

        $candidates = array_values(array_unique(array_filter([
            $slug,
            urldecode($slug),
            rawurldecode($slug),
            sanitize_title($slug),
        ])));

        foreach ($candidates as $name) {
            $posts = get_posts([
                'name' => $name,
                'post_type' => 'post',
                'post_status' => 'publish',
                'numberposts' => 1,
            ]);
            if (!empty($posts)) {
                return $posts[0];
            }
        }

        return null;
    }

    private function format_posts($posts, $include_content) {
        $out = [];
        foreach ($posts as $post) {
            if ($post instanceof WP_Post) {
                $out[] = $this->format_post($post, $include_content);
            }
        }
        return $out;
    }

    /**
     * Serialize a published post. Body is default editor HTML via the_content.
     */
    private function format_post(WP_Post $post, $include_content = true) {
        $previous = $GLOBALS['post'] ?? null;
        $GLOBALS['post'] = $post;
        setup_postdata($post);

        $content = '';
        if ($include_content) {
            $content = apply_filters('the_content', $post->post_content);
        }

        $excerpt = wp_strip_all_tags(get_the_excerpt($post));

        wp_reset_postdata();
        if ($previous instanceof WP_Post) {
            $GLOBALS['post'] = $previous;
        } else {
            unset($GLOBALS['post']);
        }

        $thumb_id = get_post_thumbnail_id($post);
        $thumbnail = null;
        if ($thumb_id) {
            $thumbnail = [
                'medium' => wp_get_attachment_image_url($thumb_id, 'medium') ?: '',
                'large' => wp_get_attachment_image_url($thumb_id, 'large') ?: '',
                'full' => wp_get_attachment_image_url($thumb_id, 'full') ?: '',
            ];
        }

        $author_id = (int) $post->post_author;
        $categories = $this->format_post_terms($post->ID, 'category');
        $tags = $this->format_post_terms($post->ID, 'post_tag');

        $timestamp = get_post_time('U', true, $post);

        return [
            'id' => (int) $post->ID,
            'title' => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
            'slug' => urldecode($post->post_name),
            'excerpt' => $excerpt,
            'content' => $content,
            'author' => [
                'id' => (string) $author_id,
                'name' => get_the_author_meta('display_name', $author_id) ?: '',
                'nicename' => get_the_author_meta('user_nicename', $author_id) ?: '',
            ],
            'date' => get_the_date('Y/m/d', $post),
            'date_full' => get_the_date('Y/m/d H:i:s', $post),
            'date_unix' => $timestamp ? (int) $timestamp : 0,
            'modified_date' => get_the_modified_date('Y-m-d H:i:s', $post),
            'link' => get_permalink($post),
            'thumbnail' => $thumbnail,
            'categories' => $categories,
            'category_names' => array_values(array_map(function ($term) {
                return $term['name'];
            }, $categories)),
            'tags' => $tags,
            'tag_names' => array_values(array_map(function ($term) {
                return $term['name'];
            }, $tags)),
            'comments' => [],
            'comment_count' => (int) $post->comment_count,
        ];
    }

    private function format_post_terms($post_id, $taxonomy) {
        $terms = get_the_terms($post_id, $taxonomy);
        if (is_wp_error($terms) || empty($terms)) {
            return [];
        }

        return array_values(array_map([$this, 'format_term'], $terms));
    }

    private function format_term($term) {
        $link = get_term_link($term);
        return [
            'id' => (int) $term->term_id,
            'name' => $term->name,
            'slug' => urldecode($term->slug),
            'description' => $term->description ?: '',
            'link' => is_wp_error($link) ? '' : $link,
            'count' => isset($term->count) ? (int) $term->count : 0,
        ];
    }

    private function should_include_content(WP_REST_Request $request, $default) {
        $param = $request->get_param('include_content');
        if ($param === null || $param === '') {
            return $default;
        }
        return $this->to_bool($param, $default);
    }

    private function normalize_slug($slug) {
        $slug = trim(rawurldecode((string) $slug));
        return trim($slug, "/ \t\n\r\0\x0B");
    }

    private function parse_string_list($value) {
        if ($value === null || $value === '') {
            return [];
        }
        if (is_array($value)) {
            $parts = $value;
        } else {
            $parts = preg_split('/\s*,\s*/', (string) $value);
        }
        $out = [];
        foreach ($parts as $part) {
            $part = trim((string) $part);
            if ($part !== '') {
                $out[] = $part;
            }
        }
        return $out;
    }

    private function parse_int_list($value) {
        $out = [];
        foreach ($this->parse_string_list($value) as $part) {
            if (is_numeric($part)) {
                $out[] = (int) $part;
            }
        }
        return $out;
    }

    private function parse_slug_list($value) {
        $out = [];
        foreach ($this->parse_string_list($value) as $part) {
            $decoded = $this->normalize_slug($part);
            if ($decoded !== '') {
                $out[] = $decoded;
            }
            $encoded = rawurlencode($decoded);
            if ($encoded !== '' && $encoded !== $decoded) {
                $out[] = $encoded;
            }
        }
        return array_values(array_unique($out));
    }

    private function to_bool($value, $default = false) {
        if ($value === null || $value === '') {
            return $default;
        }
        if (is_bool($value)) {
            return $value;
        }
        $normalized = strtolower((string) $value);
        if (in_array($normalized, ['1', 'true', 'yes', 'on'], true)) {
            return true;
        }
        if (in_array($normalized, ['0', 'false', 'no', 'off'], true)) {
            return false;
        }
        return $default;
    }
}

Website_API::get_instance();
