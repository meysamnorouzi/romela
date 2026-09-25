<?php
/**
 * Plugin Name: Media Uploader API
 * Description: REST API endpoint for uploading images to WordPress Media Library
 * Version: 1.0.0
 * Author: Mohammad Mehrabi
 * Company: Nova Web
 * License: GPL2
 * Plugin URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Author URI: https://www.linkedin.com/in/mohammad1mehrabi/
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Media Uploader API Class
 */
class Media_Uploader_API {
    
    private $allowed_mime_types = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml'
    ];
    
    private $max_file_size; // in bytes
    
    /**
     * Constructor
     */
    public function __construct() {
        // Set max file size (default: 5MB, can be overridden by WordPress upload_max_filesize)
        $this->max_file_size = $this->get_max_upload_size();
        
        add_action('rest_api_init', [$this, 'register_routes']);
    }
    
    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Upload image endpoint
        register_rest_route('media/v1', '/upload', [
            'methods' => 'POST',
            'callback' => [$this, 'upload_image'],
            'permission_callback' => '__return_true',
        ]);
        
        // Get uploaded image info endpoint
        register_rest_route('media/v1', '/image/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_image_info'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ]
            ]
        ]);
    }
    
    /**
     * Upload image handler
     */
    public function upload_image($request) {
        // Check if file was uploaded
        if (empty($_FILES['file'])) {
            return new WP_Error(
                'no_file',
                'No file uploaded',
                ['status' => 400]
            );
        }
        
        $file = $_FILES['file'];
        
        // Validate file upload error
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return new WP_Error(
                'upload_error',
                $this->get_upload_error_message($file['error']),
                ['status' => 400]
            );
        }
        
        // Validate file size
        if ($file['size'] > $this->max_file_size) {
            $max_size_mb = round($this->max_file_size / 1024 / 1024, 2);
            return new WP_Error(
                'file_too_large',
                sprintf('File size exceeds maximum allowed size of %s MB', $max_size_mb),
                ['status' => 400]
            );
        }
        
        // Validate file type
        $file_type = wp_check_filetype($file['name']);
        $mime_type = $file['type'];
        
        if (!in_array($mime_type, $this->allowed_mime_types) && !in_array($file_type['type'], $this->allowed_mime_types)) {
            return new WP_Error(
                'invalid_file_type',
                'Only image files are allowed (JPEG, PNG, GIF, WebP, SVG)',
                ['status' => 400]
            );
        }
        
        // Additional security: verify file is actually an image
        $image_info = @getimagesize($file['tmp_name']);
        if ($image_info === false && $mime_type !== 'image/svg+xml') {
            return new WP_Error(
                'invalid_image',
                'File is not a valid image',
                ['status' => 400]
            );
        }
        
        // Sanitize filename
        $filename = sanitize_file_name($file['name']);
        
        // Get optional parameters
        $title = $request->get_param('title') ? sanitize_text_field($request->get_param('title')) : '';
        $alt_text = $request->get_param('alt_text') ? sanitize_text_field($request->get_param('alt_text')) : '';
        $caption = $request->get_param('caption') ? sanitize_textarea_field($request->get_param('caption')) : '';
        $description = $request->get_param('description') ? sanitize_textarea_field($request->get_param('description')) : '';
        
        // Prepare file array for WordPress
        $upload_file = [
            'name' => $filename,
            'type' => $mime_type,
            'tmp_name' => $file['tmp_name'],
            'error' => $file['error'],
            'size' => $file['size']
        ];
        
        // Upload file to WordPress Media Library
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        
        $attachment_id = media_handle_upload('file', 0);
        
        if (is_wp_error($attachment_id)) {
            return $attachment_id;
        }
        
        // Update attachment metadata if provided
        $attachment_data = [];
        
        if (!empty($title)) {
            $attachment_data['post_title'] = $title;
        }
        
        if (!empty($caption)) {
            $attachment_data['post_excerpt'] = $caption;
        }
        
        if (!empty($description)) {
            $attachment_data['post_content'] = $description;
        }
        
        if (!empty($attachment_data)) {
            $attachment_data['ID'] = $attachment_id;
            wp_update_post($attachment_data);
        }
        
        // Update alt text if provided
        if (!empty($alt_text)) {
            update_post_meta($attachment_id, '_wp_attachment_image_alt', $alt_text);
        }
        
        // Get attachment data
        $attachment = get_post($attachment_id);
        $attachment_url = wp_get_attachment_url($attachment_id);
        $attachment_metadata = wp_get_attachment_metadata($attachment_id);
        
        // Get different image sizes
        $image_sizes = [];
        if ($attachment_metadata && isset($attachment_metadata['sizes'])) {
            foreach ($attachment_metadata['sizes'] as $size_name => $size_data) {
                $image_sizes[$size_name] = [
                    'url' => wp_get_attachment_image_src($attachment_id, $size_name)[0],
                    'width' => $size_data['width'],
                    'height' => $size_data['height']
                ];
            }
        }
        
        // Prepare response
        $response_data = [
            'success' => true,
            'message' => 'Image uploaded successfully',
            'attachment' => [
                'id' => $attachment_id,
                'title' => $attachment->post_title,
                'filename' => basename($attachment_url),
                'url' => $attachment_url,
                'link' => get_attachment_link($attachment_id),
                'alt_text' => get_post_meta($attachment_id, '_wp_attachment_image_alt', true),
                'caption' => $attachment->post_excerpt,
                'description' => $attachment->post_content,
                'mime_type' => $attachment->post_mime_type,
                'file_size' => $file['size'],
                'uploaded_at' => $attachment->post_date,
                'sizes' => $image_sizes,
                'metadata' => [
                    'width' => isset($attachment_metadata['width']) ? $attachment_metadata['width'] : null,
                    'height' => isset($attachment_metadata['height']) ? $attachment_metadata['height'] : null,
                ]
            ]
        ];
        
        return new WP_REST_Response($response_data, 201);
    }
    
    /**
     * Get image information
     */
    public function get_image_info($request) {
        $attachment_id = intval($request->get_param('id'));
        
        $attachment = get_post($attachment_id);
        
        if (!$attachment || $attachment->post_type !== 'attachment') {
            return new WP_Error(
                'not_found',
                'Image not found',
                ['status' => 404]
            );
        }
        
        // Check if it's an image
        if (!wp_attachment_is_image($attachment_id)) {
            return new WP_Error(
                'not_image',
                'Attachment is not an image',
                ['status' => 400]
            );
        }
        
        $attachment_url = wp_get_attachment_url($attachment_id);
        $attachment_metadata = wp_get_attachment_metadata($attachment_id);
        
        // Get different image sizes
        $image_sizes = [];
        if ($attachment_metadata && isset($attachment_metadata['sizes'])) {
            foreach ($attachment_metadata['sizes'] as $size_name => $size_data) {
                $image_sizes[$size_name] = [
                    'url' => wp_get_attachment_image_src($attachment_id, $size_name)[0],
                    'width' => $size_data['width'],
                    'height' => $size_data['height']
                ];
            }
        }
        
        $file_path = get_attached_file($attachment_id);
        $file_size = file_exists($file_path) ? filesize($file_path) : 0;
        
        $response_data = [
            'success' => true,
            'attachment' => [
                'id' => $attachment_id,
                'title' => $attachment->post_title,
                'filename' => basename($attachment_url),
                'url' => $attachment_url,
                'link' => get_attachment_link($attachment_id),
                'alt_text' => get_post_meta($attachment_id, '_wp_attachment_image_alt', true),
                'caption' => $attachment->post_excerpt,
                'description' => $attachment->post_content,
                'mime_type' => $attachment->post_mime_type,
                'file_size' => $file_size,
                'uploaded_at' => $attachment->post_date,
                'modified_at' => $attachment->post_modified,
                'sizes' => $image_sizes,
                'metadata' => [
                    'width' => isset($attachment_metadata['width']) ? $attachment_metadata['width'] : null,
                    'height' => isset($attachment_metadata['height']) ? $attachment_metadata['height'] : null,
                ]
            ]
        ];
        
        return new WP_REST_Response($response_data, 200);
    }
    
    /**
     * Get maximum upload size
     */
    private function get_max_upload_size() {
        $max_size = wp_max_upload_size();
        
        // Convert to bytes if needed
        if (is_numeric($max_size)) {
            return $max_size;
        }
        
        // Parse size string (e.g., "5M", "10MB")
        $max_size = strtolower($max_size);
        $unit = substr($max_size, -1);
        $size = intval($max_size);
        
        switch ($unit) {
            case 'g':
                $size *= 1024;
            case 'm':
                $size *= 1024;
            case 'k':
                $size *= 1024;
        }
        
        return $size;
    }
    
    /**
     * Get upload error message
     */
    private function get_upload_error_message($error_code) {
        $error_messages = [
            UPLOAD_ERR_INI_SIZE => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
            UPLOAD_ERR_FORM_SIZE => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
            UPLOAD_ERR_PARTIAL => 'The uploaded file was only partially uploaded',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing a temporary folder',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
            UPLOAD_ERR_EXTENSION => 'A PHP extension stopped the file upload'
        ];
        
        return isset($error_messages[$error_code]) 
            ? $error_messages[$error_code] 
            : 'Unknown upload error';
    }
}

// Initialize plugin
new Media_Uploader_API();

