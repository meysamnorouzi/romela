<?php
/**
 * Plugin Name: Product Datasheet Manager
 * Description: اضافه کردن بخش دیتاشیت محصول به صفحه ویرایش محصول ووکامرس
 * Version: 1.1.0
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
 * Product Datasheet Manager Class
 */
class Product_Datasheet_Manager {
    
    private static $instance = null;
    private $meta_key = '_product_datasheet';
    
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
        add_action('add_meta_boxes', [$this, 'add_product_datasheet_meta_box']);
        
        // Save product datasheet data
        add_action('save_post_product', [$this, 'save_product_datasheet'], 10, 2);
        
        // Enqueue scripts and styles
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        
        // Add to API response
        add_filter('woocommerce_rest_prepare_product_object', [$this, 'add_datasheet_to_api'], 10, 3);
    }
    
    /**
     * Add meta box to product edit page
     */
    public function add_product_datasheet_meta_box() {
        add_meta_box(
            'product_datasheet_meta_box',
            'دیتاشیت محصول',
            [$this, 'render_product_datasheet_meta_box'],
            'product',
            'normal',
            'default'
        );
    }
    
    /**
     * Render meta box content
     */
    public function render_product_datasheet_meta_box($post) {
        // Get existing datasheet data
        $datasheet = get_post_meta($post->ID, $this->meta_key, true);
        if (!is_array($datasheet)) {
            $datasheet = [
                'download_link' => '',
                'catalog_download_link' => '',
                'initial_description' => '',
                'table_data' => [],
                'final_description' => '',
            ];
        }
        
        // Ensure table_data is array
        if (!isset($datasheet['table_data']) || !is_array($datasheet['table_data'])) {
            $datasheet['table_data'] = [];
        }
        
        // Add nonce for security
        wp_nonce_field('save_product_datasheet', 'product_datasheet_nonce');
        
        ?>
        <div id="product-datasheet-container">
            <!-- Download Link Section -->
            <div class="datasheet-section" style="margin-bottom: 20px;">
                <h3 style="margin-top: 0;">لینک دانلود دیتاشیت</h3>
                <input type="url" 
                       name="product_datasheet[download_link]" 
                       value="<?php echo esc_url($datasheet['download_link'] ?? ''); ?>" 
                       class="widefat" 
                       placeholder="https://example.com/datasheet.pdf">
                <p class="description">لینک فایل دیتاشیت محصول را وارد کنید</p>
            </div>
            
            <!-- Catalog Download Link Section -->
            <div class="datasheet-section" style="margin-bottom: 20px;">
                <h3>لینک دانلود کاتالوگ</h3>
                <input type="url" 
                       name="product_datasheet[catalog_download_link]" 
                       value="<?php echo esc_url($datasheet['catalog_download_link'] ?? ''); ?>" 
                       class="widefat" 
                       placeholder="https://example.com/catalog.pdf">
                <p class="description">لینک فایل کاتالوگ محصول را وارد کنید</p>
            </div>
            
            <!-- Initial Description Section -->
            <div class="datasheet-section" style="margin-bottom: 20px;">
                <h3>توضیحات اولیه</h3>
                <?php
                $initial_desc = $datasheet['initial_description'] ?? '';
                wp_editor($initial_desc, 'product_datasheet_initial_description', [
                    'textarea_name' => 'product_datasheet[initial_description]',
                    'textarea_rows' => 8,
                    'media_buttons' => true,
                    'teeny' => false,
                ]);
                ?>
            </div>
            
            <!-- Table Section -->
            <div class="datasheet-section" style="margin-bottom: 20px;">
                <h3>جدول مشخصات</h3>
                <table class="widefat" id="product-datasheet-table">
                    <thead>
                        <tr>
                            <th style="width: 30%;">ویژگی (Property)</th>
                            <th style="width: 30%;">مقدار (Typical Value)</th>
                            <th style="width: 35%;">استاندارد/روش آزمون</th>
                            <th style="width: 5%;">عملیات</th>
                        </tr>
                    </thead>
                    <tbody id="product-datasheet-tbody">
                        <?php if (!empty($datasheet['table_data'])): ?>
                            <?php foreach ($datasheet['table_data'] as $index => $row): ?>
                                <tr class="datasheet-table-row" data-index="<?php echo esc_attr($index); ?>">
                                    <td>
                                        <input type="text" 
                                               name="product_datasheet[table_data][<?php echo esc_attr($index); ?>][property]" 
                                               value="<?php echo esc_attr($row['property'] ?? ''); ?>" 
                                               class="widefat" 
                                               placeholder="ویژگی">
                                    </td>
                                    <td>
                                        <input type="text" 
                                               name="product_datasheet[table_data][<?php echo esc_attr($index); ?>][value]" 
                                               value="<?php echo esc_attr($row['value'] ?? ''); ?>" 
                                               class="widefat" 
                                               placeholder="مقدار">
                                    </td>
                                    <td>
                                        <input type="text" 
                                               name="product_datasheet[table_data][<?php echo esc_attr($index); ?>][standard]" 
                                               value="<?php echo esc_attr($row['standard'] ?? ''); ?>" 
                                               class="widefat" 
                                               placeholder="استاندارد/روش آزمون">
                                    </td>
                                    <td>
                                        <button type="button" class="button button-secondary remove-table-row-btn">حذف</button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
                <p>
                    <button type="button" id="add-datasheet-table-row" class="button button-primary">افزودن ردیف جدید</button>
                </p>
            </div>
            
            <!-- Final Description Section -->
            <div class="datasheet-section">
                <h3>توضیحات نهایی</h3>
                <?php
                $final_desc = $datasheet['final_description'] ?? '';
                wp_editor($final_desc, 'product_datasheet_final_description', [
                    'textarea_name' => 'product_datasheet[final_description]',
                    'textarea_rows' => 8,
                    'media_buttons' => true,
                    'teeny' => false,
                ]);
                ?>
            </div>
        </div>
        
        <script type="text/html" id="datasheet-table-row-template">
            <tr class="datasheet-table-row" data-index="{{INDEX}}">
                <td>
                    <input type="text" 
                           name="product_datasheet[table_data][{{INDEX}}][property]" 
                           value="" 
                           class="widefat" 
                           placeholder="ویژگی">
                </td>
                <td>
                    <input type="text" 
                           name="product_datasheet[table_data][{{INDEX}}][value]" 
                           value="" 
                           class="widefat" 
                           placeholder="مقدار">
                </td>
                <td>
                    <input type="text" 
                           name="product_datasheet[table_data][{{INDEX}}][standard]" 
                           value="" 
                           class="widefat" 
                           placeholder="استاندارد/روش آزمون">
                </td>
                <td>
                    <button type="button" class="button button-secondary remove-table-row-btn">حذف</button>
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
        
        // Add inline styles
        $css = '
            #product-datasheet-container {
                margin-top: 15px;
            }
            .datasheet-section {
                border-bottom: 1px solid #ddd;
                padding-bottom: 20px;
            }
            .datasheet-section:last-child {
                border-bottom: none;
            }
            .datasheet-section h3 {
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 14px;
                font-weight: 600;
            }
            #product-datasheet-table {
                margin-bottom: 15px;
            }
            #product-datasheet-table th {
                text-align: right;
                font-weight: bold;
            }
            #product-datasheet-table td {
                vertical-align: middle;
            }
            .remove-table-row-btn {
                color: #a00;
            }
            .remove-table-row-btn:hover {
                color: #dc3232;
            }
        ';
        wp_add_inline_style('wp-admin', $css);
        
        // Add inline JavaScript
        $datasheet = get_post_meta($post->ID, $this->meta_key, true);
        $row_count = is_array($datasheet) && isset($datasheet['table_data']) ? count($datasheet['table_data']) : 0;
        
        $js = '
        jQuery(document).ready(function($) {
            var rowIndex = ' . $row_count . ';
            
            // Add new row
            $("#add-datasheet-table-row").on("click", function() {
                var template = $("#datasheet-table-row-template").html();
                template = template.replace(/\{\{INDEX\}\}/g, rowIndex);
                $("#product-datasheet-tbody").append(template);
                rowIndex++;
            });
            
            // Remove row
            $(document).on("click", ".remove-table-row-btn", function() {
                if (confirm("آیا از حذف این ردیف مطمئن هستید؟")) {
                    $(this).closest("tr").remove();
                }
            });
        });
        ';
        wp_add_inline_script('jquery', $js);
    }
    
    /**
     * Save product datasheet data
     */
    public function save_product_datasheet($post_id, $post) {
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
        if (!isset($_POST['product_datasheet_nonce']) || !wp_verify_nonce($_POST['product_datasheet_nonce'], 'save_product_datasheet')) {
            return;
        }
        
        // Check user permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        // Get and sanitize datasheet data
        if (isset($_POST['product_datasheet']) && is_array($_POST['product_datasheet'])) {
            $datasheet = [];
            
            // Download link
            $datasheet['download_link'] = isset($_POST['product_datasheet']['download_link']) 
                ? esc_url_raw($_POST['product_datasheet']['download_link']) 
                : '';
            
            // Catalog download link
            $datasheet['catalog_download_link'] = isset($_POST['product_datasheet']['catalog_download_link']) 
                ? esc_url_raw($_POST['product_datasheet']['catalog_download_link']) 
                : '';
            
            // Initial description
            $datasheet['initial_description'] = isset($_POST['product_datasheet']['initial_description']) 
                ? wp_kses_post($_POST['product_datasheet']['initial_description']) 
                : '';
            
            // Final description
            $datasheet['final_description'] = isset($_POST['product_datasheet']['final_description']) 
                ? wp_kses_post($_POST['product_datasheet']['final_description']) 
                : '';
            
            // Table data
            $datasheet['table_data'] = [];
            if (isset($_POST['product_datasheet']['table_data']) && is_array($_POST['product_datasheet']['table_data'])) {
                foreach ($_POST['product_datasheet']['table_data'] as $row) {
                    $sanitized_row = [
                        'property' => sanitize_text_field($row['property'] ?? ''),
                        'value' => sanitize_text_field($row['value'] ?? ''),
                        'standard' => sanitize_text_field($row['standard'] ?? ''),
                    ];
                    
                    // Only add if property is not empty
                    if (!empty($sanitized_row['property'])) {
                        $datasheet['table_data'][] = $sanitized_row;
                    }
                }
            }
            
            // Save datasheet
            update_post_meta($post_id, $this->meta_key, $datasheet);
        } else {
            // If no datasheet submitted, delete the meta
            delete_post_meta($post_id, $this->meta_key);
        }
    }
    
    /**
     * Add datasheet to API response
     */
    public function add_datasheet_to_api($response, $product, $request) {
        $product_id = $product->get_id();
        $datasheet = get_post_meta($product_id, $this->meta_key, true);
        
        if (!is_array($datasheet)) {
            $datasheet = [
                'download_link' => '',
                'catalog_download_link' => '',
                'initial_description' => '',
                'table_data' => [],
                'final_description' => '',
            ];
        }
        
        // Format datasheet for API
        $formatted_datasheet = [
            'download_link' => $datasheet['download_link'] ?? '',
            'catalog_download_link' => $datasheet['catalog_download_link'] ?? '',
            'initial_description' => $datasheet['initial_description'] ?? '',
            'final_description' => $datasheet['final_description'] ?? '',
            'table_data' => [],
        ];
        
        // Format table data
        if (isset($datasheet['table_data']) && is_array($datasheet['table_data'])) {
            foreach ($datasheet['table_data'] as $row) {
                $formatted_datasheet['table_data'][] = [
                    'property' => $row['property'] ?? '',
                    'value' => $row['value'] ?? '',
                    'standard' => $row['standard'] ?? '',
                ];
            }
        }
        
        $response->data['product_datasheet'] = $formatted_datasheet;
        
        return $response;
    }
    
    /**
     * Get product datasheet
     */
    public function get_product_datasheet($product_id) {
        $datasheet = get_post_meta($product_id, $this->meta_key, true);
        if (!is_array($datasheet)) {
            return [
                'download_link' => '',
                'catalog_download_link' => '',
                'initial_description' => '',
                'table_data' => [],
                'final_description' => '',
            ];
        }
        return $datasheet;
    }
}

// Initialize plugin
add_action('plugins_loaded', function() {
    if (class_exists('WooCommerce')) {
        Product_Datasheet_Manager::get_instance();
    }
}, 20);

