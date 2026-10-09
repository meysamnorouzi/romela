<?php
/**
 * Plugin Name: Blog Block Editor
 * Description: ویرایش مقالات با حالت عنوان و ویرایشگر بلوکی، به‌جای ویرایشگر کلاسیک وردپرس. نوشته‌های قدیمی هنگام باز شدن به بلوک تبدیل می‌شوند.
 * Version: 1.0.0
 * Author: Mohammad Mehrabi
 * Company: Nova Web
 * License: GPL2
 * Plugin URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Author URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Posts use the block editor canvas (title + content), never the classic editor.
 */
class Romela_Blog_Block_Editor {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', [$this, 'ensure_post_supports_block_editor'], 100);

        add_filter('use_block_editor_for_post_type', [$this, 'force_block_editor_for_post_type'], PHP_INT_MAX, 2);
        add_filter('gutenberg_can_edit_post_type', [$this, 'force_block_editor_for_post_type'], PHP_INT_MAX, 2);
        add_filter('use_block_editor_for_post', [$this, 'force_block_editor_for_post'], PHP_INT_MAX, 2);
        add_filter('classic_editor_enabled_editors_for_post', [$this, 'only_block_editor_for_posts'], PHP_INT_MAX, 2);
        add_filter('get_edit_post_link', [$this, 'strip_classic_editor_from_edit_link'], PHP_INT_MAX, 2);
        add_filter('post_row_actions', [$this, 'remove_classic_row_action'], PHP_INT_MAX, 2);
        add_filter('page_row_actions', [$this, 'remove_classic_row_action'], PHP_INT_MAX, 2);
        add_filter('block_editor_settings_all', [$this, 'editor_settings'], PHP_INT_MAX, 2);

        add_action('load-post.php', [$this, 'redirect_classic_editor_url']);
        add_action('load-post-new.php', [$this, 'redirect_classic_editor_url']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
    }

    public function ensure_post_supports_block_editor() {
        add_post_type_support('post', 'title');
        add_post_type_support('post', 'editor');

        $post_type = get_post_type_object('post');
        if ($post_type) {
            $post_type->show_in_rest = true;
        }
    }

    public function force_block_editor_for_post_type($use, $post_type) {
        if ($post_type === 'post') {
            return true;
        }
        return $use;
    }

    public function force_block_editor_for_post($use, $post) {
        if ($post instanceof WP_Post && $post->post_type === 'post') {
            return true;
        }
        return $use;
    }

    public function only_block_editor_for_posts($editors, $post) {
        if ($post instanceof WP_Post && $post->post_type === 'post') {
            return [
                'classic_editor' => false,
                'block_editor' => true,
            ];
        }
        return $editors;
    }

    public function strip_classic_editor_from_edit_link($url, $post_id) {
        $post = get_post($post_id);
        if (!$post || $post->post_type !== 'post' || !is_string($url)) {
            return $url;
        }
        return remove_query_arg(['classic-editor', 'classic-editor__forget'], $url);
    }

    public function remove_classic_row_action($actions, $post) {
        if (!$post instanceof WP_Post || $post->post_type !== 'post' || !is_array($actions)) {
            return $actions;
        }

        unset($actions['classic']);

        foreach ($actions as $key => $html) {
            if ($key === 'edit' || !is_string($html) || strpos($html, 'classic-editor') === false) {
                continue;
            }
            unset($actions[$key]);
        }

        return $actions;
    }

    public function editor_settings($settings, $context) {
        $post = null;
        if ($context instanceof WP_Block_Editor_Context) {
            $post = $context->post;
        }
        if (!$post instanceof WP_Post || $post->post_type !== 'post') {
            return $settings;
        }

        $settings['richEditingEnabled'] = true;
        // Keep the canvas as title + content, not the full site template and not classic TinyMCE.
        $settings['supportsTemplateMode'] = false;
        return $settings;
    }

