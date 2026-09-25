<?php
/**
 * WooCommerce API Core
 * Core functionality for WooCommerce REST API with complete e-commerce features
 * 
 * This file is included by woocommerce-api.php and should not be loaded as a standalone plugin.
 * 
 * @package WooCommerce_API
 * @version 1.0.0
 * @author Mohammad Mehrabi
 * @company Nova Web
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Prevent this file from being loaded as a standalone plugin
if (!defined('WCA_PLUGIN_LOADED')) {
    return;
}

// Check if WooCommerce is active
if (!function_exists('is_plugin_active')) {
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

if (!is_plugin_active('woocommerce/woocommerce.php') && !class_exists('WooCommerce')) {
    return;
}

// Define plugin constants
define('WCA_VERSION', '1.0.0');
define('WCA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WCA_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main WooCommerce API Core Class
 */
class WooCommerce_API_Core {
    
    private static $instance = null;
    
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
        // Initialize immediately if WooCommerce is available
        // Otherwise wait for plugins_loaded
        if (class_exists('WooCommerce')) {
            $this->init();
        } else {
            add_action('plugins_loaded', [$this, 'init'], 20);
        }
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Check WooCommerce is active
        if (!class_exists('WooCommerce')) {
            return;
        }
    }
    
    /**
     * Check if WooCommerce is active
     */
    public function is_woocommerce_active() {
        if (!function_exists('is_plugin_active')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }
        return class_exists('WooCommerce') && is_plugin_active('woocommerce/woocommerce.php');
    }
    
    /**
     * Format product data for API response
     */
    public function format_product_data($product, $include_variations = false) {
        if (!$product || !is_a($product, 'WC_Product')) {
            return null;
        }
        
        try {
            $product_id = $product->get_id();
            $product_type = $product->get_type();
        
        // Basic product data
        $data = [
            'id' => $product_id,
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'permalink' => $product->get_permalink(),
            'sku' => $product->get_sku(),
            'type' => $product_type,
            'status' => $product->get_status(),
            'featured' => $product->get_featured(),
            'catalog_visibility' => $product->get_catalog_visibility(),
            'description' => $product->get_description(),
            'short_description' => $product->get_short_description(),
            'price' => $product->get_price(),
            'regular_price' => $product->get_regular_price(),
            'sale_price' => $product->get_sale_price(),
            'price_html' => $product->get_price_html(),
            'on_sale' => $product->is_on_sale(),
            'purchasable' => $product->is_purchasable(),
            'in_stock' => $product->is_in_stock(),
            'stock_status' => $product->get_stock_status(),
            'stock_quantity' => $product->get_stock_quantity(),
            'manage_stock' => $product->get_manage_stock(),
            'backorders' => $product->get_backorders(),
            'backorders_allowed' => $product->backorders_allowed(),
            'sold_individually' => $product->get_sold_individually(),
            'weight' => $product->get_weight(),
            'length' => $product->get_length(),
            'width' => $product->get_width(),
            'height' => $product->get_height(),
            'shipping_required' => $product->needs_shipping(),
            'shipping_taxable' => $product->is_shipping_taxable(),
            'shipping_class' => $product->get_shipping_class(),
            'shipping_class_id' => $product->get_shipping_class_id(),
            'tax_status' => $product->get_tax_status(),
            'tax_class' => $product->get_tax_class(),
            'reviews_allowed' => $product->get_reviews_allowed(),
            'average_rating' => $product->get_average_rating(),
            'rating_count' => $product->get_rating_count(),
            'total_sales' => $product->get_total_sales(),
            'date_created' => $product->get_date_created() ? $product->get_date_created()->date('Y-m-d H:i:s') : null,
            'date_modified' => $product->get_date_modified() ? $product->get_date_modified()->date('Y-m-d H:i:s') : null,
            'date_on_sale_from' => $product->get_date_on_sale_from() ? $product->get_date_on_sale_from()->date('Y-m-d H:i:s') : null,
            'date_on_sale_to' => $product->get_date_on_sale_to() ? $product->get_date_on_sale_to()->date('Y-m-d H:i:s') : null,
        ];
        
        // Images
        $image_id = $product->get_image_id();
        $data['images'] = $this->get_product_images($product);
        $data['featured_image'] = $image_id ? wp_get_attachment_image_url($image_id, 'full') : '';
        
        // Categories
        $data['categories'] = $this->get_product_categories($product);
        
        // Tags
        $data['tags'] = $this->get_product_tags($product);
        
        // Attributes - always return array structure
        try {
            $data['attributes'] = $this->get_product_attributes($product);
            // Ensure it's always an array
            if (!is_array($data['attributes'])) {
                $data['attributes'] = [];
            }
        } catch (Exception $e) {
            $data['attributes'] = [];
        }
        
        // Meta data for SEO
        $data['meta'] = [
            'title' => $product->get_meta('_yoast_wpseo_title') ?: $product->get_name(),
            'description' => $product->get_meta('_yoast_wpseo_metadesc') ?: wp_trim_words($product->get_short_description() ?: $product->get_description(), 20),
            'keywords' => $product->get_meta('_yoast_wpseo_focuskw') ?: '',
            'og_title' => $product->get_name(),
            'og_description' => wp_trim_words($product->get_short_description() ?: $product->get_description(), 25),
            'og_image' => $data['featured_image'],
        ];
        
        // Variations for variable products
        if ($include_variations && $product_type === 'variable') {
            try {
                $data['variations'] = $this->get_product_variations($product);
                $data['variations_count'] = count($data['variations']);
            } catch (Exception $e) {
                $data['variations'] = [];
                $data['variations_count'] = 0;
            }
        } else {
            $data['variations'] = [];
            $data['variations_count'] = 0;
        }
        
        // Default attributes for variable products (used for variation selection)
        if ($product_type === 'variable') {
            try {
                $data['default_attributes'] = $product->get_default_attributes() ?: [];
            } catch (Exception $e) {
                $data['default_attributes'] = [];
            }
        } else {
            $data['default_attributes'] = [];
        }
        
        // Related products
        try {
            $data['related_ids'] = wc_get_related_products($product_id) ?: [];
        } catch (Exception $e) {
            $data['related_ids'] = [];
        }
        
        // Upsell products
        try {
            $data['upsell_ids'] = $product->get_upsell_ids() ?: [];
        } catch (Exception $e) {
            $data['upsell_ids'] = [];
        }
        
        // Cross-sell products
        try {
            $data['cross_sell_ids'] = $product->get_cross_sell_ids() ?: [];
        } catch (Exception $e) {
            $data['cross_sell_ids'] = [];
        }
        
        // Reviews (limit to 10 for product detail view)
        try {
            $reviews_data = $this->get_product_reviews($product_id, 10, 1);
            $data['reviews'] = isset($reviews_data['reviews']) ? $reviews_data['reviews'] : [];
            $data['reviews_total'] = isset($reviews_data['total']) ? $reviews_data['total'] : 0;
        } catch (Exception $e) {
            $data['reviews'] = [];
            $data['reviews_total'] = 0;
        }
        
        // Product models (if Product Models Manager plugin is active)
        try {
            if (class_exists('Product_Models_Manager')) {
                $models_manager = Product_Models_Manager::get_instance();
                $models = $models_manager->get_product_models($product_id);
                
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
                
                $data['product_models'] = $formatted_models;
            } else {
                $data['product_models'] = [];
            }
        } catch (Exception $e) {
            $data['product_models'] = [];
        }
        
        // Product datasheet (if Product Datasheet Manager plugin is active)
        try {
            if (class_exists('Product_Datasheet_Manager')) {
                $datasheet_manager = Product_Datasheet_Manager::get_instance();
                $datasheet = $datasheet_manager->get_product_datasheet($product_id);
                
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
                
                $data['product_datasheet'] = $formatted_datasheet;
            } else {
                $data['product_datasheet'] = [
                    'download_link' => '',
                    'catalog_download_link' => '',
                    'initial_description' => '',
                    'final_description' => '',
                    'table_data' => [],
                ];
            }
        } catch (Exception $e) {
            $data['product_datasheet'] = [
                'download_link' => '',
                'catalog_download_link' => '',
                'initial_description' => '',
                'final_description' => '',
                'table_data' => [],
            ];
        }
        
        // Additional descriptions (if Product Additional Descriptions plugin is active)
        try {
            if (class_exists('Product_Additional_Descriptions')) {
                $additional_descriptions = Product_Additional_Descriptions::get_instance();
                $data['additional_description'] = $additional_descriptions->get_product_additional_description($product_id);
                $data['similar_products_description'] = $additional_descriptions->get_product_similar_products_description($product_id);
            } else {
                $data['additional_description'] = '';
                $data['similar_products_description'] = '';
            }
        } catch (Exception $e) {
            $data['additional_description'] = '';
            $data['similar_products_description'] = '';
        }
        
        // Featured flags (if Product Featured Flags plugin is active)
        try {
            if (class_exists('Product_Featured_Flags')) {
                $featured_flags = Product_Featured_Flags::get_instance();
                $data['is_bestseller'] = $featured_flags->is_product_bestseller($product_id);
                $data['is_romela_first'] = $featured_flags->is_product_romela_first($product_id);
            } else {
                $data['is_bestseller'] = false;
                $data['is_romela_first'] = false;
            }
        } catch (Exception $e) {
            $data['is_bestseller'] = false;
            $data['is_romela_first'] = false;
        }
        
        return $data;
        
        } catch (Exception $e) {
            // Return minimal data if there's an error
            return [
                'id' => $product->get_id(),
                'name' => $product->get_name(),
                'error' => 'Error formatting product data',
            ];
        }
    }
    
    /**
     * Get product images
     */
    private function get_product_images($product) {
        $images = [];
        
        if (!$product || !is_a($product, 'WC_Product')) {
            return $images;
        }
        
        try {
            // Add featured image first
            $featured_id = $product->get_image_id();
            if ($featured_id) {
                $featured_image = $this->format_image_data($featured_id);
                if ($featured_image) {
                    $images[] = $featured_image;
                }
            }
            
            // Add gallery images (only for non-variation products)
            if (!$product->is_type('variation')) {
                try {
                    $image_ids = $product->get_gallery_image_ids();
                    if (is_array($image_ids)) {
                        foreach ($image_ids as $image_id) {
                            if ($image_id && $image_id != $featured_id) {
                                $gallery_image = $this->format_image_data($image_id);
                                if ($gallery_image) {
                                    $images[] = $gallery_image;
                                }
                            }
                        }
                    }
                } catch (Exception $e) {
                    // Continue without gallery images if there's an error
                }
            }
        } catch (Exception $e) {
            // Return empty array if there's an error
            return [];
        }
        
        return $images;
    }
    
    /**
     * Format image data
     */
    private function format_image_data($image_id) {
        if (!$image_id || !is_numeric($image_id)) {
            return null;
        }
        
        try {
            $image = wp_get_attachment_image_src($image_id, 'full');
            if (!$image || !isset($image[0])) {
                return null;
            }
            
            $alt = get_post_meta($image_id, '_wp_attachment_image_alt', true);
            $title = get_the_title($image_id);
            
            return [
                'id' => intval($image_id),
                'url' => $image[0],
                'alt' => $alt ?: '',
                'title' => $title ?: '',
                'sizes' => [
                    'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail') ?: '',
                    'medium' => wp_get_attachment_image_url($image_id, 'medium') ?: '',
                    'medium_large' => wp_get_attachment_image_url($image_id, 'medium_large') ?: '',
                    'large' => wp_get_attachment_image_url($image_id, 'large') ?: '',
                    'full' => $image[0],
                ],
            ];
        } catch (Exception $e) {
            return null;
        }
    }
    
    /**
     * Get product categories
     */
    private function get_product_categories($product) {
        $categories = [];
        $term_ids = $product->get_category_ids();
        
        foreach ($term_ids as $term_id) {
            $term = get_term($term_id, 'product_cat');
            if ($term && !is_wp_error($term)) {
                $categories[] = [
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                    'description' => $term->description,
                    'count' => $term->count,
                    'link' => get_term_link($term_id, 'product_cat'),
                    'image' => $this->get_category_image($term_id),
                ];
            }
        }
        
        return $categories;
    }
    
    /**
     * Get category image
     */
    private function get_category_image($term_id) {
        $thumbnail_id = get_term_meta($term_id, 'thumbnail_id', true);
        if ($thumbnail_id) {
            return wp_get_attachment_image_url($thumbnail_id, 'full');
        }
        return '';
    }
    
    /**
     * Get product tags
     */
    private function get_product_tags($product) {
        $tags = [];
        $term_ids = $product->get_tag_ids();
        
        foreach ($term_ids as $term_id) {
            $term = get_term($term_id, 'product_tag');
            if ($term && !is_wp_error($term)) {
                $tags[] = [
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                    'description' => $term->description,
                    'count' => $term->count,
                    'link' => get_term_link($term_id, 'product_tag'),
                ];
            }
        }
        
        return $tags;
    }
    
    /**
     * Get product attributes - using same method as API attributes endpoint
     */
    private function get_product_attributes($product) {
        $attributes = [];
        
        if (!$product || !is_a($product, 'WC_Product')) {
            return $attributes;
        }
        
        $product_id = $product->get_id();
        
        try {
            // Get all attribute taxonomies (same as API attributes endpoint)
            $all_attribute_taxonomies = wc_get_attribute_taxonomies();
            
            if (!is_array($all_attribute_taxonomies) || empty($all_attribute_taxonomies)) {
                return $attributes;
            }
            
            // Loop through all attributes and check if product has terms for them
            foreach ($all_attribute_taxonomies as $attr_tax) {
                try {
                    $attribute_id = intval($attr_tax->attribute_id);
                    $attribute_name = $attr_tax->attribute_name;
                    $taxonomy_name = wc_attribute_taxonomy_name($attribute_name);
                    
                    if (!$taxonomy_name || !taxonomy_exists($taxonomy_name)) {
                        continue;
                    }
                    
                    // Check if product has terms for this attribute
                    $terms = wp_get_post_terms($product_id, $taxonomy_name, ['fields' => 'all']);
                    
                    // Get attribute label
                    $attribute_label = '';
                    try {
                        $attribute_label = wc_attribute_label($attribute_name, $product);
                    } catch (Exception $e) {
                        $attribute_label = isset($attr_tax->attribute_label) ? $attr_tax->attribute_label : $attribute_name;
                    }
                    
                    // Get attribute properties from product if available
                    $product_attributes = $product->get_attributes();
                    $attribute_slug = 'pa_' . $attribute_name;
                    $is_visible = isset($attr_tax->attribute_public) ? (int)$attr_tax->attribute_public === 1 : true;
                    $is_variation = false;
                    
                    // Check if this attribute is used for variations
                    if (is_array($product_attributes) && isset($product_attributes[$attribute_slug])) {
                        $attr_obj = $product_attributes[$attribute_slug];
                        if (is_object($attr_obj) && method_exists($attr_obj, 'get_variation')) {
                            $is_variation = $attr_obj->get_variation();
                        } elseif (is_array($attr_obj) && isset($attr_obj['is_variation'])) {
                            $is_variation = (bool)$attr_obj['is_variation'];
                        }
                        if (is_object($attr_obj) && method_exists($attr_obj, 'get_visible')) {
                            $is_visible = $attr_obj->get_visible();
                        } elseif (is_array($attr_obj) && isset($attr_obj['is_visible'])) {
                            $is_visible = (bool)$attr_obj['is_visible'];
                        }
                    }
                    
                    // Format terms
                    $formatted_terms = [];
                    if (!is_wp_error($terms) && is_array($terms) && !empty($terms)) {
                        foreach ($terms as $term) {
                            if ($term && !is_wp_error($term) && isset($term->term_id)) {
                                $formatted_terms[] = [
                                    'id' => intval($term->term_id),
                                    'term_id' => intval($term->term_id),
                                    'name' => isset($term->name) ? $term->name : '',
                                    'slug' => isset($term->slug) ? $term->slug : '',
                                    'description' => isset($term->description) ? $term->description : '',
                                    'count' => isset($term->count) ? intval($term->count) : 0,
                                    'term_group' => isset($term->term_group) ? intval($term->term_group) : 0,
                                    'parent' => isset($term->parent) ? intval($term->parent) : 0,
                                ];
                            }
                        }
                    }
                    
                    // Build attribute data
                    $attribute_data = [
                        'id' => $attribute_id,
                        'attribute_id' => $attribute_id,
                        'name' => $attribute_label,
                        'slug' => $attribute_slug,
                        'taxonomy' => $taxonomy_name,
                        'type' => isset($attr_tax->attribute_type) ? $attr_tax->attribute_type : 'select',
                        'order_by' => isset($attr_tax->attribute_orderby) ? $attr_tax->attribute_orderby : 'name',
                        'has_archives' => isset($attr_tax->attribute_public) ? (int)$attr_tax->attribute_public === 1 : false,
                        'visible' => $is_visible,
                        'variation' => $is_variation,
                        'terms' => $formatted_terms,
                    ];
                    
                    $attributes[] = $attribute_data;
                    
                } catch (Exception $e) {
                    // Skip this attribute if there's an error and continue with next
                    continue;
                }
            }
            
            // Also check for non-taxonomy attributes from product meta
            try {
                $product_attributes = $product->get_attributes();
                if (is_array($product_attributes)) {
                    foreach ($product_attributes as $attribute_name => $attribute) {
                        try {
                            if (!$attribute) {
                                continue;
                            }
                            
                            // Check if it's already processed (taxonomy attribute)
                            $is_already_added = false;
                            foreach ($attributes as $added_attr) {
                                if ($added_attr['slug'] === $attribute_name) {
                                    $is_already_added = true;
                                    break;
                                }
                            }
                            
                            if ($is_already_added) {
                                continue;
                            }
                            
                            // Handle non-taxonomy attributes
                            $is_taxonomy = false;
                            $attribute_options = [];
                            
                            if (is_object($attribute)) {
                                if (method_exists($attribute, 'is_taxonomy')) {
                                    $is_taxonomy = $attribute->is_taxonomy();
                                    if (!$is_taxonomy && method_exists($attribute, 'get_options')) {
                                        $attribute_options = $attribute->get_options();
                                    }
                                } else {
                                    continue;
                                }
                            } elseif (is_array($attribute)) {
                                $is_taxonomy = isset($attribute['is_taxonomy']) ? (bool)$attribute['is_taxonomy'] : false;
                                if (!$is_taxonomy && isset($attribute['value'])) {
                                    $attribute_options = is_array($attribute['value']) ? $attribute['value'] : explode('|', $attribute['value']);
                                }
                            } else {
                                continue;
                            }
                            
                            // Only process non-taxonomy attributes
                            if (!$is_taxonomy) {
                                $attribute_label = '';
                                try {
                                    $attribute_label = wc_attribute_label($attribute_name, $product);
                                } catch (Exception $e) {
                                    $attribute_label = $attribute_name;
                                }
                                
                                $attribute_data = [
                                    'id' => 0,
                                    'attribute_id' => 0,
                                    'name' => $attribute_label,
                                    'slug' => $attribute_name,
                                    'taxonomy' => null,
                                    'type' => '',
                                    'order_by' => '',
                                    'has_archives' => false,
                                    'visible' => is_array($attribute) ? (isset($attribute['is_visible']) ? (bool)$attribute['is_visible'] : false) : false,
                                    'variation' => is_array($attribute) ? (isset($attribute['is_variation']) ? (bool)$attribute['is_variation'] : false) : false,
                                    'options' => is_array($attribute_options) && !empty($attribute_options) ? $attribute_options : [],
                                ];
                                
                                $attributes[] = $attribute_data;
                            }
                        } catch (Exception $e) {
                            continue;
                        }
                    }
                }
            } catch (Exception $e) {
                // Continue if there's an error with non-taxonomy attributes
            }
            
        } catch (Exception $e) {
            // Return empty array if there's a major error
            return [];
        }
        
        return $attributes;
    }
    
    /**
     * Get product variations
     */
    private function get_product_variations($product) {
        $variations = [];
        
        if (!$product || !is_a($product, 'WC_Product') || !$product->is_type('variable')) {
            return $variations;
        }
        
        try {
            $variation_ids = $product->get_children();
            
            if (empty($variation_ids) || !is_array($variation_ids)) {
                return $variations;
            }
            
            foreach ($variation_ids as $variation_id) {
                try {
                    $variation = wc_get_product($variation_id);
                    
                    if (!$variation || !$variation->is_type('variation')) {
                        continue;
                    }
                    
                    // Get variation attributes with full details
                    $variation_attributes = $variation->get_variation_attributes();
                    $formatted_attributes = [];
                    
                    // Format attributes with term details
                    if (is_array($variation_attributes)) {
                        foreach ($variation_attributes as $attribute_name => $attribute_value) {
                            if (empty($attribute_value)) {
                                continue;
                            }
                            
                            try {
                                $attribute_taxonomy = str_replace('attribute_', '', $attribute_name);
                                $taxonomy = wc_attribute_taxonomy_name($attribute_taxonomy);
                                
                                $formatted_attributes[$attribute_name] = [
                                    'name' => wc_attribute_label($attribute_taxonomy, $product),
                                    'value' => $attribute_value,
                                    'slug' => $attribute_value,
                                ];
                                
                                // Get term details if it's a taxonomy attribute
                                if (taxonomy_exists($taxonomy)) {
                                    $term = get_term_by('slug', $attribute_value, $taxonomy);
                                    if ($term && !is_wp_error($term)) {
                                        $formatted_attributes[$attribute_name]['term_id'] = $term->term_id;
                                        $formatted_attributes[$attribute_name]['term_name'] = $term->name;
                                        $formatted_attributes[$attribute_name]['term_slug'] = $term->slug;
                                    }
                                }
                            } catch (Exception $e) {
                                // Skip this attribute if there's an error
                                continue;
                            }
                        }
                    }
                    
                    // Get variation image
                    $variation_image = null;
                    try {
                        $variation_image_id = $variation->get_image_id();
                        if ($variation_image_id) {
                            $variation_image = $this->format_image_data($variation_image_id);
                        } else {
                            // Fallback to parent product image
                            $parent_image_id = $product->get_image_id();
                            if ($parent_image_id) {
                                $variation_image = $this->format_image_data($parent_image_id);
                            }
                        }
                    } catch (Exception $e) {
                        // Continue without image if there's an error
                    }
                    
                    // Get variation images (only featured image for variations)
                    $variation_images = [];
                    try {
                        if ($variation_image) {
                            $variation_images[] = $variation_image;
                        }
                    } catch (Exception $e) {
                        // Continue without images if there's an error
                    }
                    
                    // Safely get variation data
                    $variation_data = [
                        'id' => $variation_id,
                        'sku' => $variation->get_sku() ?: '',
                        'name' => method_exists($variation, 'get_name') ? $variation->get_name() : $product->get_name(),
                        'permalink' => method_exists($variation, 'get_permalink') ? $variation->get_permalink() : $product->get_permalink(),
                        'price' => $variation->get_price() ?: '',
                        'regular_price' => $variation->get_regular_price() ?: '',
                        'sale_price' => $variation->get_sale_price() ?: '',
                        'price_html' => method_exists($variation, 'get_price_html') ? $variation->get_price_html() : '',
                        'on_sale' => $variation->is_on_sale(),
                        'purchasable' => $variation->is_purchasable(),
                        'in_stock' => $variation->is_in_stock(),
                        'stock_status' => $variation->get_stock_status(),
                        'stock_quantity' => $variation->get_stock_quantity(),
                        'manage_stock' => $variation->get_manage_stock(),
                        'backorders' => $variation->get_backorders(),
                        'backorders_allowed' => $variation->backorders_allowed(),
                        'weight' => $variation->get_weight() ?: '',
                        'length' => $variation->get_length() ?: '',
                        'width' => $variation->get_width() ?: '',
                        'height' => $variation->get_height() ?: '',
                        'shipping_required' => $variation->needs_shipping(),
                        'shipping_taxable' => $variation->is_shipping_taxable(),
                        'shipping_class' => $variation->get_shipping_class() ?: '',
                        'shipping_class_id' => $variation->get_shipping_class_id() ?: 0,
                        'tax_status' => $variation->get_tax_status() ?: '',
                        'tax_class' => $variation->get_tax_class() ?: '',
                        'attributes' => $formatted_attributes,
                        'image' => $variation_image,
                        'images' => $variation_images,
                        'description' => method_exists($variation, 'get_description') ? $variation->get_description() : '',
                    ];
                    
                    // Add dates safely
                    try {
                        $date_created = $variation->get_date_created();
                        $variation_data['date_created'] = $date_created && method_exists($date_created, 'date') ? $date_created->date('Y-m-d H:i:s') : null;
                    } catch (Exception $e) {
                        $variation_data['date_created'] = null;
                    }
                    
                    try {
                        $date_modified = $variation->get_date_modified();
                        $variation_data['date_modified'] = $date_modified && method_exists($date_modified, 'date') ? $date_modified->date('Y-m-d H:i:s') : null;
                    } catch (Exception $e) {
                        $variation_data['date_modified'] = null;
                    }
                    
                    $variations[] = $variation_data;
                    
                } catch (Exception $e) {
                    // Skip this variation if there's an error and continue with next
                    continue;
                }
            }
        } catch (Exception $e) {
            // Return empty array if there's a major error
            return [];
        }
        
        return $variations;
    }
    
    /**
     * Get product reviews with pagination support
     */
    public function get_product_reviews($product_id, $per_page = 10, $page = 1) {
        // Validate product exists
        $product = wc_get_product($product_id);
        if (!$product) {
            return [
                'reviews' => [],
                'total' => 0,
                'page' => $page,
                'per_page' => $per_page,
            ];
        }
        
        // Get total count
        $total = get_comments([
            'post_id' => $product_id,
            'status' => 'approve',
            'type' => 'review',
            'count' => true,
        ]);
        
        // Calculate offset
        $offset = ($page - 1) * $per_page;
        
        // Get paginated reviews
        $reviews = [];
        $comments = get_comments([
            'post_id' => $product_id,
            'status' => 'approve',
            'type' => 'review',
            'number' => $per_page,
            'offset' => $offset,
            'orderby' => 'comment_date',
            'order' => 'DESC',
        ]);
        
        foreach ($comments as $comment) {
            $rating = get_comment_meta($comment->comment_ID, 'rating', true);
            $reviews[] = [
                'id' => $comment->comment_ID,
                'author' => $comment->comment_author,
                'email' => $comment->comment_author_email,
                'date' => $comment->comment_date,
                'date_gmt' => $comment->comment_date_gmt,
                'rating' => $rating ? intval($rating) : 0,
                'title' => get_comment_meta($comment->comment_ID, 'title', true) ?: '',
                'content' => $comment->comment_content,
                'verified' => function_exists('wc_review_is_from_verified_owner') ? wc_review_is_from_verified_owner($comment->comment_ID) : false,
            ];
        }
        
        return [
            'reviews' => $reviews,
            'total' => intval($total),
            'page' => intval($page),
            'per_page' => intval($per_page),
            'total_pages' => ceil($total / $per_page),
        ];
    }
    
    /**
     * Format order data for API response
     */
    public function format_order_data($order) {
        if (!$order || !is_a($order, 'WC_Order')) {
            return null;
        }
        
        return [
            'id' => $order->get_id(),
            'order_number' => $order->get_order_number(),
            'status' => $order->get_status(),
            'currency' => $order->get_currency(),
            'date_created' => $order->get_date_created() ? $order->get_date_created()->date('Y-m-d H:i:s') : null,
            'date_modified' => $order->get_date_modified() ? $order->get_date_modified()->date('Y-m-d H:i:s') : null,
            'total' => $order->get_total(),
            'subtotal' => $order->get_subtotal(),
            'total_tax' => $order->get_total_tax(),
            'total_shipping' => $order->get_shipping_total(),
            'total_discount' => $order->get_total_discount(),
            'payment_method' => $order->get_payment_method(),
            'payment_method_title' => $order->get_payment_method_title(),
            'transaction_id' => $order->get_transaction_id(),
            'billing' => [
                'first_name' => $order->get_billing_first_name(),
                'last_name' => $order->get_billing_last_name(),
                'company' => $order->get_billing_company(),
                'address_1' => $order->get_billing_address_1(),
                'address_2' => $order->get_billing_address_2(),
                'city' => $order->get_billing_city(),
                'state' => $order->get_billing_state(),
                'postcode' => $order->get_billing_postcode(),
                'country' => $order->get_billing_country(),
                'email' => $order->get_billing_email(),
                'phone' => $order->get_billing_phone(),
            ],
            'shipping' => [
                'first_name' => $order->get_shipping_first_name(),
                'last_name' => $order->get_shipping_last_name(),
                'company' => $order->get_shipping_company(),
                'address_1' => $order->get_shipping_address_1(),
                'address_2' => $order->get_shipping_address_2(),
                'city' => $order->get_shipping_city(),
                'state' => $order->get_shipping_state(),
                'postcode' => $order->get_shipping_postcode(),
                'country' => $order->get_shipping_country(),
            ],
            'line_items' => $this->get_order_line_items($order),
            'shipping_lines' => $this->get_order_shipping_lines($order),
            'fee_lines' => $this->get_order_fee_lines($order),
            'coupon_lines' => $this->get_order_coupon_lines($order),
            'customer_id' => $order->get_customer_id(),
            'customer_note' => $order->get_customer_note(),
        ];
    }
    
    /**
     * Get order line items
     */
    private function get_order_line_items($order) {
        $items = [];
        foreach ($order->get_items() as $item_id => $item) {
            $product = $item->get_product();
            $items[] = [
                'id' => $item_id,
                'product_id' => $item->get_product_id(),
                'variation_id' => $item->get_variation_id(),
                'name' => $item->get_name(),
                'quantity' => $item->get_quantity(),
                'subtotal' => $item->get_subtotal(),
                'total' => $item->get_total(),
                'tax' => $item->get_subtotal_tax(),
                'sku' => $product ? $product->get_sku() : '',
                'price' => $item->get_subtotal() / $item->get_quantity(),
            ];
        }
        return $items;
    }
    
    /**
     * Get order shipping lines
     */
    private function get_order_shipping_lines($order) {
        $shipping = [];
        foreach ($order->get_items('shipping') as $item_id => $item) {
            $shipping[] = [
                'id' => $item_id,
                'method_title' => $item->get_method_title(),
                'method_id' => $item->get_method_id(),
                'total' => $item->get_total(),
                'total_tax' => $item->get_total_tax(),
            ];
        }
        return $shipping;
    }
    
    /**
     * Get order fee lines
     */
    private function get_order_fee_lines($order) {
        $fees = [];
        foreach ($order->get_items('fee') as $item_id => $item) {
            $fees[] = [
                'id' => $item_id,
                'name' => $item->get_name(),
                'total' => $item->get_total(),
                'total_tax' => $item->get_total_tax(),
            ];
        }
        return $fees;
    }
    
    /**
     * Get order coupon lines
     */
    private function get_order_coupon_lines($order) {
        $coupons = [];
        foreach ($order->get_items('coupon') as $item_id => $item) {
            $coupons[] = [
                'id' => $item_id,
                'code' => $item->get_code(),
                'discount' => $item->get_discount(),
                'discount_tax' => $item->get_discount_tax(),
            ];
        }
        return $coupons;
    }
    
    /**
     * Format category data
     */
    public function format_category_data($category, $include_subcategories = true) {
        if (!$category || is_wp_error($category)) {
            return null;
        }
        
        $formatted = [
            'id' => $category->term_id,
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'count' => $category->count,
            'link' => get_term_link($category->term_id, 'product_cat'),
            'image' => $this->get_category_image($category->term_id),
            'parent' => $category->parent,
            'display' => $category->display,
        ];
        
        // Get subcategories if requested
        if ($include_subcategories) {
            $subcategories = get_terms([
                'taxonomy' => 'product_cat',
                'parent' => $category->term_id,
                'hide_empty' => false,
            ]);
            
            if (!is_wp_error($subcategories) && is_array($subcategories) && !empty($subcategories)) {
                $formatted['subcategories'] = [];
                foreach ($subcategories as $subcategory) {
                    $formatted['subcategories'][] = [
                        'id' => $subcategory->term_id,
                        'name' => $subcategory->name,
                        'slug' => $subcategory->slug,
                        'description' => $subcategory->description,
                        'count' => $subcategory->count,
                        'link' => get_term_link($subcategory->term_id, 'product_cat'),
                        'image' => $this->get_category_image($subcategory->term_id),
                        'parent' => $subcategory->parent,
                    ];
                }
            } else {
                $formatted['subcategories'] = [];
            }
        } else {
            $formatted['subcategories'] = [];
        }
        
        return $formatted;
    }
    
    /**
     * Format coupon data
     */
    public function format_coupon_data($coupon) {
        if (!$coupon || !is_a($coupon, 'WC_Coupon')) {
            return null;
        }
        
        return [
            'id' => $coupon->get_id(),
            'code' => $coupon->get_code(),
            'amount' => $coupon->get_amount(),
            'discount_type' => $coupon->get_discount_type(),
            'description' => $coupon->get_description(),
            'date_expires' => $coupon->get_date_expires() ? $coupon->get_date_expires()->date('Y-m-d H:i:s') : null,
            'usage_count' => $coupon->get_usage_count(),
            'usage_limit' => $coupon->get_usage_limit(),
            'usage_limit_per_user' => $coupon->get_usage_limit_per_user(),
            'minimum_amount' => $coupon->get_minimum_amount(),
            'maximum_amount' => $coupon->get_maximum_amount(),
            'individual_use' => $coupon->get_individual_use(),
            'exclude_sale_items' => $coupon->get_exclude_sale_items(),
            'product_ids' => $coupon->get_product_ids(),
            'excluded_product_ids' => $coupon->get_excluded_product_ids(),
            'product_categories' => $coupon->get_product_categories(),
            'excluded_product_categories' => $coupon->get_excluded_product_categories(),
            'email_restrictions' => $coupon->get_email_restrictions(),
            'free_shipping' => $coupon->get_free_shipping(),
        ];
    }
}

// Initialize plugin only if WooCommerce is available
// This prevents initialization if core file is loaded as standalone plugin
if (defined('WCA_PLUGIN_LOADED') && WCA_PLUGIN_LOADED) {
    WooCommerce_API_Core::get_instance();
}

