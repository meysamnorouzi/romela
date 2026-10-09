<?php
/**
 * Plugin Name: ویرایشگر پیش‌فرض مقالات
 * Description: صفحه ویرایش نوشته را به حالت عادی وردپرس برمی‌گرداند: عنوان، ویرایشگر متن، و جعبه‌های انتشار و دسته‌بندی در کنار صفحه.
 * Version: 1.0.0
 * Author: Mohammad Mehrabi
 * License: GPL2
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WordPress 5+ opens the block editor for posts. On this site that screen stays blank.
 * Turning it off loads the built-in classic edit screen (title, editor, side boxes).
 */
add_action('init', function () {
    add_post_type_support('post', 'title');
    add_post_type_support('post', 'editor');
    add_post_type_support('post', 'excerpt');
    add_post_type_support('post', 'thumbnail');
    add_post_type_support('post', 'author');
    add_post_type_support('post', 'revisions');
    add_post_type_support('post', 'comments');
    add_post_type_support('post', 'custom-fields');
}, 20);

add_filter('use_block_editor_for_post_type', function ($use, $post_type) {
    if ($post_type === 'post') {
        return false;
    }
    return $use;
}, 100, 2);

add_filter('use_block_editor_for_post', function ($use, $post) {
    if ($post instanceof WP_Post && $post->post_type === 'post') {
        return false;
    }
    return $use;
}, 100, 2);

add_filter('gutenberg_can_edit_post_type', function ($use, $post_type) {
    if ($post_type === 'post') {
        return false;
    }
    return $use;
}, 100, 2);

add_filter('classic_editor_enabled_editors_for_post', function ($editors, $post) {
    if ($post instanceof WP_Post && $post->post_type === 'post') {
        return [
            'classic_editor' => true,
            'block_editor' => false,
        ];
    }
    return $editors;
}, 100, 2);
