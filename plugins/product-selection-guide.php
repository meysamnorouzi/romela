<?php
/**
 * Plugin Name: Product Selection Guide
 * Description: راهنمای انتخاب محصول — مدیریت داده خودرو و نگاشت محصولات با import/export CSV و API برای فرانت‌اند
 * Version: 1.1.4
 * Author: Mohammad Mehrabi
 * Company: Nova Web
 * License: GPL2
 * Requires at least: 5.0
 * Requires PHP: 7.4
 * WC requires at least: 5.0
 * WC tested up to: 8.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('is_plugin_active')) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

if (!is_plugin_active('woocommerce/woocommerce.php') && !class_exists('WooCommerce')) {
    return;
}

/**
 * Product Selection Guide — data store, admin, CSV, REST API.
 */
class Product_Selection_Guide {

    private static $instance = null;
    private $table_name;
    private $db_version = '1.1.4';

    /** CSV: vehicle filters + WooCommerce product ID only. */
    private $csv_headers = [
        'vehicle_type' => ['نوع خودرو', 'vehicle_type'],
        'brand'        => ['برند', 'brand'],
        'model'        => ['مدل', 'model'],
        'year'         => ['سال', 'year'],
        'product_id'   => ['شناسه محصول', 'شناسه محصول ووکامرس', 'product_id', 'product id', 'product', 'id', 'wc_product_id'],
    ];

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'psg_entries';

        register_activation_hook(__FILE__, [$this, 'activate']);
        add_action('plugins_loaded', [$this, 'maybe_upgrade_db']);

        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_post_psg_import_csv', [$this, 'handle_csv_import']);
        add_action('admin_post_psg_export_csv', [$this, 'handle_csv_export']);
        add_action('admin_post_psg_delete_all', [$this, 'handle_delete_all']);

