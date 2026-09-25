<?php
/**
 * Plugin Name: WooCommerce API
 * Description: Complete REST API endpoints for WooCommerce e-commerce functionality
 * Version: 1.0.0
 * Author: Mohammad Mehrabi
 * Company: Nova Web
 * License: GPL2
 * Plugin URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Author URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Requires at least: 5.0
 * Requires PHP: 7.4
 * WC requires at least: 5.0
 * WC tested up to: 8.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define constant to indicate plugin is loaded
define('WCA_PLUGIN_LOADED', true);

// Include core file
require_once plugin_dir_path(__FILE__) . 'woocommerce-api-core.php';

/**
 * WooCommerce API Class
 */
class WooCommerce_API {
    
    private $core;
    
    /**
     * Constructor
     */
    public function __construct() {
        // Check if WooCommerce is active
        if (!$this->is_woocommerce_active()) {
            add_action('admin_notices', [$this, 'woocommerce_missing_notice']);
            return;
        }
        
        $this->core = WooCommerce_API_Core::get_instance();
        
        // Register routes with high priority to override WooCommerce defaults
        add_action('rest_api_init', [$this, 'register_routes'], 20);
    }
    
    /**
     * Check if WooCommerce is active
     */
    private function is_woocommerce_active() {
        // Check if WooCommerce class exists
        if (!class_exists('WooCommerce')) {
            return false;
        }
        
        // Check if WooCommerce is actually active (not just installed)
        if (!function_exists('is_plugin_active')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }
        
        return is_plugin_active('woocommerce/woocommerce.php');
    }
    
    /**
     * WooCommerce missing notice
     */
    public function woocommerce_missing_notice() {
        echo '<div class="error"><p><strong>WooCommerce API</strong> requires WooCommerce to be installed and active.</p></div>';
    }
    
    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Products endpoints
        $this->register_product_routes();
        
        // Categories endpoints
        $this->register_category_routes();
        
        // Orders endpoints
        $this->register_order_routes();
        
        // Cart endpoints
        $this->register_cart_routes();
        
        // Coupon endpoints
        $this->register_coupon_routes();
        
        // Review endpoints
        $this->register_review_routes();
        
        // Attribute endpoints
        $this->register_attribute_routes();
        
        // Shipping endpoints
        $this->register_shipping_routes();
        
        // Payment endpoints
        $this->register_payment_routes();
        
