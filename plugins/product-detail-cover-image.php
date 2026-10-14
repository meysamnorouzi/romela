<?php
/**
 * Plugin Name: Product Detail Cover Image
 * Description: بخش جداگانه برای آپلود تصویر معرفی محصول که کل کارت خاکستری صفحه جزئیات را می‌پوشاند
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
 * Product Detail Cover Image Class
 */
class Product_Detail_Cover_Image {

    private static $instance = null;
    private $meta_key = '_product_detail_cover_image';

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
        add_action('add_meta_boxes', [$this, 'add_meta_box']);
        add_action('save_post_product', [$this, 'save_cover_image'], 10, 2);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        add_filter('woocommerce_rest_prepare_product_object', [$this, 'add_cover_image_to_api'], 10, 3);
    }

    /**
     * Add meta box to the product edit screen
     */
    public function add_meta_box() {
        add_meta_box(
            'product_detail_cover_image_meta_box',
            'تصویر معرفی محصول',
            [$this, 'render_meta_box'],
            'product',
            'normal',
            'high'
        );
    }

    /**
     * Render the upload field
     */
    public function render_meta_box($post) {
        $image_id = absint(get_post_meta($post->ID, $this->meta_key, true));
        $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'large') : '';

        wp_nonce_field('save_product_detail_cover_image', 'product_detail_cover_image_nonce');
        ?>
        <div id="product-detail-cover-image">
            <p class="description" style="margin-top: 0;">
                این تصویر فقط در بخش معرفی صفحه جزئیات محصول، سمت چپ، نمایش داده می‌شود و تمام سطح کارت خاکستری را می‌پوشاند. تصویر محصول بالای صفحه جدا از این فیلد است.
            </p>
            <input type="hidden"
                   id="product-detail-cover-image-id"
                   name="product_detail_cover_image_id"
                   value="<?php echo esc_attr($image_id ? (string) $image_id : ''); ?>">
            <div class="detail-cover-image-frame" style="<?php echo $image_url ? '' : 'display:none;'; ?>">
                <?php if ($image_url): ?>
                    <img src="<?php echo esc_url($image_url); ?>" alt="">
                <?php endif; ?>
            </div>
            <p class="detail-cover-image-empty" style="<?php echo $image_url ? 'display:none;' : ''; ?>">
                هنوز تصویری انتخاب نشده است.
            </p>
            <p>
                <button type="button" class="button button-primary" id="product-detail-cover-image-upload">
                    <?php echo $image_url ? 'تغییر تصویر' : 'انتخاب تصویر'; ?>
                </button>
                <button type="button" class="button button-secondary" id="product-detail-cover-image-remove" style="<?php echo $image_url ? '' : 'display:none;'; ?>">
                    حذف تصویر
                </button>
            </p>
        </div>
        <?php
    }

    /**
     * Enqueue the media uploader on product edit screens
     */
    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'post.php' && $hook !== 'post-new.php') {
            return;
        }

        global $post;
        if (!$post || $post->post_type !== 'product') {
            return;
        }

        wp_enqueue_media();

        $css = '
            #product-detail-cover-image .detail-cover-image-frame {
                width: 100%;
                max-width: 560px;
                aspect-ratio: 16 / 10;
                margin: 12px 0;
                overflow: hidden;
                border-radius: 16px;
                background: #343434;
            }
            #product-detail-cover-image .detail-cover-image-frame img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            #product-detail-cover-image .detail-cover-image-empty {
                margin: 12px 0;
                color: #646970;
            }
        ';
        wp_add_inline_style('wp-admin', $css);

        $js = '
        jQuery(document).ready(function($) {
            var frame;
            var $id = $("#product-detail-cover-image-id");
            var $preview = $("#product-detail-cover-image .detail-cover-image-frame");
            var $empty = $("#product-detail-cover-image .detail-cover-image-empty");
            var $upload = $("#product-detail-cover-image-upload");
            var $remove = $("#product-detail-cover-image-remove");

            function showImage(url) {
                $preview.html("<img src=\"" + url + "\" alt=\"\">").show();
                $empty.hide();
                $remove.show();
                $upload.text("تغییر تصویر");
            }

            function clearImage() {
                $id.val("");
                $preview.empty().hide();
                $empty.show();
                $remove.hide();
                $upload.text("انتخاب تصویر");
            }

            $upload.on("click", function(event) {
                event.preventDefault();

                if (frame) {
                    frame.open();
                    return;
                }

                frame = wp.media({
                    title: "انتخاب تصویر معرفی محصول",
                    button: { text: "استفاده از این تصویر" },
                    library: { type: "image" },
                    multiple: false
                });

                frame.on("select", function() {
                    var attachment = frame.state().get("selection").first().toJSON();
                    var url = (attachment.sizes && attachment.sizes.large && attachment.sizes.large.url) || attachment.url;
                    $id.val(attachment.id);
                    showImage(url);
                });

                frame.open();
            });

            $remove.on("click", function(event) {
                event.preventDefault();
                clearImage();
            });
        });
        ';
        wp_add_inline_script('jquery', $js);
    }

    /**
     * Save the selected attachment
     */
    public function save_cover_image($post_id, $post) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (wp_is_post_revision($post_id)) {
            return;
        }

        if ($post->post_type !== 'product') {
            return;
        }

        if (!isset($_POST['product_detail_cover_image_nonce']) || !wp_verify_nonce($_POST['product_detail_cover_image_nonce'], 'save_product_detail_cover_image')) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        $image_id = isset($_POST['product_detail_cover_image_id']) ? absint($_POST['product_detail_cover_image_id']) : 0;

        if ($image_id && wp_attachment_is_image($image_id)) {
            update_post_meta($post_id, $this->meta_key, $image_id);
        } else {
            delete_post_meta($post_id, $this->meta_key);
        }
    }

    /**
     * Add the image URL to the WooCommerce REST response
     */
    public function add_cover_image_to_api($response, $product, $request) {
        $response->data['detail_cover_image'] = $this->get_product_detail_cover_image($product->get_id());
        return $response;
    }

    /**
     * Full-size image URL for a product, or an empty string
     */
    public function get_product_detail_cover_image($product_id) {
        $image_id = absint(get_post_meta($product_id, $this->meta_key, true));
        if (!$image_id) {
            return '';
        }

        $image_url = wp_get_attachment_image_url($image_id, 'full');
        return $image_url ? $image_url : '';
    }
}

// Initialize plugin
add_action('plugins_loaded', function() {
    if (class_exists('WooCommerce')) {
        Product_Detail_Cover_Image::get_instance();
    }
}, 20);