        add_action('rest_api_init', [$this, 'register_rest_routes'], 25);
    }

    public function activate() {
        $this->create_table();
    }

    public function maybe_upgrade_db() {
        $this->ensure_table_exists();
        $this->ensure_table_charset();
        $installed = get_option('psg_db_version');
        if ($installed !== $this->db_version) {
            update_option('psg_db_version', $this->db_version);
        }
    }

    /**
     * Ensure MySQL table uses utf8mb4 (Persian text). Runs once per plugin version.
     */
    private function ensure_table_charset() {
        if (get_option('psg_table_utf8mb4') === $this->db_version) {
            return;
        }
        if (!$this->table_exists()) {
            return;
        }
        global $wpdb;
        $wpdb->suppress_errors(true);
        $wpdb->query("ALTER TABLE {$this->table_name} CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $wpdb->suppress_errors(false);
        if (empty($wpdb->last_error)) {
            update_option('psg_table_utf8mb4', $this->db_version);
        }
    }

    private function mbstring_available() {
        return function_exists('mb_convert_encoding') && function_exists('mb_substr');
    }

    private function safe_mb_convert($string, $to, $from) {
        $string = (string) $string;
        if ($string === '') {
            return '';
        }
        if ($this->mbstring_available()) {
            $out = @mb_convert_encoding($string, $to, $from);
            return is_string($out) ? $out : $string;
        }
        if (function_exists('iconv')) {
            $out = @iconv($from, $to . '//IGNORE', $string);
            return is_string($out) && $out !== '' ? $out : $string;
        }
        return $string;
    }

    private function safe_mb_substr($string, $start, $length) {
        $string = (string) $string;
        if ($string === '') {
            return '';
        }
        if ($this->mbstring_available()) {
            $out = @mb_substr($string, $start, $length, 'UTF-8');
            if (is_string($out) && $out !== '') {
                return $out;
            }
        }
        return substr($string, 0, $length);
    }

    private function safe_mb_strpos($haystack, $needle) {
        if ($this->mbstring_available()) {
            $pos = @mb_strpos($haystack, $needle, 0, 'UTF-8');
            if ($pos !== false) {
                return $pos;
            }
        }
        return strpos($haystack, $needle);
    }

    /**
     * Create table if missing (e.g. plugin copied without re-activation).
     */
    private function ensure_table_exists() {
        global $wpdb;
        $like = $wpdb->esc_like($this->table_name);
        $found = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $like));
        if ($found !== $this->table_name) {
            $this->create_table();
        }
    }

    private function table_exists() {
        global $wpdb;
        $like = $wpdb->esc_like($this->table_name);
        $found = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $like));
        return $found === $this->table_name;
    }

    private function create_table() {
        global $wpdb;
        $charset = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$this->table_name} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            vehicle_type varchar(120) NOT NULL,
            brand varchar(120) NOT NULL,
            model varchar(120) NOT NULL,
            year varchar(20) NOT NULL,
            category_id bigint(20) unsigned NOT NULL DEFAULT 0,
            category_name varchar(200) NOT NULL DEFAULT '',
            product_id bigint(20) unsigned NOT NULL,
            description text NOT NULL,
            sort_order int(11) NOT NULL DEFAULT 0,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY vehicle_lookup (vehicle_type(50), brand(50), model(50), year(10)),
            KEY product_id (product_id)
        ) $charset;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    /* -------------------------------------------------------------------------
     * Admin
     * ---------------------------------------------------------------------- */

    public function register_admin_menu() {
        add_menu_page(
            'راهنمای انتخاب محصول',
            'راهنمای انتخاب محصول',
            'manage_woocommerce',
            'psg-guide',
            [$this, 'render_admin_page'],
            'dashicons-car',
            58
        );
    }

    public function render_admin_page() {
        if (!current_user_can('manage_woocommerce')) {
            wp_die(__('شما دسترسی لازم را ندارید.', 'psg'));
        }

        $this->ensure_table_exists();
        $count = $this->get_entry_count();
        $import_message = isset($_GET['psg_message']) ? sanitize_text_field(wp_unslash($_GET['psg_message'])) : '';
        $imported = isset($_GET['imported']) ? intval($_GET['imported']) : 0;
        $skipped = isset($_GET['skipped']) ? intval($_GET['skipped']) : 0;
        $import_errors = get_transient('psg_last_import_errors');
        if (is_array($import_errors)) {
            delete_transient('psg_last_import_errors');
        } else {
            $import_errors = [];
        }

        ?>
        <div class="wrap" dir="rtl" style="text-align:right;">
            <h1>راهنمای انتخاب محصول</h1>
            <p>داده‌های این بخش در صفحه «راهنمای انتخاب روغن» نمایش داده می‌شود. در فایل CSV فقط <strong>شناسه محصول ووکامرس</strong> را وارد کنید؛ دسته‌بندی و توضیحات هر محصول به‌صورت خودکار از ووکامرس خوانده می‌شود.</p>

            <?php if ($import_message) : ?>
                <div class="notice <?php echo ($imported > 0) ? 'notice-success' : 'notice-warning'; ?> is-dismissible">
                    <p>
                        <?php
                        echo esc_html($import_message);
                        if ($imported > 0) {
                            echo ' — ' . esc_html(sprintf('%d ردیف وارد شد.', $imported));
                        }
                        if ($skipped > 0) {
                            echo ' — ' . esc_html(sprintf('%d ردیف رد شد.', $skipped));
                        }
                        if ($imported === 0 && $skipped > 0) {
                            echo ' — هیچ ردیفی در دیتابیس ذخیره نشد.';
                        }
                        ?>
                    </p>
                    <?php if (!empty($import_errors)) : ?>
                        <ul style="margin:0.5em 0 0 1.2em;list-style:disc;">
                            <?php foreach ($import_errors as $err) : ?>
                                <li><?php echo esc_html($err); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="card" style="max-width:900px;padding:20px;margin-top:20px;">
                <h2>وضعیت داده</h2>
                <p>
                    <strong><?php echo esc_html(number_format_i18n($count)); ?></strong> ردیف در پایگاه داده ثبت شده است.
                </p>
                <p>
                    <strong>نام جدول:</strong>
                    <code dir="ltr"><?php echo esc_html($this->table_name); ?></code>
                    <?php if (!$this->table_exists()) : ?>
                        <span style="color:#d63638;"> — جدول هنوز ساخته نشده؛ یک‌بار پلاگین را غیرفعال و دوباره فعال کنید.</span>
                    <?php endif; ?>
                </p>
                <?php if ($count > 0 && $this->has_corrupted_encoding()) : ?>
                    <p style="color:#d63638;">
                        متن فارسی در دیتابیس خراب است (????). همه ردیف‌ها را حذف کنید و CSV را دوباره با <strong>CSV UTF-8</strong> بارگذاری کنید.
                    </p>
                <?php endif; ?>
            </div>

            <div class="card" style="max-width:900px;padding:20px;margin-top:20px;">
                <h2>خروجی CSV (Excel)</h2>
                <p>برای ویرایش در Excel، فایل CSV را دانلود کنید، ویرایش کنید و دوباره بارگذاری نمایید.</p>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <?php wp_nonce_field('psg_export_csv', 'psg_export_nonce'); ?>
                    <input type="hidden" name="action" value="psg_export_csv" />
                    <?php submit_button('دانلود CSV', 'secondary', 'submit', false); ?>
                </form>
            </div>

            <div class="card" style="max-width:900px;padding:20px;margin-top:20px;">
                <h2>ورود CSV</h2>
                <p>ستون‌های فایل (سطر اول — هدر):</p>
                <code dir="ltr" style="display:block;margin:10px 0;padding:10px;background:#f6f7f7;">
                    نوع خودرو,برند,مدل,سال,شناسه محصول
                </code>
                <p><strong>نوع خودرو:</strong> سواری سبک، سواری سنگین، راهداری<br>
                <strong>شناسه محصول:</strong> ID عددی محصول در ووکامرس (یک محصول در هر سطر)<br>
                هر سطر = یک خودرو + یک محصول. محصولات در سایت زیر دسته ووکامرس خودشان (مثل روغن موتور) گروه‌بندی می‌شوند.<br>
                <em>در Excel: File → Save As → CSV UTF-8 (Comma delimited) یا همان فایل نمونه را دانلود و ویرایش کنید.</em></p>

                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" enctype="multipart/form-data">
                    <?php wp_nonce_field('psg_import_csv', 'psg_import_nonce'); ?>
                    <input type="hidden" name="action" value="psg_import_csv" />
                    <table class="form-table">
                        <tr>
                            <th scope="row"><label for="psg_csv_file">فایل CSV</label></th>
                            <td><input type="file" name="psg_csv_file" id="psg_csv_file" accept=".csv,text/csv" required /></td>
                        </tr>
                        <tr>
                            <th scope="row">حالت ورود</th>
                            <td>
                                <label><input type="radio" name="import_mode" value="replace" checked /> جایگزینی کامل (حذف داده قبلی)</label><br>
                                <label><input type="radio" name="import_mode" value="append" /> افزودن به داده موجود</label>
                            </td>
                        </tr>
                    </table>
                    <?php submit_button('بارگذاری CSV', 'primary', 'submit', false); ?>
                </form>
            </div>

            <div class="card" style="max-width:900px;padding:20px;margin-top:20px;border-color:#d63638;">
                <h2 style="color:#d63638;">حذف همه داده‌ها</h2>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" onsubmit="return confirm('آیا از حذف تمام ردیف‌ها مطمئن هستید؟');">
                    <?php wp_nonce_field('psg_delete_all', 'psg_delete_nonce'); ?>
                    <input type="hidden" name="action" value="psg_delete_all" />
                    <?php submit_button('حذف همه ردیف‌ها', 'delete', 'submit', false); ?>
                </form>
            </div>
        </div>
        <?php
    }

    public function handle_csv_export() {
        if (!current_user_can('manage_woocommerce')) {
            wp_die(__('دسترسی غیرمجاز', 'psg'));
        }
        check_admin_referer('psg_export_csv', 'psg_export_nonce');

        global $wpdb;
        $rows = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY vehicle_type, brand, model, year, id ASC", ARRAY_A);

        header('Content-Type: text/csv; charset=UTF-8');
        header('Content-Disposition: attachment; filename="product-selection-guide-' . gmdate('Y-m-d') . '.csv"');
        echo "\xEF\xBB\xBF";

        $out = fopen('php://output', 'w');
        fputcsv($out, ['نوع خودرو', 'برند', 'مدل', 'سال', 'شناسه محصول']);

        foreach ($rows as $row) {
            fputcsv($out, [
                $row['vehicle_type'],
                $row['brand'],
                $row['model'],
                $row['year'],
                $row['product_id'],
            ]);
        }
        fclose($out);
        exit;
    }

    public function handle_csv_import() {
        if (!current_user_can('manage_woocommerce')) {
            wp_die(__('دسترسی غیرمجاز', 'psg'));
        }
        check_admin_referer('psg_import_csv', 'psg_import_nonce');

        try {
            $this->run_csv_import();
        } catch (Throwable $e) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('PSG CSV import error: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
            }
            $this->redirect_admin('خطا هنگام ورود CSV: ' . $e->getMessage());
        }
    }

    private function run_csv_import() {
        if (empty($_FILES['psg_csv_file']['tmp_name'])) {
            $this->redirect_admin('فایلی انتخاب نشده است.');
        }

        if (!function_exists('wc_get_product')) {
            $this->redirect_admin('ووکامرس در دسترس نیست. لطفاً WooCommerce را فعال کنید.');
        }

        if (!is_uploaded_file($_FILES['psg_csv_file']['tmp_name'])) {
            $this->redirect_admin('فایل بارگذاری معتبر نیست.');
        }

        $this->ensure_table_exists();

        $mode = isset($_POST['import_mode']) && $_POST['import_mode'] === 'append' ? 'append' : 'replace';
        if ($mode === 'replace' && $this->table_exists()) {
            $this->truncate_table();
        }

        $parsed = $this->parse_uploaded_csv($_FILES['psg_csv_file']['tmp_name']);
        if (is_wp_error($parsed)) {
            $this->redirect_admin($parsed->get_error_message());
        }

        $map = $parsed['map'];
        $data_rows = $parsed['rows'];

        $imported = 0;
        $skipped = 0;
        $line_order = 0;
        $skip_errors = [];

        foreach ($data_rows as $data) {
            if ($this->is_empty_row($data)) {
                continue;
            }

            $line_order++;
            $row = $this->parse_csv_row($data, $map, $line_order);
            if (!$row) {
                $skipped++;
                $reason = $this->diagnose_csv_row_skip($data, $map, $line_order);
                if ($reason) {
                    $skip_errors[] = sprintf('سطر %d: %s', $line_order + 1, $reason);
                }
                continue;
            }

            if ($this->insert_entry($row)) {
                $imported++;
            } else {
                $skipped++;
                global $wpdb;
                $db_err = $wpdb->last_error ? $wpdb->last_error : 'خطای دیتابیس';
                $skip_errors[] = sprintf('سطر %d: ذخیره نشد (%s)', $line_order + 1, $db_err);
            }
        }

        if (!empty($skip_errors)) {
            set_transient('psg_last_import_errors', array_slice($skip_errors, 0, 15), 120);
        }

        if ($imported === 0 && $skipped > 0) {
            $this->redirect_admin(
                'ورود CSV انجام شد اما هیچ ردیفی ذخیره نشد. شناسه‌های محصول را در ووکامرس → محصولات بررسی کنید (باید منتشر شده باشند).',
                $imported,
                $skipped
            );
        }

        $this->redirect_admin('ورود CSV انجام شد.', $imported, $skipped);
    }

    /**
     * Read CSV with Excel-friendly encodings (UTF-8, UTF-16, Windows-1256).
     *
     * @return array{map: array, delimiter: string, rows: array}|WP_Error
     */
    private function parse_uploaded_csv($file_path) {
        $content = $this->load_csv_as_utf8($file_path);
        if ($content === '') {
            return new WP_Error('psg_empty', 'فایل CSV خالی است.');
        }

        $lines = preg_split('/\r\n|\r|\n/', $content);
        $lines = array_values(array_filter($lines, function ($line) {
            return trim($line) !== '';
        }));

        if (empty($lines)) {
            return new WP_Error('psg_empty', 'فایل CSV خالی است.');
        }

        $delimiter = $this->detect_delimiter($lines[0]);
        $headers = str_getcsv($lines[0], $delimiter);
        $map = $this->map_csv_headers($headers);

        if (!$this->is_map_complete($map) && count($headers) >= 5) {
            $map = $this->positional_column_map($headers);
        }

        if (!$this->is_map_complete($map)) {
            $found = implode(' | ', array_map('trim', $headers));
            $cols = count($headers);
            return new WP_Error(
                'psg_headers',
                sprintf(
                    'ستون‌های الزامی در فایل یافت نشد (%d ستون شناسایی شد). سرستون‌ها: %s — فایل را با CSV UTF-8 ذخیره کنید یا از «دانلود CSV» همین صفحه استفاده کنید.',
                    $cols,
                    $found ?: '(خالی)'
                )
            );
        }

        $rows = [];
        for ($i = 1; $i < count($lines); $i++) {
            $rows[] = str_getcsv($lines[$i], $delimiter);
        }

        return [
            'map'       => $map,
            'delimiter' => $delimiter,
            'rows'      => $rows,
        ];
    }

    private function load_csv_as_utf8($file_path) {
        $raw = file_get_contents($file_path);
        if ($raw === false || $raw === '') {
            return '';
        }

        if (strlen($raw) >= 2 && $raw[0] === "\xFF" && $raw[1] === "\xFE") {
            return $this->safe_mb_convert(substr($raw, 2), 'UTF-8', 'UTF-16LE');
        }
        if (strlen($raw) >= 2 && $raw[0] === "\xFE" && $raw[1] === "\xFF") {
            return $this->safe_mb_convert(substr($raw, 2), 'UTF-8', 'UTF-16BE');
        }

        $had_bom = false;
        if (substr($raw, 0, 3) === "\xEF\xBB\xBF") {
            $raw = substr($raw, 3);
            $had_bom = true;
        }

        $candidates = [];
        $candidates['utf-8'] = $raw;

        foreach (['Windows-1256', 'CP1256', 'ISO-8859-6', 'ISO-8859-1'] as $encoding) {
            $converted = $this->safe_mb_convert($raw, 'UTF-8', $encoding);
            if (is_string($converted) && $converted !== '') {
                $candidates[$encoding] = $converted;
            }
        }

        $best = $this->pick_best_utf8_csv_content($candidates);
        if ($had_bom && $best !== '') {
            return $best;
        }
        return $best;
    }

    /**
     * Choose decoding that preserves Persian/Arabic script (Excel CP1256 vs UTF-8).
     */
    private function pick_best_utf8_csv_content(array $candidates) {
        $best_key = null;
        $best_score = PHP_INT_MIN;

        foreach ($candidates as $key => $content) {
            if (!is_string($content) || $content === '') {
                continue;
            }
            $score = $this->score_csv_text_encoding($content);
            if ($score > $best_score) {
                $best_score = $score;
                $best_key = $key;
            }
        }

        if ($best_key !== null && isset($candidates[$best_key])) {
            return $candidates[$best_key];
        }

        return isset($candidates['utf-8']) ? $candidates['utf-8'] : '';
    }

    private function score_csv_text_encoding($content) {
        $score = 0;
        $sample = $this->safe_mb_substr($content, 0, 2000);

        if ($this->contains_arabic_script($sample)) {
            $score += 40;
        }
        if ($this->safe_mb_strpos($sample, 'خودرو') !== false) {
            $score += 25;
        }
        if ($this->safe_mb_strpos($sample, 'سواری') !== false) {
            $score += 25;
        }
        if (preg_match('/\?{4,}/', $sample)) {
            $score -= 50;
        }
        if (preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', $sample)) {
            $score -= 20;
        }
        if ($this->mbstring_available() && !@mb_check_encoding($sample, 'UTF-8')) {
            $score -= 30;
        }

        return $score;
    }

    private function contains_arabic_script($text) {
        return (bool) preg_match('/[\x{0600}-\x{06FF}\x{0750}-\x{077F}\x{08A0}-\x{08FF}]/u', $text);
    }

    /**
     * Normalize text to valid UTF-8 before DB insert.
     */
    private function ensure_utf8_string($text) {
        $text = (string) $text;
        if ($text === '') {
            return '';
        }

        $text = wp_check_invalid_utf8($text, true);

        if ($this->contains_arabic_script($text)) {
            return $text;
        }

        foreach (['Windows-1256', 'CP1256', 'ISO-8859-6'] as $encoding) {
            $converted = $this->safe_mb_convert($text, 'UTF-8', $encoding);
            if (is_string($converted) && $this->contains_arabic_script($converted)) {
                return wp_check_invalid_utf8($converted, true);
            }
        }

        return $text;
    }

    private function sanitize_csv_field($value) {
        return sanitize_text_field($this->ensure_utf8_string($value));
    }

    private function is_map_complete($map) {
        return isset($map['vehicle_type'], $map['brand'], $map['model'], $map['year'], $map['product_id']);
    }

    /**
     * Fallback: 5 columns in order — نوع خودرو, برند, مدل, سال, شناسه محصول
     */
    private function positional_column_map($headers) {
        if (count($headers) < 5) {
            return [];
        }
        return [
            'vehicle_type' => 0,
            'brand'        => 1,
            'model'        => 2,
            'year'         => 3,
            'product_id'   => 4,
        ];
    }

    public function handle_delete_all() {
        if (!current_user_can('manage_woocommerce')) {
            wp_die(__('دسترسی غیرمجاز', 'psg'));
        }
        check_admin_referer('psg_delete_all', 'psg_delete_nonce');
        $this->truncate_table();
        $this->redirect_admin('همه ردیف‌ها حذف شدند.');
    }

    private function redirect_admin($message, $imported = 0, $skipped = 0) {
        $url = add_query_arg([
            'page'         => 'psg-guide',
            'psg_message'  => rawurlencode($message),
            'imported'     => $imported,
            'skipped'      => $skipped,
        ], admin_url('admin.php'));
        wp_safe_redirect($url);
        exit;
    }

    private function strip_bom($text) {
        if (substr($text, 0, 3) === "\xEF\xBB\xBF") {
            return substr($text, 3);
        }
        return $text;
    }

    private function detect_delimiter($line) {
        $semicolon = substr_count($line, ';');
        $comma = substr_count($line, ',');
        $tab = substr_count($line, "\t");
        if ($tab > $semicolon && $tab > $comma) {
            return "\t";
        }
        return $semicolon > $comma ? ';' : ',';
    }

    private function normalize_header_key($text) {
        $text = $this->strip_bom(trim((string) $text));
        if ($text === '') {
            return '';
        }
        $text = $this->mbstring_available()
            ? mb_strtolower($text, 'UTF-8')
            : strtolower($text);
        $text = str_replace(['ي', 'ك', 'ة', 'ۀ'], ['ی', 'ک', 'ه', 'ه'], $text);
        $text = preg_replace('/[\x{200c}\x{00a0}\s\-_]+/u', '', $text);
        return $text;
    }

    private function map_csv_headers($headers) {
        $map = [];
        foreach ($headers as $index => $header) {
            $normalized = $this->normalize_header_key($header);
            if ($normalized === '') {
                continue;
            }
            foreach ($this->csv_headers as $key => $aliases) {
                if (isset($map[$key])) {
                    continue;
                }
                foreach ($aliases as $alias) {
                    $alias_norm = $this->normalize_header_key($alias);
                    if ($normalized === $alias_norm) {
                        $map[$key] = $index;
                        break;
                    }
                    if ($alias_norm !== '' && $this->safe_mb_strpos($normalized, $alias_norm) !== false) {
                        $map[$key] = $index;
                        break;
                    }
                }
            }
        }
        return $map;
    }

    private function normalize_digits($value) {
        $value = (string) $value;
        $from = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        $to   = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return str_replace($from, $to, $value);
    }

    private function diagnose_csv_row_skip($data, $map, $line_order) {
        $get = function ($key) use ($data, $map) {
            if (!isset($map[$key])) {
                return '';
            }
            return isset($data[$map[$key]]) ? trim((string) $data[$map[$key]]) : '';
        };

        $vehicle_type = $this->sanitize_csv_field($get('vehicle_type'));
        $brand = $this->sanitize_csv_field($get('brand'));
        $model = $this->sanitize_csv_field($get('model'));
        $year = $this->sanitize_csv_field($this->normalize_digits($get('year')));
        $product_id = absint($this->normalize_digits($get('product_id')));

        if (!$vehicle_type || !$brand || !$model || !$year) {
            return 'فیلدهای خودرو (نوع، برند، مدل، سال) ناقص است';
        }
        if (preg_match('/^\?+$/', trim($vehicle_type)) || preg_match('/\?{3,}/', $vehicle_type)) {
            return 'نوع خودرو با encoding اشتباه خوانده شد — فایل را CSV UTF-8 ذخیره کنید';
        }
        if (!$product_id) {
            return 'شناسه محصول خالی یا نامعتبر است (ستون پنجم باید عدد ID ووکامرس باشد)';
        }

        $product = wc_get_product($product_id);
        if (!$product) {
            return sprintf('محصول با شناسه %d در ووکامرس وجود ندارد', $product_id);
        }
        if ($product->get_status() !== 'publish') {
            return sprintf('محصول %d وضعیت «%s» دارد؛ فقط محصولات «منتشر شده» پذیرفته می‌شوند', $product_id, $product->get_status());
        }

        if (!$this->table_exists()) {
            return 'جدول دیتابیس ساخته نشده است';
        }

        return 'دلیل نامشخص';
    }

    private function parse_csv_row($data, $map, $line_order = 0) {
        $get = function ($key) use ($data, $map) {
            if (!isset($map[$key])) {
                return '';
            }
            return isset($data[$map[$key]]) ? trim((string) $data[$map[$key]]) : '';
        };

        $vehicle_type = $this->sanitize_csv_field($get('vehicle_type'));
        $brand = $this->sanitize_csv_field($get('brand'));
        $model = $this->sanitize_csv_field($get('model'));
        $year = $this->sanitize_csv_field($this->normalize_digits($get('year')));
        $product_id = absint($this->normalize_digits($get('product_id')));

        if (!$vehicle_type || !$brand || !$model || !$year || !$product_id) {
            return null;
        }

        $product = wc_get_product($product_id);
        if (!$product || $product->get_status() !== 'publish') {
            return null;
        }

        $category = $this->resolve_product_parent_category($product_id);

        return [
            'vehicle_type'  => $this->ensure_utf8_string($vehicle_type),
            'brand'         => $this->ensure_utf8_string($brand),
            'model'         => $this->ensure_utf8_string($model),
            'year'          => $this->ensure_utf8_string($year),
            'category_id'   => $category['id'],
            'category_name' => $this->ensure_utf8_string($category['name']),
            'product_id'    => $product_id,
            'description'   => '',
            'sort_order'    => $line_order,
        ];
    }

    /**
     * Parent WooCommerce category for grouping on the guide page.
     */
    private function resolve_product_parent_category($product_id) {
        $cats = wp_get_post_terms($product_id, 'product_cat', ['fields' => 'all']);
        if (empty($cats) || is_wp_error($cats)) {
            return ['id' => 0, 'name' => 'سایر', 'menu_order' => 9999];
        }

        $best = null;
        foreach ($cats as $term) {
            if ($this->is_uncategorized_term($term)) {
                continue;
            }
            $parent = $this->get_top_level_category($term);
            if (!$parent || $this->is_uncategorized_term($parent)) {
                continue;
            }
            if (!$best || (int) $parent->term_id < (int) $best->term_id) {
                $best = $parent;
            }
        }

        if (!$best) {
            return ['id' => 0, 'name' => 'سایر', 'menu_order' => 9999];
        }

        return [
            'id'         => (int) $best->term_id,
            'name'       => $best->name,
            'menu_order' => (int) $best->term_order,
        ];
    }

    private function is_uncategorized_term($term) {
        if (!$term) {
            return true;
        }
        if ((int) $term->term_id === 17) {
            return true;
        }
        $name = $term->name ?? '';
        $slug = $term->slug ?? '';
        return $name === 'دسته-بندی-نشده' || $slug === 'دسته-بندی-نشده' || $slug === '%d8%af%d8%b3%d8%aa%d9%87%e2%80%8c%d8%a8%d9%86%d8%af%db%8c-%d9%86%d8%b4%d8%af%d9%87';
    }

    /**
     * Product description for the guide (WooCommerce short/long).
     */
    private function get_product_guide_description($product) {
        $text = $product->get_short_description();
        if (!is_string($text) || trim(wp_strip_all_tags($text)) === '') {
            $text = $product->get_description();
        }
        $text = wp_strip_all_tags($text);
        $text = trim(preg_replace('/\s+/u', ' ', $text));
        if ($text === '') {
            return '';
        }
        return wp_trim_words($text, 55, '…');
    }

    private function get_top_level_category($term) {
        while ($term && $term->parent) {
            $parent = get_term($term->parent, 'product_cat');
            if (!$parent || is_wp_error($parent)) {
                break;
            }
            $term = $parent;
        }
        return $term;
    }

    private function is_empty_row($data) {
        foreach ($data as $cell) {
            if (trim((string) $cell) !== '') {
                return false;
            }
        }
        return true;
    }

    private function insert_entry($row) {
        global $wpdb;
        return false !== $wpdb->insert(
            $this->table_name,
            [
                'vehicle_type'  => $row['vehicle_type'],
                'brand'         => $row['brand'],
                'model'         => $row['model'],
                'year'          => $row['year'],
                'category_id'   => $row['category_id'],
                'category_name' => $row['category_name'],
                'product_id'    => $row['product_id'],
                'description'   => $row['description'],
                'sort_order'    => $row['sort_order'],
            ],
            ['%s', '%s', '%s', '%s', '%d', '%s', '%d', '%s', '%d']
        );
    }

    private function truncate_table() {
        global $wpdb;
        $wpdb->query("TRUNCATE TABLE {$this->table_name}");
    }

    private function get_entry_count() {
        if (!$this->table_exists()) {
            return 0;
        }
        global $wpdb;
        return (int) $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name}");
    }

    private function has_corrupted_encoding() {
        global $wpdb;
        $sample = $wpdb->get_var("SELECT vehicle_type FROM {$this->table_name} LIMIT 1");
        if (!$sample) {
            return false;
        }
        return (bool) preg_match('/\?{3,}/', $sample) || !$this->contains_arabic_script($sample);
    }

    /* -------------------------------------------------------------------------
     * REST API
     * ---------------------------------------------------------------------- */

    public function register_rest_routes() {
        $ns = 'wca/v1/selection-guide';

        register_rest_route($ns, '/vehicle-types', [
            'methods'             => 'GET',
            'callback'            => [$this, 'api_vehicle_types'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($ns, '/brands', [
            'methods'             => 'GET',
            'callback'            => [$this, 'api_brands'],
            'permission_callback' => '__return_true',
            'args'                => [
                'vehicle_type' => ['required' => true, 'type' => 'string'],
            ],
        ]);

        register_rest_route($ns, '/models', [
            'methods'             => 'GET',
            'callback'            => [$this, 'api_models'],
            'permission_callback' => '__return_true',
            'args'                => [
                'vehicle_type' => ['required' => true, 'type' => 'string'],
                'brand'        => ['required' => true, 'type' => 'string'],
            ],
        ]);

        register_rest_route($ns, '/years', [
            'methods'             => 'GET',
            'callback'            => [$this, 'api_years'],
            'permission_callback' => '__return_true',
            'args'                => [
                'vehicle_type' => ['required' => true, 'type' => 'string'],
                'brand'        => ['required' => true, 'type' => 'string'],
                'model'        => ['required' => true, 'type' => 'string'],
            ],
        ]);

        register_rest_route($ns, '/results', [
            'methods'             => 'GET',
            'callback'            => [$this, 'api_results'],
            'permission_callback' => '__return_true',
            'args'                => [
                'vehicle_type' => ['required' => true, 'type' => 'string'],
                'brand'        => ['required' => true, 'type' => 'string'],
                'model'        => ['required' => true, 'type' => 'string'],
                'year'         => ['required' => true, 'type' => 'string'],
            ],
        ]);
    }

    public function api_vehicle_types($request) {
        global $wpdb;
        $rows = $wpdb->get_col(
            "SELECT DISTINCT vehicle_type FROM {$this->table_name} ORDER BY vehicle_type ASC"
        );
        return rest_ensure_response([
            'items' => $this->map_utf8_strings($rows),
        ]);
    }

    public function api_brands($request) {
        $vehicle_type = $this->sanitize_csv_field($request->get_param('vehicle_type'));
        return rest_ensure_response([
            'items' => $this->map_utf8_strings($this->distinct_column('brand', [
                'vehicle_type' => $vehicle_type,
            ])),
        ]);
    }

    public function api_models($request) {
        $vehicle_type = $this->sanitize_csv_field($request->get_param('vehicle_type'));
        $brand = $this->sanitize_csv_field($request->get_param('brand'));
        return rest_ensure_response([
            'items' => $this->map_utf8_strings($this->distinct_column('model', [
                'vehicle_type' => $vehicle_type,
                'brand'        => $brand,
            ])),
        ]);
    }

    public function api_years($request) {
        $vehicle_type = $this->sanitize_csv_field($request->get_param('vehicle_type'));
        $brand = $this->sanitize_csv_field($request->get_param('brand'));
        $model = $this->sanitize_csv_field($request->get_param('model'));
        $years = $this->distinct_column('year', [
            'vehicle_type' => $vehicle_type,
            'brand'        => $brand,
            'model'        => $model,
        ]);
        usort($years, function ($a, $b) {
            return (int) $b <=> (int) $a;
        });
        return rest_ensure_response(['items' => $this->map_utf8_strings($years)]);
    }

    private function map_utf8_strings($list) {
        if (!is_array($list)) {
            return [];
        }
        return array_values(array_filter(array_map(function ($value) {
            return $this->ensure_utf8_string((string) $value);
        }, $list), function ($value) {
            return $value !== '';
        }));
    }

    public function api_results($request) {
        global $wpdb;

        $vehicle_type = $this->sanitize_csv_field($request->get_param('vehicle_type'));
        $brand = $this->sanitize_csv_field($request->get_param('brand'));
        $model = $this->sanitize_csv_field($request->get_param('model'));
        $year = $this->sanitize_csv_field($request->get_param('year'));

        $entries = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$this->table_name}
                 WHERE vehicle_type = %s AND brand = %s AND model = %s AND year = %s
                 ORDER BY id ASC",
                $vehicle_type,
                $brand,
                $model,
                $year
            ),
            ARRAY_A
        );

        if (empty($entries)) {
            return rest_ensure_response([
                'selection'  => compact('vehicle_type', 'brand', 'model', 'year'),
                'categories' => [],
                'total'      => 0,
            ]);
        }

        $core = class_exists('WooCommerce_API_Core') ? WooCommerce_API_Core::get_instance() : null;
        $grouped = [];
        $seen_in_category = [];

        foreach ($entries as $entry) {
            $product = wc_get_product((int) $entry['product_id']);
            if (!$product || $product->get_status() !== 'publish') {
                continue;
            }

            $category = $this->resolve_product_parent_category((int) $entry['product_id']);
            $cat_key = $category['name'];
            $dedupe_key = $cat_key . ':' . $entry['product_id'];
            if (isset($seen_in_category[$dedupe_key])) {
                continue;
            }
            $seen_in_category[$dedupe_key] = true;

            if (!isset($grouped[$cat_key])) {
                $grouped[$cat_key] = [
                    'id'         => $category['id'],
                    'name'       => $cat_key,
                    'menu_order' => $category['menu_order'],
                    'products'   => [],
                ];
            }

            $product_data = $core
                ? $core->format_product_data($product, false)
                : [
                    'id'                => $product->get_id(),
                    'name'              => $product->get_name(),
                    'slug'              => $product->get_slug(),
                    'short_description' => $product->get_short_description(),
                    'description'       => $product->get_description(),
                ];

            $grouped[$cat_key]['products'][] = [
                'product'     => $product_data,
                'description' => $this->get_product_guide_description($product),
                'summary'     => trim($cat_key . ' ' . $brand . ' ' . $model . ' ' . $year),
            ];
        }

        $categories = array_values($grouped);
        usort($categories, function ($a, $b) {
            $order = ($a['menu_order'] ?? 9999) <=> ($b['menu_order'] ?? 9999);
            if ($order !== 0) {
                return $order;
            }
            return strcmp($a['name'], $b['name']);
        });
        foreach ($categories as &$cat) {
            unset($cat['menu_order']);
        }
        unset($cat);

        return rest_ensure_response([
            'selection'  => [
                'vehicle_type' => $this->ensure_utf8_string($vehicle_type),
                'brand'        => $this->ensure_utf8_string($brand),
                'model'        => $this->ensure_utf8_string($model),
                'year'         => $this->ensure_utf8_string($year),
            ],
            'categories' => $categories,
            'total'      => count($entries),
        ]);
    }

    private function distinct_column($column, $filters) {
        global $wpdb;
        $allowed = ['vehicle_type', 'brand', 'model', 'year'];
        if (!in_array($column, $allowed, true)) {
            return [];
        }

        $where = ['1=1'];
        $values = [];
        foreach ($filters as $key => $value) {
            if (!in_array($key, $allowed, true) || $value === '') {
                continue;
            }
            $where[] = "{$key} = %s";
            $values[] = $value;
        }

        $sql = "SELECT DISTINCT {$column} FROM {$this->table_name} WHERE " . implode(' AND ', $where) . " ORDER BY {$column} ASC";
        if (!empty($values)) {
            $sql = $wpdb->prepare($sql, $values);
        }

        $rows = $wpdb->get_col($sql);
        return array_values(array_filter(array_map('strval', $rows)));
    }
}

add_action('plugins_loaded', function () {
    if (class_exists('WooCommerce')) {
        Product_Selection_Guide::get_instance();
    }
}, 20);