        // Checkout endpoint
        $this->register_checkout_routes();
    }
    
    /**
     * Register product routes
     */
    private function register_product_routes() {
        // Get products list
        register_rest_route('wca/v1', '/products', [
            'methods' => 'GET',
            'callback' => [$this, 'get_products'],
            'permission_callback' => '__return_true',
        ]);
        
        // Get single product by slug
        register_rest_route('wca/v1', '/products/slug/(?P<slug>[a-zA-Z0-9-]+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product_by_slug'],
            'permission_callback' => '__return_true',
            'args' => [
                'slug' => [
                    'required' => true,
                    'type' => 'string',
                ]
            ]
        ]);
        
        // Get single product by ID
        register_rest_route('wca/v1', '/products/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
        
        // Search products
        register_rest_route('wca/v1', '/products/search', [
            'methods' => 'GET',
            'callback' => [$this, 'search_products'],
            'permission_callback' => '__return_true',
        ]);
        
        // Get related products
        register_rest_route('wca/v1', '/products/(?P<id>\d+)/related', [
            'methods' => 'GET',
            'callback' => [$this, 'get_related_products'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
    }
    
    /**
     * Register category routes
     */
    private function register_category_routes() {
        // Get categories list
        register_rest_route('wca/v1', '/categories', [
            'methods' => 'GET',
            'callback' => [$this, 'get_categories'],
            'permission_callback' => '__return_true',
        ]);
        
        // Get single category
        register_rest_route('wca/v1', '/categories/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_category'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
        
        // Get category products
        register_rest_route('wca/v1', '/categories/(?P<id>\d+)/products', [
            'methods' => 'GET',
            'callback' => [$this, 'get_category_products'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
        
        // Get category subcategories
        register_rest_route('wca/v1', '/categories/(?P<id>\d+)/subcategories', [
            'methods' => 'GET',
            'callback' => [$this, 'get_category_subcategories'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
    }
    
    /**
     * Register order routes
     */
    private function register_order_routes() {
        // Get orders list
        register_rest_route('wca/v1', '/orders', [
            'methods' => 'GET',
            'callback' => [$this, 'get_orders'],
            'permission_callback' => [$this, 'check_user_permission'],
        ]);
        
        // Get single order
        register_rest_route('wca/v1', '/orders/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_order'],
            'permission_callback' => [$this, 'check_user_permission'],
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
        
        // Create order
        register_rest_route('wca/v1', '/orders', [
            'methods' => 'POST',
            'callback' => [$this, 'create_order'],
            'permission_callback' => [$this, 'check_user_permission'],
        ]);
        
        // Update order (admin only)
        register_rest_route('wca/v1', '/orders/(?P<id>\d+)', [
            'methods' => 'PUT',
            'callback' => [$this, 'update_order'],
            'permission_callback' => [$this, 'check_admin_permission'],
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
    }
    
    /**
     * Register cart routes
     */
    private function register_cart_routes() {
        // Get cart
        register_rest_route('wca/v1', '/cart', [
            'methods' => 'GET',
            'callback' => [$this, 'get_cart'],
            'permission_callback' => '__return_true',
        ]);
        
        // Add to cart
        register_rest_route('wca/v1', '/cart/add', [
            'methods' => 'POST',
            'callback' => [$this, 'add_to_cart'],
            'permission_callback' => '__return_true',
        ]);
        
        // Update cart item
        register_rest_route('wca/v1', '/cart/update', [
            'methods' => 'PUT',
            'callback' => [$this, 'update_cart'],
            'permission_callback' => '__return_true',
        ]);
        
        // Remove from cart
        register_rest_route('wca/v1', '/cart/remove', [
            'methods' => 'DELETE',
            'callback' => [$this, 'remove_from_cart'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    /**
     * Register coupon routes
     */
    private function register_coupon_routes() {
        // Get coupons list
        register_rest_route('wca/v1', '/coupons', [
            'methods' => 'GET',
            'callback' => [$this, 'get_coupons'],
            'permission_callback' => '__return_true',
        ]);
        
        // Validate coupon
        register_rest_route('wca/v1', '/coupons/validate', [
            'methods' => 'POST',
            'callback' => [$this, 'validate_coupon'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    /**
     * Register review routes
     */
    private function register_review_routes() {
        // Get product reviews
        register_rest_route('wca/v1', '/products/(?P<id>\d+)/reviews', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product_reviews'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
        
        // Add product review
        register_rest_route('wca/v1', '/products/(?P<id>\d+)/reviews', [
            'methods' => 'POST',
            'callback' => [$this, 'add_product_review'],
            'permission_callback' => [$this, 'check_user_permission'],
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
    }
    
    /**
     * Register attribute routes
     */
    private function register_attribute_routes() {
        // Get attributes list
        register_rest_route('wca/v1', '/attributes', [
            'methods' => 'GET',
            'callback' => [$this, 'get_attributes'],
            'permission_callback' => '__return_true',
        ]);
        
        // Get attribute terms
        register_rest_route('wca/v1', '/attributes/(?P<id>\d+)/terms', [
            'methods' => 'GET',
            'callback' => [$this, 'get_attribute_terms'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
    }
    
    /**
     * Register shipping routes
     */
    private function register_shipping_routes() {
        // Get shipping methods
        register_rest_route('wca/v1', '/shipping/methods', [
            'methods' => 'GET',
            'callback' => [$this, 'get_shipping_methods'],
            'permission_callback' => '__return_true',
        ]);
        
        // Calculate shipping
        register_rest_route('wca/v1', '/shipping/calculate', [
            'methods' => 'POST',
            'callback' => [$this, 'calculate_shipping'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    /**
     * Register payment routes
     */
    private function register_payment_routes() {
        // Get payment methods
        register_rest_route('wca/v1', '/payment/methods', [
            'methods' => 'GET',
            'callback' => [$this, 'get_payment_methods'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    /**
     * Register checkout routes
     */
    private function register_checkout_routes() {
        // Process checkout
        register_rest_route('wca/v1', '/checkout', [
            'methods' => 'POST',
            'callback' => [$this, 'process_checkout'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    /**
     * Check user permission
     */
    public function check_user_permission($request) {
        // Try to authenticate via JWT token from User Auth plugin
        $token = $this->get_token_from_request($request);
        
        if ($token) {
            // Check if User Auth plugin is available
            if (class_exists('User_Auth_Core')) {
                $core = User_Auth_Core::get_instance();
                $wp_user_id = $core->get_wp_user_id_from_token($token);
                
                if ($wp_user_id) {
                    // Set current user
                    wp_set_current_user($wp_user_id);
                    return true;
                }
            }
        }
        
        // Fallback to WordPress authentication
        if (!is_user_logged_in()) {
            return new WP_Error(
                'unauthorized',
                'Authentication required. Please provide a valid JWT token or login.',
                ['status' => 401]
            );
        }
        
        return true;
    }
    
    /**
     * Get token from request
     */
    private function get_token_from_request($request) {
        // Try Authorization header first
        $auth_header = $request->get_header('authorization');
        if ($auth_header) {
            if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
                return $matches[1];
            }
        }
        
        // Try query parameter
        $token = $request->get_param('token');
        if ($token) {
            return $token;
        }
        
        // Try JSON body
        $params = $request->get_json_params();
        if (isset($params['token'])) {
            return $params['token'];
        }
        
        return null;
    }
    
    /**
     * Check admin permission
     */
    public function check_admin_permission($request) {
        if (!current_user_can('manage_woocommerce')) {
            return new WP_Error(
                'forbidden',
                'Admin access required',
                ['status' => 403]
            );
        }
        
        return true;
    }
    
    
    /**
     * Validate and sanitize input
     */
    private function sanitize_input($data, $type = 'text') {
        switch ($type) {
            case 'email':
                return sanitize_email($data);
            case 'url':
                return esc_url_raw($data);
            case 'int':
                return intval($data);
            case 'float':
                return floatval($data);
            case 'textarea':
                return sanitize_textarea_field($data);
            case 'array':
                return is_array($data) ? array_map('sanitize_text_field', $data) : [];
            default:
                return sanitize_text_field($data);
        }
    }
    
    
    // ============================================
    // PRODUCT ENDPOINTS
    // ============================================
    
    /**
     * Get products list
     */
    public function get_products($request) {
        $per_page = min(intval($request->get_param('per_page')) ?: 12, 100); // Max 100 per page
        $page = max(intval($request->get_param('page')) ?: 1, 1);
        $category = intval($request->get_param('category'));
        $subcategory = intval($request->get_param('subcategory'));
        $tag = intval($request->get_param('tag'));
        $featured = $request->get_param('featured') === 'true';
        $on_sale = $request->get_param('on_sale') === 'true';
        $stock_status = $this->sanitize_input($request->get_param('stock_status'));
        $orderby = $this->sanitize_input($request->get_param('orderby')) ?: 'date';
        $order = strtoupper($this->sanitize_input($request->get_param('order'))) === 'ASC' ? 'ASC' : 'DESC';
        $bestseller = $request->get_param('bestseller') === 'true';
        $romela_first = $request->get_param('romela_first') === 'true';
        $attribute_id = intval($request->get_param('attribute_id'));
        $attribute_term = intval($request->get_param('attribute_term'));
        
        $args = [
            'post_type' => 'product',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'post_status' => 'publish',
            'orderby' => $orderby,
            'order' => $order,
        ];
        
        // Category filter
        if ($category) {
            $args['tax_query'][] = [
                'taxonomy' => 'product_cat',
                'field' => 'term_id',
                'terms' => $category,
            ];
        }
        
        // Subcategory filter
        if ($subcategory) {
            $args['tax_query'][] = [
                'taxonomy' => 'product_cat',
                'field' => 'term_id',
                'terms' => $subcategory,
            ];
        }
        
        // Tag filter
        if ($tag) {
            $args['tax_query'][] = [
                'taxonomy' => 'product_tag',
                'field' => 'term_id',
                'terms' => $tag,
            ];
        }
        
        // Featured filter
        if ($featured) {
            $args['tax_query'][] = [
                'taxonomy' => 'product_visibility',
                'field' => 'name',
                'terms' => 'featured',
            ];
        }
        
        // Stock status filter
        if ($stock_status) {
            $args['meta_query'][] = [
                'key' => '_stock_status',
                'value' => $stock_status,
            ];
        }
        
        // On sale filter
        if ($on_sale) {
            $args['meta_query'][] = [
                'key' => '_sale_price',
                'value' => '',
                'compare' => '!=',
            ];
        }
        
        // Bestseller filter
        if ($bestseller) {
            $args['meta_query'][] = [
                'key' => '_product_is_bestseller',
                'value' => 'yes',
                'compare' => '=',
            ];
        }
        
        // Romela first filter
        if ($romela_first) {
            $args['meta_query'][] = [
                'key' => '_product_is_romela_first',
                'value' => 'yes',
                'compare' => '=',
            ];
        }
        
        // Attribute filter
        if ($attribute_id && $attribute_term) {
            // Get attribute name from attribute_id
            $attribute_taxonomies = wc_get_attribute_taxonomies();
            $attribute_taxonomy = null;
            
            foreach ($attribute_taxonomies as $attr) {
                if (intval($attr->attribute_id) === $attribute_id) {
                    $attribute_taxonomy = wc_attribute_taxonomy_name($attr->attribute_name);
                    break;
                }
            }
            
            if ($attribute_taxonomy && taxonomy_exists($attribute_taxonomy)) {
                $args['tax_query'][] = [
                    'taxonomy' => $attribute_taxonomy,
                    'field' => 'term_id',
                    'terms' => $attribute_term,
                ];
            }
        }
        
        $query = new WP_Query($args);
        $products = [];
        
        foreach ($query->posts as $post) {
            try {
                $product = wc_get_product($post->ID);
                if ($product) {
                    $formatted_product = $this->core->format_product_data($product, false);
                    if ($formatted_product && !is_wp_error($formatted_product)) {
                        $products[] = $formatted_product;
                    }
                }
            } catch (Exception $e) {
                // Skip this product if there's an error and continue with next
                continue;
            }
        }
        
        return [
            'total' => $query->found_posts,
            'page' => $page,
            'per_page' => $per_page,
            'products' => $products,
        ];
    }
    
    /**
     * Get single product
     */
    public function get_product($request) {
        $product_id = intval($request->get_param('id'));
        // Default to true for variable products, allow override
        $include_variations = $request->get_param('include_variations') !== 'false';
        
        $product = wc_get_product($product_id);
        
        if (!$product) {
            return new WP_Error('not_found', 'Product not found', ['status' => 404]);
        }
        
        // For variable products, always include variations by default
        if ($product->is_type('variable') && $include_variations) {
            return $this->core->format_product_data($product, true);
        }
        
        return $this->core->format_product_data($product, $include_variations);
    }
    
    /**
     * Get single product by slug
     */
    public function get_product_by_slug($request) {
        $slug = sanitize_text_field($request->get_param('slug'));
        // Default to true for variable products, allow override
        $include_variations = $request->get_param('include_variations') !== 'false';
        
        if (empty($slug)) {
            return new WP_Error('missing_slug', 'Product slug is required', ['status' => 400]);
        }
        
        // Get product by slug
        $args = [
            'post_type' => 'product',
            'post_status' => 'publish',
            'name' => $slug,
            'posts_per_page' => 1,
        ];
        
        $query = new WP_Query($args);
        
        if (!$query->have_posts()) {
            return new WP_Error('not_found', 'Product not found', ['status' => 404]);
        }
        
        $post = $query->posts[0];
        $product = wc_get_product($post->ID);
        
        if (!$product) {
            return new WP_Error('not_found', 'Product not found', ['status' => 404]);
        }
        
        // For variable products, always include variations by default
        if ($product->is_type('variable') && $include_variations) {
            return $this->core->format_product_data($product, true);
        }
        
        return $this->core->format_product_data($product, $include_variations);
    }
    
    /**
     * Search products
     */
    public function search_products($request) {
        $query = $this->sanitize_input($request->get_param('q'));
        
        if (empty($query) || strlen($query) < 2) {
            return new WP_Error('missing_query', 'Search query must be at least 2 characters', ['status' => 400]);
        }
        
        // Prevent SQL injection by limiting query length
        if (strlen($query) > 100) {
            $query = substr($query, 0, 100);
        }
        
        $per_page = intval($request->get_param('per_page')) ?: 12;
        $page = intval($request->get_param('page')) ?: 1;
        
        $args = [
            'post_type' => 'product',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'post_status' => 'publish',
            's' => $query,
        ];
        
        $wp_query = new WP_Query($args);
        $products = [];
        
        foreach ($wp_query->posts as $post) {
            $product = wc_get_product($post->ID);
            if ($product) {
                $products[] = $this->core->format_product_data($product, false);
            }
        }
        
        return [
            'query' => $query,
            'total' => $wp_query->found_posts,
            'page' => $page,
            'per_page' => $per_page,
            'products' => $products,
        ];
    }
    
    /**
     * Get related products
     */
    public function get_related_products($request) {
        $product_id = intval($request->get_param('id'));
        $limit = intval($request->get_param('limit')) ?: 4;
        
        $product = wc_get_product($product_id);
        
        if (!$product) {
            return new WP_Error('not_found', 'Product not found', ['status' => 404]);
        }
        
        $related_ids = wc_get_related_products($product_id, $limit);
        $products = [];
        
        foreach ($related_ids as $related_id) {
            $related_product = wc_get_product($related_id);
            if ($related_product) {
                $products[] = $this->core->format_product_data($related_product, false);
            }
        }
        
        return [
            'product_id' => $product_id,
            'related_products' => $products,
        ];
    }
    
    // ============================================
    // CATEGORY ENDPOINTS
    // ============================================
    
    /**
     * Get categories list
     */
    public function get_categories($request) {
        $per_page = intval($request->get_param('per_page')) ?: 20;
        $page = intval($request->get_param('page')) ?: 1;
        $include_all = $request->get_param('include_all') === 'true';
        $hide_empty = $include_all ? false : ($request->get_param('hide_empty') !== 'false');
        $parent = intval($request->get_param('parent'));
        $include_subcategories = $request->get_param('include_subcategories') === 'true';
        
        $args = [
            'taxonomy' => 'product_cat',
            'hide_empty' => $hide_empty,
            'number' => $per_page,
            'offset' => ($page - 1) * $per_page,
        ];
        
        if ($parent >= 0) {
            $args['parent'] = $parent;
        }
        
        $categories = get_terms($args);
        $formatted_categories = [];
        
        if (!is_wp_error($categories)) {
            foreach ($categories as $category) {
                $formatted_categories[] = $this->core->format_category_data($category, $include_subcategories);
            }
        }
        
        $total = wp_count_terms('product_cat', ['hide_empty' => $hide_empty]);
        
        return [
            'total' => $total,
            'page' => $page,
            'per_page' => $per_page,
            'categories' => $formatted_categories,
        ];
    }
    
    /**
     * Get single category
     */
    public function get_category($request) {
        $category_id = intval($request->get_param('id'));
        $include_subcategories = $request->get_param('include_subcategories') !== 'false'; // Default: true
        
        $category = get_term($category_id, 'product_cat');
        
        if (!$category || is_wp_error($category)) {
            return new WP_Error('not_found', 'Category not found', ['status' => 404]);
        }
        
        return $this->core->format_category_data($category, $include_subcategories);
    }
    
    /**
     * Get category products
     */
    public function get_category_products($request) {
        $category_id = intval($request->get_param('id'));
        $per_page = intval($request->get_param('per_page')) ?: 12;
        $page = intval($request->get_param('page')) ?: 1;
        
        $category = get_term($category_id, 'product_cat');
        
        if (!$category || is_wp_error($category)) {
            return new WP_Error('not_found', 'Category not found', ['status' => 404]);
        }
        
        $args = [
            'post_type' => 'product',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'post_status' => 'publish',
            'tax_query' => [
                [
                    'taxonomy' => 'product_cat',
                    'field' => 'term_id',
                    'terms' => $category_id,
                ],
            ],
        ];
        
        $query = new WP_Query($args);
        $products = [];
        
        foreach ($query->posts as $post) {
            $product = wc_get_product($post->ID);
            if ($product) {
                $products[] = $this->core->format_product_data($product, false);
            }
        }
        
        return [
            'category' => $this->core->format_category_data($category),
            'total' => $query->found_posts,
            'page' => $page,
            'per_page' => $per_page,
            'products' => $products,
        ];
    }
    
    /**
     * Get category subcategories
     */
    public function get_category_subcategories($request) {
        $category_id = intval($request->get_param('id'));
        $per_page = min(max(intval($request->get_param('per_page')) ?: 50, 1), 200); // Max 200 per page
        $page = max(intval($request->get_param('page')) ?: 1, 1);
        $hide_empty = $request->get_param('hide_empty') !== 'false';
        
        // Validate parent category exists
        $parent_category = get_term($category_id, 'product_cat');
        
        if (!$parent_category || is_wp_error($parent_category)) {
            return new WP_Error('not_found', 'Category not found', ['status' => 404]);
        }
        
        // Get subcategories
        $args = [
            'taxonomy' => 'product_cat',
            'parent' => $category_id,
            'hide_empty' => $hide_empty,
            'number' => $per_page,
            'offset' => ($page - 1) * $per_page,
            'orderby' => 'name',
            'order' => 'ASC',
        ];
        
        $subcategories = get_terms($args);
        $formatted_subcategories = [];
        
        if (!is_wp_error($subcategories) && is_array($subcategories)) {
            foreach ($subcategories as $subcategory) {
                $formatted_subcategories[] = $this->core->format_category_data($subcategory, false);
            }
        }
        
        // Get total count
        $total = wp_count_terms('product_cat', [
            'parent' => $category_id,
            'hide_empty' => $hide_empty,
        ]);
        
        if (is_wp_error($total)) {
            $total = count($subcategories);
        }
        
        return [
            'parent_category' => $this->core->format_category_data($parent_category, false),
            'total' => intval($total),
            'page' => $page,
            'per_page' => $per_page,
            'total_pages' => $per_page > 0 ? ceil($total / $per_page) : 0,
            'subcategories' => $formatted_subcategories,
        ];
    }
    
    // ============================================
    // ORDER ENDPOINTS
    // ============================================
    
    /**
     * Get orders list
     */
    public function get_orders($request) {
        // Authenticate user (supports both JWT and WordPress auth)
        $auth_result = $this->check_user_permission($request);
        if (is_wp_error($auth_result)) {
            return $auth_result;
        }
        
        $user_id = get_current_user_id();
        
        if (!$user_id) {
            return new WP_Error('unauthorized', 'Authentication required', ['status' => 401]);
        }
        
        $per_page = intval($request->get_param('per_page')) ?: 10;
        $page = intval($request->get_param('page')) ?: 1;
        $status = sanitize_text_field($request->get_param('status'));
        
        $args = [
            'customer_id' => $user_id,
            'limit' => $per_page,
            'page' => $page,
            'orderby' => 'date',
            'order' => 'DESC',
        ];
        
        if ($status) {
            $args['status'] = $status;
        }
        
        $orders = wc_get_orders($args);
        $formatted_orders = [];
        
        foreach ($orders as $order) {
            $formatted_orders[] = $this->core->format_order_data($order);
        }
        
        return [
            'total' => count($orders),
            'page' => $page,
            'per_page' => $per_page,
            'orders' => $formatted_orders,
        ];
    }
    
    /**
     * Get single order
     */
    public function get_order($request) {
        // Authenticate user (supports both JWT and WordPress auth)
        $auth_result = $this->check_user_permission($request);
        if (is_wp_error($auth_result)) {
            return $auth_result;
        }
        
        $order_id = intval($request->get_param('id'));
        $user_id = get_current_user_id();
        
        if (!$user_id) {
            return new WP_Error('unauthorized', 'Authentication required', ['status' => 401]);
        }
        
        $order = wc_get_order($order_id);
        
        if (!$order) {
            return new WP_Error('not_found', 'Order not found', ['status' => 404]);
        }
        
        // Check if user owns this order
        if ($order->get_customer_id() != $user_id && !current_user_can('manage_woocommerce')) {
            return new WP_Error('forbidden', 'Access denied', ['status' => 403]);
        }
        
        return $this->core->format_order_data($order);
    }
    
    /**
     * Create order
     */
    public function create_order($request) {
        $user_id = get_current_user_id();
        
        if (!$user_id) {
            return new WP_Error('unauthorized', 'Authentication required', ['status' => 401]);
        }
        
        $params = $request->get_json_params();
        
        // Create order
        $order = wc_create_order();
        
        if (is_wp_error($order)) {
            return $order;
        }
        
        // Set customer
        $order->set_customer_id($user_id);
        
        // Add line items
        if (isset($params['line_items']) && is_array($params['line_items'])) {
            foreach ($params['line_items'] as $item) {
                $product_id = intval($item['product_id']);
                $quantity = intval($item['quantity']);
                $variation_id = isset($item['variation_id']) ? intval($item['variation_id']) : 0;
                
                if ($variation_id) {
                    $order->add_product(wc_get_product($variation_id), $quantity);
                } else {
                    $order->add_product(wc_get_product($product_id), $quantity);
                }
            }
        }
        
        // Set billing address
        if (isset($params['billing'])) {
            $order->set_billing_address_1($params['billing']['address_1'] ?? '');
            $order->set_billing_city($params['billing']['city'] ?? '');
            $order->set_billing_state($params['billing']['state'] ?? '');
            $order->set_billing_postcode($params['billing']['postcode'] ?? '');
            $order->set_billing_country($params['billing']['country'] ?? '');
            $order->set_billing_email($params['billing']['email'] ?? '');
            $order->set_billing_phone($params['billing']['phone'] ?? '');
        }
        
        // Set shipping address
        if (isset($params['shipping'])) {
            $order->set_shipping_address_1($params['shipping']['address_1'] ?? '');
            $order->set_shipping_city($params['shipping']['city'] ?? '');
            $order->set_shipping_state($params['shipping']['state'] ?? '');
            $order->set_shipping_postcode($params['shipping']['postcode'] ?? '');
            $order->set_shipping_country($params['shipping']['country'] ?? '');
        }
        
        // Set payment method
        if (isset($params['payment_method'])) {
            $order->set_payment_method($params['payment_method']);
        }
        
        // Apply coupon
        if (isset($params['coupon_code'])) {
            $order->apply_coupon($params['coupon_code']);
        }
        
        // Calculate totals
        $order->calculate_totals();
        
        // Save order
        $order->save();
        
        return $this->core->format_order_data($order);
    }
    
    // ============================================
    // CART ENDPOINTS
    // ============================================
    
    /**
     * Get cart
     */
    public function get_cart($request) {
        if (!WC()->cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', ['status' => 500]);
        }
        
        $cart = WC()->cart;
        $cart_items = [];
        
        foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
            $product = $cart_item['data'];
            $cart_items[] = [
                'key' => $cart_item_key,
                'product_id' => $cart_item['product_id'],
                'variation_id' => $cart_item['variation_id'],
                'quantity' => $cart_item['quantity'],
                'name' => $product->get_name(),
                'price' => $product->get_price(),
                'subtotal' => $cart_item['line_subtotal'],
                'total' => $cart_item['line_total'],
                'image' => wp_get_attachment_image_url($product->get_image_id(), 'medium'),
            ];
        }
        
        return [
            'items' => $cart_items,
            'subtotal' => $cart->get_subtotal(),
            'total' => $cart->get_total(''),
            'total_tax' => $cart->get_total_tax(),
            'item_count' => $cart->get_cart_contents_count(),
        ];
    }
    
    /**
     * Add to cart
     */
    public function add_to_cart($request) {
        $params = $request->get_json_params();
        
        $product_id = intval($params['product_id'] ?? 0);
        $quantity = max(1, min(intval($params['quantity'] ?? 1), 100)); // Limit quantity between 1-100
        $variation_id = isset($params['variation_id']) ? intval($params['variation_id']) : 0;
        $variation = isset($params['variation']) && is_array($params['variation']) ? array_map([$this, 'sanitize_input'], $params['variation']) : [];
        
        if (!$product_id) {
            return new WP_Error('missing_product_id', 'Product ID is required', ['status' => 400]);
        }
        
        // Validate product exists
        $product = wc_get_product($product_id);
        if (!$product) {
            return new WP_Error('invalid_product', 'Product not found', ['status' => 404]);
        }
        
        // Check if product is purchasable
        if (!$product->is_purchasable()) {
            return new WP_Error('not_purchasable', 'Product is not purchasable', ['status' => 400]);
        }
        
        // Check stock
        if (!$product->is_in_stock()) {
            return new WP_Error('out_of_stock', 'Product is out of stock', ['status' => 400]);
        }
        
        // Check quantity vs stock
        if ($product->get_manage_stock() && $product->get_stock_quantity() < $quantity) {
            return new WP_Error('insufficient_stock', 'Insufficient stock available', ['status' => 400]);
        }
        
        if (!WC()->cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', ['status' => 500]);
        }
        
        $result = false;
        
        if ($variation_id) {
            $result = WC()->cart->add_to_cart($product_id, $quantity, $variation_id, $variation);
        } else {
            $result = WC()->cart->add_to_cart($product_id, $quantity);
        }
        
        if (!$result) {
            return new WP_Error('add_to_cart_failed', 'Failed to add product to cart', ['status' => 400]);
        }
        
        return [
            'success' => true,
            'message' => 'Product added to cart',
            'cart_item_key' => $result,
        ];
    }
    
    /**
     * Update cart
     */
    public function update_cart($request) {
        $params = $request->get_json_params();
        
        $cart_item_key = sanitize_text_field($params['cart_item_key'] ?? '');
        $quantity = intval($params['quantity'] ?? 0);
        
        if (empty($cart_item_key)) {
            return new WP_Error('missing_cart_item_key', 'Cart item key is required', ['status' => 400]);
        }
        
        if (!WC()->cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', ['status' => 500]);
        }
        
        if ($quantity <= 0) {
            WC()->cart->remove_cart_item($cart_item_key);
            return [
                'success' => true,
                'message' => 'Item removed from cart',
            ];
        }
        
        $result = WC()->cart->set_quantity($cart_item_key, $quantity);
        
        if (!$result) {
            return new WP_Error('update_cart_failed', 'Failed to update cart', ['status' => 400]);
        }
        
        return [
            'success' => true,
            'message' => 'Cart updated successfully',
        ];
    }
    
    /**
     * Remove from cart
     */
    public function remove_from_cart($request) {
        $params = $request->get_json_params();
        
        $cart_item_key = sanitize_text_field($params['cart_item_key'] ?? '');
        
        if (empty($cart_item_key)) {
            return new WP_Error('missing_cart_item_key', 'Cart item key is required', ['status' => 400]);
        }
        
        if (!WC()->cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', ['status' => 500]);
        }
        
        $result = WC()->cart->remove_cart_item($cart_item_key);
        
        if (!$result) {
            return new WP_Error('remove_from_cart_failed', 'Failed to remove item from cart', ['status' => 400]);
        }
        
        return [
            'success' => true,
            'message' => 'Item removed from cart',
        ];
    }
    
    // ============================================
    // COUPON ENDPOINTS
    // ============================================
    
    /**
     * Get coupons list
     */
    public function get_coupons($request) {
        $per_page = intval($request->get_param('per_page')) ?: 20;
        $page = intval($request->get_param('page')) ?: 1;
        
        $args = [
            'posts_per_page' => $per_page,
            'paged' => $page,
            'post_type' => 'shop_coupon',
            'post_status' => 'publish',
        ];
        
        $query = new WP_Query($args);
        $coupons = [];
        
        foreach ($query->posts as $post) {
            $coupon = new WC_Coupon($post->ID);
            if ($coupon) {
                $coupons[] = $this->core->format_coupon_data($coupon);
            }
        }
        
        return [
            'total' => $query->found_posts,
            'page' => $page,
            'per_page' => $per_page,
            'coupons' => $coupons,
        ];
    }
    
    /**
     * Validate coupon
     */
    public function validate_coupon($request) {
        $params = $request->get_json_params();
        
        $code = $this->sanitize_input($params['code'] ?? '');
        $cart_total = max(0, floatval($params['cart_total'] ?? 0));
        
        if (empty($code) || strlen($code) > 50) {
            return new WP_Error('invalid_code', 'Invalid coupon code', ['status' => 400]);
        }
        
        $coupon = new WC_Coupon($code);
        
        if (!$coupon->get_id()) {
            return new WP_Error('invalid_coupon', 'Invalid coupon code', ['status' => 404]);
        }
        
        // Check if coupon is valid
        $is_valid = $coupon->is_valid();
        
        if (!$is_valid) {
            return new WP_Error('coupon_invalid', 'Coupon is not valid', ['status' => 400]);
        }
        
        // Calculate discount
        $discount = 0;
        if ($cart_total > 0) {
            if ($coupon->get_discount_type() === 'percent') {
                $discount = ($cart_total * $coupon->get_amount()) / 100;
            } else {
                $discount = $coupon->get_amount();
            }
        }
        
        return [
            'valid' => true,
            'code' => $code,
            'discount_type' => $coupon->get_discount_type(),
            'discount_amount' => $coupon->get_amount(),
            'calculated_discount' => $discount,
            'coupon' => $this->core->format_coupon_data($coupon),
        ];
    }
    
    // ============================================
    // REVIEW ENDPOINTS
    // ============================================
    
    /**
     * Get product reviews
     */
    public function get_product_reviews($request) {
        $product_id = intval($request->get_param('id'));
        $per_page = min(max(intval($request->get_param('per_page')) ?: 10, 1), 100); // Between 1-100
        $page = max(intval($request->get_param('page')) ?: 1, 1);
        
        // Validate product exists
        $product = wc_get_product($product_id);
        
        if (!$product) {
            return new WP_Error('not_found', 'Product not found', ['status' => 404]);
        }
        
        // Get reviews with pagination
        $result = $this->core->get_product_reviews($product_id, $per_page, $page);
        
        return [
            'product_id' => $product_id,
            'total' => $result['total'],
            'page' => $result['page'],
            'per_page' => $result['per_page'],
            'total_pages' => $result['total_pages'],
            'reviews' => $result['reviews'],
        ];
    }
    
    /**
     * Add product review
     */
    public function add_product_review($request) {
        // Authenticate user (supports both JWT and WordPress auth)
        $auth_result = $this->check_user_permission($request);
        if (is_wp_error($auth_result)) {
            return $auth_result;
        }
        
        $product_id = intval($request->get_param('id'));
        $user_id = get_current_user_id();
        
        if (!$user_id) {
            return new WP_Error('unauthorized', 'Authentication required', ['status' => 401]);
        }
        
        // Check if user already reviewed this product
        $existing_review = get_comments([
            'post_id' => $product_id,
            'author_email' => wp_get_current_user()->user_email,
            'type' => 'review',
            'count' => true,
        ]);
        
        if ($existing_review > 0) {
            return new WP_Error('already_reviewed', 'You have already reviewed this product', ['status' => 400]);
        }
        
        $params = $request->get_json_params();
        
        $rating = intval($params['rating'] ?? 5);
        $comment = $this->sanitize_input($params['comment'] ?? '', 'textarea');
        $title = $this->sanitize_input($params['title'] ?? '');
        
        if (empty($comment) || strlen($comment) < 10) {
            return new WP_Error('invalid_comment', 'Comment must be at least 10 characters', ['status' => 400]);
        }
        
        if (strlen($comment) > 2000) {
            return new WP_Error('comment_too_long', 'Comment is too long (max 2000 characters)', ['status' => 400]);
        }
        
        if ($rating < 1 || $rating > 5) {
            return new WP_Error('invalid_rating', 'Rating must be between 1 and 5', ['status' => 400]);
        }
        
        // Validate product exists
        $product = wc_get_product($product_id);
        if (!$product) {
            return new WP_Error('not_found', 'Product not found', ['status' => 404]);
        }
        
        $user = get_userdata($user_id);
        
        $comment_data = [
            'comment_post_ID' => $product_id,
            'comment_author' => $user->display_name,
            'comment_author_email' => $user->user_email,
            'comment_content' => $comment,
            'comment_type' => 'review',
            'comment_parent' => 0,
            'user_id' => $user_id,
            'comment_approved' => 0, // Requires moderation
        ];
        
        $comment_id = wp_insert_comment($comment_data);
        
        if (is_wp_error($comment_id)) {
            return $comment_id;
        }
        
        // Add rating
        update_comment_meta($comment_id, 'rating', $rating);
        
        // Add title if provided
        if ($title) {
            update_comment_meta($comment_id, 'title', $title);
        }
        
        // Verify purchase
        $verified = wc_customer_bought_product($user->user_email, $user_id, $product_id);
        if ($verified) {
            update_comment_meta($comment_id, 'verified', 1);
        }
        
        return [
            'success' => true,
            'message' => 'Review submitted successfully. It will be published after moderation.',
            'review_id' => $comment_id,
        ];
    }
    
    // ============================================
    // ATTRIBUTE ENDPOINTS
    // ============================================
    
    /**
     * Get attributes list
     */
    public function get_attributes($request) {
        $attributes = wc_get_attribute_taxonomies();
        $formatted_attributes = [];
        
        foreach ($attributes as $attribute) {
            // Get terms count for this attribute
            $taxonomy = wc_attribute_taxonomy_name($attribute->attribute_name);
            $terms_count = 0;
            if (taxonomy_exists($taxonomy)) {
                $terms_count = wp_count_terms($taxonomy);
                if (is_wp_error($terms_count)) {
                    $terms_count = 0;
                }
            }
            
            $formatted_attributes[] = [
                'id' => intval($attribute->attribute_id),
                'attribute_id' => intval($attribute->attribute_id),
                'name' => $attribute->attribute_name,
                'slug' => 'pa_' . $attribute->attribute_name,
                'label' => $attribute->attribute_label,
                'type' => $attribute->attribute_type,
                'orderby' => $attribute->attribute_orderby,
                'public' => intval($attribute->attribute_public) === 1,
                'has_archives' => intval($attribute->attribute_public) === 1,
                'terms_count' => intval($terms_count),
            ];
        }
        
        return [
            'total' => count($formatted_attributes),
            'attributes' => $formatted_attributes,
        ];
    }
    
    /**
     * Get attribute terms
     */
    public function get_attribute_terms($request) {
        $attribute_id = intval($request->get_param('id'));
        $per_page = min(max(intval($request->get_param('per_page')) ?: 100, 1), 500); // Max 500 per page
        $page = max(intval($request->get_param('page')) ?: 1, 1);
        $include_all = $request->get_param('include_all') === 'true';
        $hide_empty = $include_all ? false : ($request->get_param('hide_empty') !== 'true'); // Default: show all terms
        
        // Get attribute from taxonomies list (more reliable than wc_get_attribute)
        $attributes = wc_get_attribute_taxonomies();
        $attribute = null;
        
        foreach ($attributes as $attr) {
            if (intval($attr->attribute_id) === $attribute_id) {
                $attribute = $attr;
                break;
            }
        }
        
        if (!$attribute) {
            return new WP_Error('not_found', 'Attribute not found', ['status' => 404]);
        }
        
        $taxonomy = wc_attribute_taxonomy_name($attribute->attribute_name);
        $is_taxonomy = taxonomy_exists($taxonomy);
        
        $formatted_terms = [];
        $total = 0;
        
        // If it's a taxonomy attribute, get all terms (even if not assigned to any product)
        if ($is_taxonomy) {
            // Get total count
            $total = wp_count_terms($taxonomy, ['hide_empty' => $hide_empty]);
            if (is_wp_error($total)) {
                $total = 0;
            }
            
            // Calculate offset
            $offset = ($page - 1) * $per_page;
            
            // Get terms with pagination
            // Use attribute's orderby setting
            $orderby = 'name'; // default
            if (isset($attribute->attribute_orderby)) {
                switch ($attribute->attribute_orderby) {
                    case 'menu_order':
                        $orderby = 'menu_order';
                        break;
                    case 'name_num':
                        $orderby = 'name';
                        break;
                    case 'id':
                        $orderby = 'term_id';
                        break;
                    default:
                        $orderby = 'name';
                }
            }
            
            $args = [
                'taxonomy' => $taxonomy,
                'hide_empty' => $hide_empty,
                'number' => $per_page,
                'offset' => $offset,
                'orderby' => $orderby,
                'order' => 'ASC',
            ];
            
            $terms = get_terms($args);
            
            if (!is_wp_error($terms) && is_array($terms)) {
                foreach ($terms as $term) {
                    $formatted_terms[] = [
                        'id' => intval($term->term_id),
                        'term_id' => intval($term->term_id),
                        'name' => $term->name,
                        'slug' => $term->slug,
                        'description' => $term->description ?: '',
                        'count' => intval($term->count),
                        'term_group' => intval($term->term_group),
                        'parent' => intval($term->parent),
                    ];
                }
            }
        } else {
            // For non-taxonomy attributes, collect all unique options from products
            $attribute_slug = 'attribute_' . $attribute->attribute_name;
            $all_options = [];
            
            // Query all products that have this attribute
            $args = [
                'post_type' => 'product',
                'post_status' => 'publish',
                'posts_per_page' => -1,
                'meta_query' => [
                    [
                        'key' => $attribute_slug,
                        'compare' => 'EXISTS',
                    ],
                ],
            ];
            
            $products = get_posts($args);
            
            foreach ($products as $product_post) {
                $product = wc_get_product($product_post->ID);
                if (!$product) {
                    continue;
                }
                
                $attributes = $product->get_attributes();
                if (isset($attributes[$attribute_slug])) {
                    $attribute_obj = $attributes[$attribute_slug];
                    if (!$attribute_obj->is_taxonomy()) {
                        $options = $attribute_obj->get_options();
                        if (is_array($options)) {
                            foreach ($options as $option) {
                                if (!empty($option) && !in_array($option, $all_options)) {
                                    $all_options[] = $option;
                                }
                            }
                        }
                    }
                }
            }
            
            // Sort and format options
            sort($all_options);
            $total = count($all_options);
            
            // Apply pagination
            $offset = ($page - 1) * $per_page;
            $paginated_options = array_slice($all_options, $offset, $per_page);
            
            foreach ($paginated_options as $index => $option) {
                $formatted_terms[] = [
                    'id' => $offset + $index + 1, // Sequential ID for non-taxonomy options
                    'name' => $option,
                    'slug' => sanitize_title($option),
                    'description' => '',
                    'count' => 0, // We don't track count for non-taxonomy options
                    'term_group' => 0,
                    'parent' => 0,
                ];
            }
        }
        
        return [
            'attribute' => [
                'id' => intval($attribute->attribute_id),
                'attribute_id' => intval($attribute->attribute_id),
                'name' => $attribute->attribute_name,
                'slug' => 'pa_' . $attribute->attribute_name,
                'label' => $attribute->attribute_label,
                'type' => $attribute->attribute_type,
                'orderby' => $attribute->attribute_orderby,
                'public' => intval($attribute->attribute_public) === 1,
                'is_taxonomy' => $is_taxonomy,
            ],
            'total' => intval($total),
            'page' => $page,
            'per_page' => $per_page,
            'total_pages' => $per_page > 0 ? ceil($total / $per_page) : 0,
            'terms' => $formatted_terms,
        ];
    }
    
    // ============================================
    // SHIPPING ENDPOINTS
    // ============================================
    
    /**
     * Get shipping methods
     */
    public function get_shipping_methods($request) {
        $shipping_zones = WC_Shipping_Zones::get_zones();
        $methods = [];
        
        foreach ($shipping_zones as $zone) {
            foreach ($zone['shipping_methods'] as $method) {
                if ($method->enabled === 'yes') {
                    $methods[] = [
                        'id' => $method->id,
                        'title' => $method->title,
                        'method_title' => $method->get_method_title(),
                        'cost' => $method->cost,
                        'zone_id' => $zone['zone_id'],
                        'zone_name' => $zone['zone_name'],
                    ];
                }
            }
        }
        
        return [
            'methods' => $methods,
        ];
    }
    
    /**
     * Calculate shipping
     */
    public function calculate_shipping($request) {
        $params = $request->get_json_params();
        
        $country = sanitize_text_field($params['country'] ?? '');
        $state = sanitize_text_field($params['state'] ?? '');
        $postcode = sanitize_text_field($params['postcode'] ?? '');
        $city = sanitize_text_field($params['city'] ?? '');
        
        if (empty($country)) {
            return new WP_Error('missing_country', 'Country is required', ['status' => 400]);
        }
        
        // This is a simplified version
        // In production, you would need to properly calculate shipping based on cart contents
        $packages = [
            [
                'contents' => WC()->cart->get_cart(),
                'contents_cost' => WC()->cart->get_subtotal(),
                'applied_coupons' => WC()->cart->get_applied_coupons(),
                'destination' => [
                    'country' => $country,
                    'state' => $state,
                    'postcode' => $postcode,
                    'city' => $city,
                ],
            ],
        ];
        
        $shipping_methods = [];
        
        foreach ($packages as $package) {
            $shipping_zone = WC_Shipping_Zones::get_zone_matching_package($package);
            $shipping_methods_zone = $shipping_zone->get_shipping_methods(true);
            
            foreach ($shipping_methods_zone as $method) {
                if ($method->enabled === 'yes') {
                    $shipping_methods[] = [
                        'id' => $method->id,
                        'title' => $method->title,
                        'method_title' => $method->get_method_title(),
                        'cost' => $method->cost,
                    ];
                }
            }
        }
        
        return [
            'shipping_methods' => $shipping_methods,
        ];
    }
    
    // ============================================
    // PAYMENT ENDPOINTS
    // ============================================
    
    /**
     * Get payment methods
     */
    public function get_payment_methods($request) {
        // Get all registered payment gateways (not just available ones)
        $all_gateways = WC()->payment_gateways->payment_gateways();
        $methods = [];
        
        foreach ($all_gateways as $gateway_id => $gateway) {
            // Only include enabled gateways
            if ($gateway->enabled === 'yes') {
                $methods[] = [
                    'id' => $gateway_id,
                    'title' => $gateway->get_title(),
                    'description' => $gateway->get_description(),
                    'enabled' => true,
                    'method_title' => method_exists($gateway, 'get_method_title') ? $gateway->get_method_title() : $gateway->get_title(),
                ];
            }
        }
        
        return [
            'methods' => $methods,
        ];
    }
    
    // ============================================
    // CHECKOUT ENDPOINT
    // ============================================
    
    /**
     * Process checkout
     */
    public function process_checkout($request) {
        // Authenticate user (supports both JWT and WordPress auth)
        $auth_result = $this->check_user_permission($request);
        if (is_wp_error($auth_result)) {
            return $auth_result;
        }
        
        $params = $request->get_json_params();
        
        if (!WC()->cart || WC()->cart->is_empty()) {
            return new WP_Error('empty_cart', 'Cart is empty', ['status' => 400]);
        }
        
        // Validate required fields
        if (empty($params['billing']['email'])) {
            return new WP_Error('missing_email', 'Billing email is required', ['status' => 400]);
        }
        
        if (empty($params['billing']['first_name']) || empty($params['billing']['last_name'])) {
            return new WP_Error('missing_name', 'Billing name is required', ['status' => 400]);
        }
        
        if (empty($params['payment_method'])) {
            return new WP_Error('missing_payment', 'Payment method is required', ['status' => 400]);
        }
        
        // Sanitize billing data
        $billing = [
            'first_name' => $this->sanitize_input($params['billing']['first_name'] ?? ''),
            'last_name' => $this->sanitize_input($params['billing']['last_name'] ?? ''),
            'company' => $this->sanitize_input($params['billing']['company'] ?? ''),
            'address_1' => $this->sanitize_input($params['billing']['address_1'] ?? ''),
            'address_2' => $this->sanitize_input($params['billing']['address_2'] ?? ''),
            'city' => $this->sanitize_input($params['billing']['city'] ?? ''),
            'state' => $this->sanitize_input($params['billing']['state'] ?? ''),
            'postcode' => $this->sanitize_input($params['billing']['postcode'] ?? ''),
            'country' => $this->sanitize_input($params['billing']['country'] ?? ''),
            'email' => $this->sanitize_input($params['billing']['email'] ?? '', 'email'),
            'phone' => $this->sanitize_input($params['billing']['phone'] ?? ''),
        ];
        
        // Validate email
        if (!is_email($billing['email'])) {
            return new WP_Error('invalid_email', 'Invalid email address', ['status' => 400]);
        }
        
        // Create order
        $order = wc_create_order();
        
        if (is_wp_error($order)) {
            return $order;
        }
        
        // Add cart items to order
        foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
            $order->add_product($cart_item['data'], $cart_item['quantity']);
        }
        
        // Set customer
        if ($user_id) {
            $order->set_customer_id($user_id);
        }
        
        // Set billing address
        $order->set_billing_first_name($billing['first_name']);
        $order->set_billing_last_name($billing['last_name']);
        $order->set_billing_company($billing['company']);
        $order->set_billing_address_1($billing['address_1']);
        $order->set_billing_address_2($billing['address_2']);
        $order->set_billing_city($billing['city']);
        $order->set_billing_state($billing['state']);
        $order->set_billing_postcode($billing['postcode']);
        $order->set_billing_country($billing['country']);
        $order->set_billing_email($billing['email']);
        $order->set_billing_phone($billing['phone']);
        
        // Set shipping address
        if (isset($params['shipping'])) {
            $shipping = [
                'first_name' => $this->sanitize_input($params['shipping']['first_name'] ?? ''),
                'last_name' => $this->sanitize_input($params['shipping']['last_name'] ?? ''),
                'company' => $this->sanitize_input($params['shipping']['company'] ?? ''),
                'address_1' => $this->sanitize_input($params['shipping']['address_1'] ?? ''),
                'address_2' => $this->sanitize_input($params['shipping']['address_2'] ?? ''),
                'city' => $this->sanitize_input($params['shipping']['city'] ?? ''),
                'state' => $this->sanitize_input($params['shipping']['state'] ?? ''),
                'postcode' => $this->sanitize_input($params['shipping']['postcode'] ?? ''),
                'country' => $this->sanitize_input($params['shipping']['country'] ?? ''),
            ];
            
            $order->set_shipping_first_name($shipping['first_name']);
            $order->set_shipping_last_name($shipping['last_name']);
            $order->set_shipping_company($shipping['company']);
            $order->set_shipping_address_1($shipping['address_1']);
            $order->set_shipping_address_2($shipping['address_2']);
            $order->set_shipping_city($shipping['city']);
            $order->set_shipping_state($shipping['state']);
            $order->set_shipping_postcode($shipping['postcode']);
            $order->set_shipping_country($shipping['country']);
        }
        
        // Set payment method
        $payment_method = $this->sanitize_input($params['payment_method']);
        $order->set_payment_method($payment_method);
        $order->set_payment_method_title($this->sanitize_input($params['payment_method_title'] ?? $payment_method));
        
        // Set shipping method
        if (isset($params['shipping_method'])) {
            $shipping_method = $params['shipping_method'];
            $order->add_shipping(new WC_Order_Item_Shipping());
            $shipping_items = $order->get_items('shipping');
            foreach ($shipping_items as $shipping_item) {
                $shipping_item->set_method_title($shipping_method['title'] ?? '');
                $shipping_item->set_method_id($shipping_method['id'] ?? '');
                $shipping_item->set_total($shipping_method['cost'] ?? 0);
            }
        }
        
        // Apply coupon
        if (isset($params['coupon_code'])) {
            $order->apply_coupon($params['coupon_code']);
        }
        
        // Calculate totals
        $order->calculate_totals();
        
        // Set order status
        $order->set_status('pending');
        
        // Save order
        $order->save();
        
        // Clear cart
        WC()->cart->empty_cart();
        
        return [
            'success' => true,
            'message' => 'Order created successfully',
            'order' => $this->core->format_order_data($order),
        ];
    }
    
    /**
     * Update order (admin only)
     */
    public function update_order($request) {
        $order_id = intval($request->get_param('id'));
        $params = $request->get_json_params();
        
        $order = wc_get_order($order_id);
        
        if (!$order) {
            return new WP_Error('not_found', 'Order not found', ['status' => 404]);
        }
        
        // Update status if provided
        if (isset($params['status'])) {
            $status = $this->sanitize_input($params['status']);
            $order->set_status($status);
        }
        
        // Update customer note if provided
        if (isset($params['customer_note'])) {
            $order->set_customer_note($this->sanitize_input($params['customer_note'], 'textarea'));
        }
        
        $order->save();
        
        return [
            'success' => true,
            'message' => 'Order updated successfully',
            'order' => $this->core->format_order_data($order),
        ];
    }
}

// Initialize API after WooCommerce is loaded
add_action('plugins_loaded', function() {
    // Wait for WooCommerce to be fully loaded
    if (class_exists('WooCommerce')) {
        new WooCommerce_API();
    }
}, 20);
