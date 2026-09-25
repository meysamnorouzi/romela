<?php
/**
 * Plugin Name: Product Featured Flags
 * Description: اضافه کردن چک‌باکس‌های محصولات پرفروش و محصولات روملا اویل به صفحه ویرایش محصول ووکامرس
 * Version: 1.0.0
 * Author: Mohammad Mehrabi
 * Company: Nova Web
 * License: GPL2
 * Requires at least: 5.0
 * Requires PHP: 7.4
 * WC requires at least: 5.0
 * WC tested up to: 8.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Check if WooCommerce is active
if (!function_exists('is_plugin_active')) {
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

if (!is_plugin_active('woocommerce/woocommerce.php') && !class_exists('WooCommerce')) {
    return;
}

/**
 * Product Featured Flags Class
 */
class Product_Featured_Flags {
    
    private static $instance = null;
    private $meta_key_bestseller = '_product_is_bestseller';
    private $meta_key_romela_first = '_product_is_romela_first';
    
    /**
     * Singleton instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        // Add meta box to product edit page
        add_action('add_meta_boxes', [$this, 'add_product_featured_flags_meta_box']);
        
        // Save product featured flags data
        add_action('save_post_product', [$this, 'save_product_featured_flags'], 10, 2);
        
        // Add to API response
        add_filter('woocommerce_rest_prepare_product_object', [$this, 'add_featured_flags_to_api'], 10, 3);
    }
    
    /**
     * Add meta box to product edit page
     */
    public function add_product_featured_flags_meta_box() {
        add_meta_box(
            'product_featured_flags_meta_box',
            'پرچم‌های محصول',
            [$this, 'render_product_featured_flags_meta_box'],
            'product',
            'side',
            'default'
        );
    }
    
    /**
     * Render meta box content
     */
    public function render_product_featured_flags_meta_box($post) {
        // Get existing flags
        $is_bestseller = get_post_meta($post->ID, $this->meta_key_bestseller, true) === 'yes';
        $is_romela_first = get_post_meta($post->ID, $this->meta_key_romela_first, true) === 'yes';
        
        // Add nonce for security
        wp_nonce_field('save_product_featured_flags', 'product_featured_flags_nonce');
        
        ?>
        <div id="product-featured-flags-container" style="padding: 10px 0;">
            <p>
                <label>
                    <input type="checkbox" 
                           name="product_is_bestseller" 
                           value="yes" 
                           <?php checked($is_bestseller, true); ?>>
                    <strong>محصولات پرفروش</strong>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" 
                           name="product_is_romela_first" 
                           value="yes" 
                           <?php checked($is_romela_first, true); ?>>
                    <strong>محصولات روملا اویل</strong>
                </label>
            </p>
        </div>
        <?php
    }
    
    /**
     * Save product featured flags data
     */
    public function save_product_featured_flags($post_id, $post) {
        // Check if this is an autosave
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        // Check if this is a revision
        if (wp_is_post_revision($post_id)) {
            return;
        }
        
        // Check post type
        if ($post->post_type !== 'product') {
            return;
        }
        
        // Check nonce
        if (!isset($_POST['product_featured_flags_nonce']) || !wp_verify_nonce($_POST['product_featured_flags_nonce'], 'save_product_featured_flags')) {
            return;
        }
        
        // Check user permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        // Save bestseller flag
        if (isset($_POST['product_is_bestseller']) && $_POST['product_is_bestseller'] === 'yes') {
            update_post_meta($post_id, $this->meta_key_bestseller, 'yes');
        } else {
            delete_post_meta($post_id, $this->meta_key_bestseller);
        }
        
        // Save romela first flag
        if (isset($_POST['product_is_romela_first']) && $_POST['product_is_romela_first'] === 'yes') {
            update_post_meta($post_id, $this->meta_key_romela_first, 'yes');
        } else {
            delete_post_meta($post_id, $this->meta_key_romela_first);
        }
    }
    
    /**
     * Add featured flags to API response
     */
    public function add_featured_flags_to_api($response, $product, $request) {
        $product_id = $product->get_id();
        
        $is_bestseller = get_post_meta($product_id, $this->meta_key_bestseller, true) === 'yes';
        $is_romela_first = get_post_meta($product_id, $this->meta_key_romela_first, true) === 'yes';
        
        $response->data['is_bestseller'] = $is_bestseller;
        $response->data['is_romela_first'] = $is_romela_first;
        
        return $response;
    }
    
    /**
     * Check if product is bestseller
     */
    public function is_product_bestseller($product_id) {
        return get_post_meta($product_id, $this->meta_key_bestseller, true) === 'yes';
    }
    
    /**
     * Check if product is romela first
     */
    public function is_product_romela_first($product_id) {
        return get_post_meta($product_id, $this->meta_key_romela_first, true) === 'yes';
    }
}

// Initialize plugin
add_action('plugins_loaded', function() {
    if (class_exists('WooCommerce')) {
        Product_Featured_Flags::get_instance();
    }
}, 20);

