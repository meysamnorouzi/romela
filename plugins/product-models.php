<?php
/**
 * Plugin Name: Product Models Manager
 * Description: اضافه کردن بخش مدل‌های مختلف محصول به صفحه ویرایش محصول ووکامرس
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
 * Product Models Manager Class
 */
class Product_Models_Manager {
    
    private static $instance = null;
    private $meta_key = '_product_models';
    
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
        add_action('add_meta_boxes', [$this, 'add_product_models_meta_box']);
        
        // Save product models data
        add_action('save_post_product', [$this, 'save_product_models'], 10, 2);
        
        // Enqueue scripts and styles
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        
        // Add to API response
        add_filter('woocommerce_rest_prepare_product_object', [$this, 'add_models_to_api'], 10, 3);
    }
    
    /**
     * Add meta box to product edit page
     */
    public function add_product_models_meta_box() {
        add_meta_box(
            'product_models_meta_box',
            'مدل‌های مختلف این محصول',
            [$this, 'render_product_models_meta_box'],
            'product',
            'normal',
            'default'
        );
    }
    
    /**
     * Render meta box content
     */
    public function render_product_models_meta_box($post) {
        // Get existing models
        $models = get_post_meta($post->ID, $this->meta_key, true);
        if (!is_array($models)) {
            $models = [];
        }
        
        // Add nonce for security
        wp_nonce_field('save_product_models', 'product_models_nonce');
        
        ?>
        <div id="product-models-container">
            <table class="widefat" id="product-models-table">
                <thead>
                    <tr>
                        <th style="width: 25%;">نام محصول</th>
                        <th style="width: 15%;">حجم</th>
                        <th style="width: 15%;">قیمت</th>
                        <th style="width: 20%;">تصویر محصول</th>
                        <th style="width: 20%;">لینک</th>
                        <th style="width: 5%;">عملیات</th>
                    </tr>
                </thead>
                <tbody id="product-models-tbody">
                    <?php if (!empty($models)): ?>
                        <?php foreach ($models as $index => $model): ?>
                            <tr class="product-model-row" data-index="<?php echo esc_attr($index); ?>">
                                <td>
                                    <input type="text" 
                                           name="product_models[<?php echo esc_attr($index); ?>][name]" 
                                           value="<?php echo esc_attr($model['name'] ?? ''); ?>" 
                                           class="widefat" 
                                           placeholder="نام محصول">
                                </td>
                                <td>
                                    <input type="text" 
                                           name="product_models[<?php echo esc_attr($index); ?>][volume]" 
                                           value="<?php echo esc_attr($model['volume'] ?? ''); ?>" 
                                           class="widefat" 
                                           placeholder="حجم">
                                </td>
                                <td>
                                    <input type="number" 
                                           name="product_models[<?php echo esc_attr($index); ?>][price]" 
                                           value="<?php echo esc_attr($model['price'] ?? ''); ?>" 
                                           class="widefat" 
                                           step="0.01" 
                                           min="0" 
                                           placeholder="قیمت">
                                </td>
                                <td>
                                    <div class="product-model-image-container">
                                        <input type="hidden" 
                                               name="product_models[<?php echo esc_attr($index); ?>][image_id]" 
                                               value="<?php echo esc_attr($model['image_id'] ?? ''); ?>" 
                                               class="product-model-image-id">
                                        <div class="product-model-image-preview">
                                            <?php if (!empty($model['image_id'])): ?>
                                                <?php echo wp_get_attachment_image($model['image_id'], 'thumbnail', false, ['style' => 'max-width: 100px; height: auto;']); ?>
                                            <?php else: ?>
                                                <span class="no-image">بدون تصویر</span>
                                            <?php endif; ?>
                                        </div>
                                        <button type="button" class="button button-secondary upload-image-btn">انتخاب تصویر</button>
                                        <button type="button" class="button button-secondary remove-image-btn" style="display: <?php echo !empty($model['image_id']) ? 'inline-block' : 'none'; ?>;">حذف تصویر</button>
                                    </div>
                                </td>
                                <td>
                                    <input type="url" 
                                           name="product_models[<?php echo esc_attr($index); ?>][link]" 
                                           value="<?php echo esc_url($model['link'] ?? ''); ?>" 
                                           class="widefat" 
                                           placeholder="https://example.com">
                                </td>
                                <td>
                                    <button type="button" class="button button-secondary remove-row-btn">حذف</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
            <p>
                <button type="button" id="add-product-model-row" class="button button-primary">افزودن ردیف جدید</button>
            </p>
        </div>
        
        <script type="text/html" id="product-model-row-template">
            <tr class="product-model-row" data-index="{{INDEX}}">
                <td>
                    <input type="text" 
                           name="product_models[{{INDEX}}][name]" 
                           value="" 
                           class="widefat" 
                           placeholder="نام محصول">
                </td>
                <td>
                    <input type="text" 
                           name="product_models[{{INDEX}}][volume]" 
                           value="" 
                           class="widefat" 
                           placeholder="حجم">
                </td>
                <td>
                    <input type="number" 
                           name="product_models[{{INDEX}}][price]" 
                           value="" 
                           class="widefat" 
                           step="0.01" 
                           min="0" 
                           placeholder="قیمت">
                </td>
                <td>
                    <div class="product-model-image-container">
                        <input type="hidden" 
                               name="product_models[{{INDEX}}][image_id]" 
                               value="" 
                               class="product-model-image-id">
                        <div class="product-model-image-preview">
                            <span class="no-image">بدون تصویر</span>
                        </div>
                        <button type="button" class="button button-secondary upload-image-btn">انتخاب تصویر</button>
                        <button type="button" class="button button-secondary remove-image-btn" style="display: none;">حذف تصویر</button>
                    </div>
                </td>
                <td>
                    <input type="url" 
                           name="product_models[{{INDEX}}][link]" 
                           value="" 
                           class="widefat" 
                           placeholder="https://example.com">
                </td>
                <td>
                    <button type="button" class="button button-secondary remove-row-btn">حذف</button>
                </td>
            </tr>
        </script>
        <?php
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin_scripts($hook) {
        // Only load on product edit page
        if ($hook !== 'post.php' && $hook !== 'post-new.php') {
            return;
        }
        
        global $post;
        if (!$post || $post->post_type !== 'product') {
            return;
        }
        
        // Enqueue WordPress media uploader
        wp_enqueue_media();
        
        // Add inline styles
        $css = '
            #product-models-container {
                margin-top: 15px;
            }
            #product-models-table {
                margin-bottom: 15px;
            }
            #product-models-table th {
                text-align: right;
                font-weight: bold;
            }
            #product-models-table td {
                vertical-align: middle;
            }
            .product-model-image-container {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .product-model-image-preview {
                min-height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #ddd;
                padding: 5px;
                background: #f9f9f9;
            }
            .product-model-image-preview img {
                max-width: 100px;
                height: auto;
            }
            .product-model-image-preview .no-image {
                color: #999;
                font-style: italic;
            }
            .remove-row-btn {
                color: #a00;
            }
            .remove-row-btn:hover {
                color: #dc3232;
            }
        ';
        wp_add_inline_style('wp-admin', $css);
        
        // Add inline JavaScript
        $js = '
        jQuery(document).ready(function($) {
            var rowIndex = ' . (count(get_post_meta($post->ID, $this->meta_key, true) ?: [])) . ';
            
            // Add new row
            $("#add-product-model-row").on("click", function() {
                var template = $("#product-model-row-template").html();
                template = template.replace(/\{\{INDEX\}\}/g, rowIndex);
                $("#product-models-tbody").append(template);
                rowIndex++;
            });
            
            // Remove row
            $(document).on("click", ".remove-row-btn", function() {
                if (confirm("آیا از حذف این ردیف مطمئن هستید؟")) {
                    $(this).closest("tr").remove();
                }
            });
            
            // Upload image
            $(document).on("click", ".upload-image-btn", function() {
                var button = $(this);
                var container = button.closest(".product-model-image-container");
                var imageIdInput = container.find(".product-model-image-id");
                var preview = container.find(".product-model-image-preview");
                var removeBtn = container.find(".remove-image-btn");
                
                var mediaUploader = wp.media({
                    title: "انتخاب تصویر محصول",
                    button: {
                        text: "استفاده از این تصویر"
                    },
                    multiple: false
                });
                
                mediaUploader.on("select", function() {
                    var attachment = mediaUploader.state().get("selection").first().toJSON();
                    imageIdInput.val(attachment.id);
                    preview.html("<img src=\"" + attachment.url + "\" style=\"max-width: 100px; height: auto;\" />");
                    removeBtn.show();
                });
                
                mediaUploader.open();
            });
            
            // Remove image
            $(document).on("click", ".remove-image-btn", function() {
                var container = $(this).closest(".product-model-image-container");
                var imageIdInput = container.find(".product-model-image-id");
                var preview = container.find(".product-model-image-preview");
                var removeBtn = container.find(".remove-image-btn");
                
                imageIdInput.val("");
                preview.html("<span class=\"no-image\">بدون تصویر</span>");
                removeBtn.hide();
            });
        });
        ';
        wp_add_inline_script('jquery', $js);
    }
    
    /**
     * Save product models data
     */
    public function save_product_models($post_id, $post) {
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
        if (!isset($_POST['product_models_nonce']) || !wp_verify_nonce($_POST['product_models_nonce'], 'save_product_models')) {
            return;
        }
        
        // Check user permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        // Get and sanitize models data
        if (isset($_POST['product_models']) && is_array($_POST['product_models'])) {
            $models = [];
            
            foreach ($_POST['product_models'] as $model) {
                $sanitized_model = [
                    'name' => sanitize_text_field($model['name'] ?? ''),
                    'volume' => sanitize_text_field($model['volume'] ?? ''),
                    'price' => floatval($model['price'] ?? 0),
                    'image_id' => intval($model['image_id'] ?? 0),
                    'link' => esc_url_raw($model['link'] ?? ''),
                ];
                
                // Only add if name is not empty
                if (!empty($sanitized_model['name'])) {
                    $models[] = $sanitized_model;
                }
            }
            
            // Save models
            update_post_meta($post_id, $this->meta_key, $models);
        } else {
            // If no models submitted, delete the meta
            delete_post_meta($post_id, $this->meta_key);
        }
    }
    
    /**
     * Add models to API response
     */
    public function add_models_to_api($response, $product, $request) {
        $product_id = $product->get_id();
        $models = get_post_meta($product_id, $this->meta_key, true);
        
        if (!is_array($models)) {
            $models = [];
        }
        
        // Format models for API
        $formatted_models = [];
        foreach ($models as $model) {
            $formatted_model = [
                'name' => $model['name'] ?? '',
                'volume' => $model['volume'] ?? '',
                'price' => floatval($model['price'] ?? 0),
                'link' => $model['link'] ?? '',
            ];
            
            // Add image data if available
            if (!empty($model['image_id'])) {
                $image_id = intval($model['image_id']);
                $image_url = wp_get_attachment_image_url($image_id, 'full');
                if ($image_url) {
                    $formatted_model['image'] = [
                        'id' => $image_id,
                        'url' => $image_url,
                        'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail'),
                        'medium' => wp_get_attachment_image_url($image_id, 'medium'),
                        'large' => wp_get_attachment_image_url($image_id, 'large'),
                    ];
                } else {
                    $formatted_model['image'] = null;
                }
            } else {
                $formatted_model['image'] = null;
            }
            
            $formatted_models[] = $formatted_model;
        }
        
        $response->data['product_models'] = $formatted_models;
        
        return $response;
    }
    
    /**
     * Get product models
     */
    public function get_product_models($product_id) {
        $models = get_post_meta($product_id, $this->meta_key, true);
        return is_array($models) ? $models : [];
    }
}

// Initialize plugin
add_action('plugins_loaded', function() {
    if (class_exists('WooCommerce')) {
        Product_Models_Manager::get_instance();
    }
}, 20);