    public function redirect_classic_editor_url() {
        $post_type = isset($_GET['post_type']) ? sanitize_key(wp_unslash($_GET['post_type'])) : 'post';
        if (!empty($_GET['post'])) {
            $post = get_post((int) $_GET['post']);
            if ($post instanceof WP_Post) {
                $post_type = $post->post_type;
            }
        }
        if ($post_type !== 'post') {
            return;
        }
        if (!isset($_GET['classic-editor']) && !isset($_GET['classic-editor__forget'])) {
            return;
        }

        wp_safe_redirect(remove_query_arg(['classic-editor', 'classic-editor__forget']));
        exit;
    }

    public function enqueue_editor_assets() {
        $screen = function_exists('get_current_screen') ? get_current_screen() : null;
        if (!$screen || $screen->post_type !== 'post') {
            return;
        }

        wp_register_style('romela-blog-block-editor', false, ['wp-edit-blocks'], '1.0.0');
        wp_enqueue_style('romela-blog-block-editor');
        wp_add_inline_style('romela-blog-block-editor', $this->editor_css());

        if (wp_script_is('wp-edit-post', 'registered')) {
            wp_add_inline_script('wp-edit-post', $this->editor_javascript());
        }
    }

    private function editor_css() {
        return <<<'CSS'
.editor-styles-wrapper,
.editor-visual-editor__post-title-wrapper,
.edit-post-visual-editor__post-title-wrapper,
.editor-post-title,
.editor-post-title__input {
  direction: rtl;
}

.editor-post-title__input,
.editor-post-title .editor-post-title__input {
  text-align: right;
  font-weight: 700;
  line-height: 1.45;
}
CSS;
    }

