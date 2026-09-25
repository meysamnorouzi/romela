<?php
/**
 * Plugin Name: Product Additional Descriptions
 * Description: اضافه کردن فیلدهای توضیحات اضافه و توضیحات محصولات مشابه به صفحه ویرایش محصول ووکامرس
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
 * Product Additional Descriptions Class
 */
class Product_Additional_Descriptions {
    
    private static $instance = null;
    private $meta_key_additional = '_product_additional_description';
    private $meta_key_similar = '_product_similar_products_description';
    
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
        add_action('add_meta_boxes', [$this, 'add_product_additional_descriptions_meta_box']);
        
        // Save product additional descriptions data
        add_action('save_post_product', [$this, 'save_product_additional_descriptions'], 10, 2);
        
        // Add to API response
        add_filter('woocommerce_rest_prepare_product_object', [$this, 'add_additional_descriptions_to_api'], 10, 3);
    }
    
    /**
     * Add meta box to product edit page
     */
    public function add_product_additional_descriptions_meta_box() {
        add_meta_box(
            'product_additional_descriptions_meta_box',
            'توضیحات اضافی محصول',
            [$this, 'render_product_additional_descriptions_meta_box'],
            'product',
            'normal',
            'default'
        );
    }
    
    /**
     * Render meta box content
     */
    public function render_product_additional_descriptions_meta_box($post) {
        // Get existing descriptions
        $additional_description = get_post_meta($post->ID, $this->meta_key_additional, true);
        $similar_products_description = get_post_meta($post->ID, $this->meta_key_similar, true);
        
        // Add nonce for security
        wp_nonce_field('save_product_additional_descriptions', 'product_additional_descriptions_nonce');
        
        ?>
        <div id="product-additional-descriptions-container">
            <!-- Additional Description Section -->
            <div class="additional-description-section" style="margin-bottom: 30px;">
                <h3 style="margin-top: 0; margin-bottom: 10px;">توضیحات اضافه</h3>
                <?php
                wp_editor($additional_description, 'product_additional_description', [
                    'textarea_name' => 'product_additional_description',
                    'textarea_rows' => 10,
                    'media_buttons' => true,
                    'teeny' => false,
                ]);
                ?>
            </div>
            
            <!-- Similar Products Description Section -->
            <div class="additional-description-section">
                <h3 style="margin-top: 0; margin-bottom: 10px;">توضیحات محصولات مشابه</h3>
                <?php
                wp_editor($similar_products_description, 'product_similar_products_description', [
                    'textarea_name' => 'product_similar_products_description',
                    'textarea_rows' => 10,
                    'media_buttons' => true,
                    'teeny' => false,
                ]);
                ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Save product additional descriptions data
     */
    public function save_product_additional_descriptions($post_id, $post) {
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
        if (!isset($_POST['product_additional_descriptions_nonce']) || !wp_verify_nonce($_POST['product_additional_descriptions_nonce'], 'save_product_additional_descriptions')) {
            return;
        }
        
        // Check user permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        // Save additional description
        if (isset($_POST['product_additional_description'])) {
            $additional_description = wp_kses_post($_POST['product_additional_description']);
            update_post_meta($post_id, $this->meta_key_additional, $additional_description);
        } else {
            delete_post_meta($post_id, $this->meta_key_additional);
        }
        
        // Save similar products description
        if (isset($_POST['product_similar_products_description'])) {
            $similar_products_description = wp_kses_post($_POST['product_similar_products_description']);
            update_post_meta($post_id, $this->meta_key_similar, $similar_products_description);
        } else {
            delete_post_meta($post_id, $this->meta_key_similar);
        }
    }
    
    /**
     * Add additional descriptions to API response
     */
    public function add_additional_descriptions_to_api($response, $product, $request) {
        $product_id = $product->get_id();
        
        $additional_description = get_post_meta($product_id, $this->meta_key_additional, true);
        $similar_products_description = get_post_meta($product_id, $this->meta_key_similar, true);
        
        $response->data['additional_description'] = $additional_description ?: '';
        $response->data['similar_products_description'] = $similar_products_description ?: '';
        
        return $response;
    }
    
    /**
     * Get product additional description
     */
    public function get_product_additional_description($product_id) {
        return get_post_meta($product_id, $this->meta_key_additional, true) ?: '';
    }
    
    /**
     * Get product similar products description
     */
    public function get_product_similar_products_description($product_id) {
        return get_post_meta($product_id, $this->meta_key_similar, true) ?: '';
    }
}

// Initialize plugin
add_action('plugins_loaded', function() {
    if (class_exists('WooCommerce')) {
        Product_Additional_Descriptions::get_instance();
    }
}, 20);

