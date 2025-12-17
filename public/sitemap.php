<?php
// Dynamic sitemap for static-hosted Next.js (cPanel)
// - Generates fresh blog/product URLs by calling WP JSON API
// - Also includes key static pages

header('Content-Type: application/xml; charset=UTF-8');

function base_url(): string {
  $proto = 'https';
  if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
    $proto = $_SERVER['HTTP_X_FORWARDED_PROTO'];
  } elseif (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    $proto = 'https';
  } elseif (!empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '80') {
    $proto = 'http';
  }

  $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
  return $proto . '://' . $host;
}

function fetch_json(string $url) {
  // Prefer cURL
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($body === false || $code < 200 || $code >= 300) return null;
    $json = json_decode($body, true);
    return is_array($json) ? $json : null;
  }

  // Fallback
  $ctx = stream_context_create([
    'http' => [
      'method' => 'GET',
      'timeout' => 30,
      'header' => "Accept: application/json\r\n",
    ],
  ]);
  $body = @file_get_contents($url, false, $ctx);
  if ($body === false) return null;
  $json = json_decode($body, true);
  return is_array($json) ? $json : null;
}

function esc_xml(string $s): string {
  return htmlspecialchars($s, ENT_XML1 | ENT_COMPAT, 'UTF-8');
}

$SITE = base_url();
$WP_JSON = 'https://padradarasoil.com/wp-json';

$staticUrls = [
  $SITE . '/',
  $SITE . '/products/',
  $SITE . '/blog/',
  $SITE . '/about-us/',
  $SITE . '/contact-us/',
];

$urls = [];
$now = gmdate('c');

foreach ($staticUrls as $u) {
  $urls[] = ['loc' => $u, 'lastmod' => $now];
}

// Products: /products/{slug}/
$page = 1;
$per = 100;
for ($i = 0; $i < 50; $i++) {
  $data = fetch_json($WP_JSON . '/wca/v1/products?per_page=' . $per . '&page=' . $page);
  if (!$data || !isset($data['products']) || !is_array($data['products'])) break;

  $items = $data['products'];
  foreach ($items as $p) {
    if (empty($p['slug'])) continue;
    $last = !empty($p['date_modified']) ? gmdate('c', strtotime($p['date_modified'])) : $now;
    $urls[] = [
      'loc' => $SITE . '/products/' . $p['slug'] . '/',
      'lastmod' => $last,
    ];
  }

  if (count($items) < $per) break;
  $page++;
}

// Blog posts: /blog/{slug}/
$page = 1;
$per = 100;
for ($i = 0; $i < 50; $i++) {
  $data = fetch_json($WP_JSON . '/website/v1/post-list?per_page=' . $per . '&page=' . $page);
  if (!$data || !isset($data['posts']) || !is_array($data['posts'])) break;

  $items = $data['posts'];
  foreach ($items as $p) {
    if (empty($p['slug'])) continue;
    $last = $now;
    if (!empty($p['modified_date'])) {
      $last = gmdate('c', strtotime(str_replace(' ', 'T', $p['modified_date'])));
    } elseif (!empty($p['date_full'])) {
      $last = gmdate('c', strtotime(str_replace(' ', 'T', $p['date_full'])));
    } elseif (!empty($p['date'])) {
      $last = gmdate('c', strtotime($p['date']));
    }

    $urls[] = [
      'loc' => $SITE . '/blog/' . $p['slug'] . '/',
      'lastmod' => $last,
    ];
  }

  if (count($items) < $per) break;
  $page++;
}

// Output sitemap

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
foreach ($urls as $u) {
  echo "  <url>\n";
  echo "    <loc>" . esc_xml($u['loc']) . "</loc>\n";
  if (!empty($u['lastmod'])) {
    echo "    <lastmod>" . esc_xml($u['lastmod']) . "</lastmod>\n";
  }
  echo "  </url>\n";
}
echo "</urlset>\n";