    private function editor_javascript() {
        return <<<'JS'
(function (wp) {
  if (!wp || !wp.data || !wp.blocks || !wp.blocks.rawHandler || !wp.domReady) {
    return;
  }

  var BLOCK_TAGS = {
    H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1,
    UL: 1, OL: 1, BLOCKQUOTE: 1, FIGURE: 1, TABLE: 1,
    PRE: 1, HR: 1, SECTION: 1, ARTICLE: 1
  };

  function plainText(html) {
    var el = document.createElement('div');
    el.innerHTML = html || '';
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function expandBreaks(html) {
    var doc = new DOMParser().parseFromString('<div id="romela-root">' + (html || '') + '</div>', 'text/html');
    var root = doc.getElementById('romela-root');
    if (!root) return html;
    var out = doc.createElement('div');
    var inlineBucket = [];

    function appendParagraph(nodes, source) {
      if (!nodes.length) return;
      var p = doc.createElement('p');
      if (source && source.attributes) {
        Array.prototype.forEach.call(source.attributes, function (attr) {
          p.setAttribute(attr.name, attr.value);
        });
      }
      nodes.forEach(function (node) { p.appendChild(node); });
      var hasMedia = p.querySelector('img, video, iframe');
      if ((p.textContent || '').replace(/\s+/g, '').length || hasMedia) {
        out.appendChild(p);
      }
    }

    function flushInline() {
      appendParagraph(inlineBucket, null);
      inlineBucket = [];
    }

    function splitParagraph(node) {
      var bucket = [];
      Array.prototype.forEach.call(node.childNodes, function (child) {
        if (child.nodeType === 1 && child.tagName === 'BR') {
          appendParagraph(bucket, node);
          bucket = [];
          return;
        }
        bucket.push(child.cloneNode(true));
      });
      appendParagraph(bucket, node);
    }

    function consume(node) {
      if (node.nodeType === 3 && !(node.textContent || '').trim()) return;
      if (node.nodeType === 1 && (node.tagName === 'DIV' || node.tagName === 'SECTION' || node.tagName === 'ARTICLE')) {
        flushInline();
        Array.prototype.forEach.call(node.childNodes, consume);
        flushInline();
        return;
      }
      if (node.nodeType === 1 && node.tagName === 'P') {
        flushInline();
        splitParagraph(node);
        return;
      }
      if (node.nodeType === 1 && node.tagName === 'BR') {
        flushInline();
        return;
      }
      if (node.nodeType === 1 && BLOCK_TAGS[node.tagName]) {
        flushInline();
        out.appendChild(node.cloneNode(true));
        return;
      }
      inlineBucket.push(node.cloneNode(true));
    }

    Array.prototype.forEach.call(root.childNodes, consume);
    flushInline();
    return (out.innerHTML || '').trim() || html;
  }

  function blocksFromHtml(html) {
    try {
      return wp.blocks.rawHandler({ HTML: html || '' });
    } catch (error) {
      return null;
    }
  }

  function convertedBlocks(html) {
    var blocks = blocksFromHtml(expandBreaks(html));
    if (!blocks || !blocks.length || (blocks.length === 1 && blocks[0].name === 'core/freeform')) {
      blocks = blocksFromHtml(html);
    }
    if (!blocks || !blocks.length) return null;
    if (blocks.length === 1 && blocks[0].name === 'core/freeform') return null;
    var before = plainText(html);
    var after = '';
    try {
      after = plainText(wp.blocks.serialize(blocks));
    } catch (error) {
      return null;
    }
    if (before.length >= 20 && after.length < Math.floor(before.length * 0.85)) return null;
    if (!after && !/<img|video|iframe/i.test(html || '')) return null;
    return blocks;
  }

  function notify(status, message) {
    var notices = wp.data.dispatch('core/notices');
    if (!notices || !notices.createNotice) return;
    notices.createNotice(status, message, { type: 'snackbar', isDismissible: true });
  }

  function hideClassicSwitch() {
    document.querySelectorAll('a[href*="classic-editor"]').forEach(function (anchor) {
      var row = anchor.closest('.components-menu-item, .components-button, li');
      if (row) row.style.display = 'none';
    });
  }

  wp.domReady(function () {
    hideClassicSwitch();
    window.setTimeout(hideClassicSwitch, 600);
    window.setTimeout(hideClassicSwitch, 1800);

    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (attempts > 40) {
        window.clearInterval(timer);
        return;
      }

      var editorSelect = wp.data.select('core/editor');
      var coreSelect = wp.data.select('core');
      if (!editorSelect || !coreSelect || !editorSelect.getCurrentPostId) return;

      var postId = editorSelect.getCurrentPostId();
      if (!postId) return;

      var postType = editorSelect.getCurrentPostType ? editorSelect.getCurrentPostType() : 'post';
      if (postType !== 'post') {
        window.clearInterval(timer);
        return;
      }

      var record = coreSelect.getEntityRecord('postType', 'post', postId);
      if (!record) return;

      var raw = '';
      if (record.content && typeof record.content === 'object') {
        raw = record.content.raw || '';
      } else if (typeof record.content === 'string') {
        raw = record.content;
      }

      if (!String(raw).trim()) {
        window.clearInterval(timer);
        return;
      }
      if (String(raw).indexOf('<!-- wp:') !== -1) {
        window.clearInterval(timer);
        return;
      }
      if (editorSelect.isEditedPostDirty && editorSelect.isEditedPostDirty()) {
        window.clearInterval(timer);
        return;
      }

      var next = convertedBlocks(raw);
      window.clearInterval(timer);
      if (!next) return;

      wp.data.dispatch('core/block-editor').resetBlocks(next);

      var locked = editorSelect.isPostLocked && editorSelect.isPostLocked();
      var post = editorSelect.getCurrentPost ? editorSelect.getCurrentPost() : null;
      var hasAutosave = post && post.autosave;
      if (locked || hasAutosave) {
        notify('info', 'این مقاله از ویرایشگر کلاسیک به حالت عنوان و بلوک تبدیل شد. برای نگه‌داشتن این حالت، به‌روزرسانی را بزنید.');
        return;
      }

      window.setTimeout(function () {
        var current = '';
        try {
          current = wp.data.select('core/editor').getEditedPostContent() || '';
        } catch (error) {
          current = '';
        }
        if (current.indexOf('<!-- wp:') === -1) return;
        if (plainText(raw).length >= 20 && plainText(current).length < Math.floor(plainText(raw).length * 0.85)) return;
        wp.data.dispatch('core/editor').savePost();
        notify('success', 'ویرایشگر این مقاله روی حالت عنوان و بلوک تنظیم شد.');
      }, 400);
    }, 250);
  });
})(window.wp);
JS;
    }
}

Romela_Blog_Block_Editor::get_instance();
