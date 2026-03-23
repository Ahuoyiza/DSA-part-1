/**
 * build.js — Rise Academy DSA Lesson 11
 *
 * Inlines all page fragments, CSS, JS, and the SVG sprite into a single
 * self-contained dist/index.html that opens directly from the filesystem
 * (no server required).
 *
 * Usage:
 *   node build.js
 *
 * Output:
 *   dist/index.html
 */

const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const PAGES = [
  'page-01', 'page-02', 'page-03', 'page-04', 'page-05',
  'page-06', 'page-07', 'page-08', 'page-09', 'page-10',
];

const CSS_FILES = [
  'css/variables.css',
  'css/layout.css',
  'css/components.css',
  'css/diagrams.css',
];

const JS_FILES = [
  'js/navigation.js',
  'js/tabs.js',
  'js/app.js',
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function read(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn(`  [warn] Missing file: ${relPath}`);
    return '';
  }
  return fs.readFileSync(abs, 'utf8');
}

function indent(str, spaces = 4) {
  return str.split('\n').map(l => ' '.repeat(spaces) + l).join('\n');
}

// ── Build CSS bundle ──────────────────────────────────────────────────────────

function buildCSS() {
  return CSS_FILES.map(f => {
    const content = read(f);
    // Strip @import url() for Google Fonts — we keep those as a <link> tag
    return content.replace(/@import url\([^)]+\);?\n?/g, '');
  }).join('\n\n');
}

// ── Build JS bundle ───────────────────────────────────────────────────────────
// Strips ES module syntax (export/import) and wraps in an IIFE.
// Since this is a simple app with no circular deps, a naive transform is fine.

function buildJS() {
  const parts = JS_FILES.map(f => {
    let src = read(f);

    // Remove export keywords
    src = src.replace(/^export\s+(default\s+)?/gm, '');

    // Replace ES module imports with nothing (functions are in same scope)
    src = src.replace(/^import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?\n?/gm, '');
    src = src.replace(/^import\s+\*[^;]+;?\n?/gm, '');

    return `// ── ${f} ──\n${src}`;
  });

  return `(function () {\n'use strict';\n\n${parts.join('\n\n')}\n\n// Boot\ndocument.addEventListener('DOMContentLoaded', init);\n})();`;
}

// ── Build page fragments ──────────────────────────────────────────────────────

function buildPages() {
  return PAGES.map(pageId => {
    const content = read(`pages/${pageId}.html`);
    if (!content.trim()) {
      // Placeholder for not-yet-built pages
      return `
    <div id="${pageId}" class="page">
      <div class="page-error">
        <p class="page-error-title">Page not built yet</p>
        <p class="page-error-desc">${pageId}.html is empty or missing</p>
      </div>
    </div>`;
    }
    return `
    <!-- ══ ${pageId.toUpperCase()} ══ -->
    <div id="${pageId}" class="page">
${indent(content, 6)}
    </div>`;
  }).join('\n');
}

// ── Build SVG sprite ──────────────────────────────────────────────────────────

function buildSVGSprite() {
  const content = read('assets/icons.svg');
  return `  <div style="position:absolute;width:0;height:0;overflow:hidden;" aria-hidden="true">\n${content}\n  </div>`;
}

// ── Assemble ──────────────────────────────────────────────────────────────────

function buildHTML() {
  const css    = buildCSS();
  const js     = buildJS();
  const pages  = buildPages();
  const sprite = buildSVGSprite();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rise Academy — Lesson 11: DSA Foundations</title>
  <meta name="description" content="A comprehensive, interactive guide to Data Structures and Algorithms fundamentals." />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Caveat:wght@400;600;700&display=swap" rel="stylesheet" />

  <style>
${indent(css, 4)}
  </style>
</head>
<body>

${sprite}

  <!-- Hamburger -->
  <button id="menu-btn" aria-label="Open navigation menu">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" viewBox="0 0 24 24">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  </button>

  <!-- Mobile top bar -->
  <div id="top-bar" role="banner">
    <span class="top-bar-title">Rise Academy &middot; Lesson 11</span>
    <span class="top-bar-progress">1 / 10</span>
  </div>

  <!-- Overlay -->
  <div id="overlay" role="presentation"></div>

  <!-- Sidebar -->
  <nav id="sidebar" role="navigation" aria-label="Lesson navigation">
    <div class="sb-brand">
      <div class="sb-brand-academy">Rise Academy</div>
      <div class="sb-brand-title">DSA Foundations</div>
      <div class="sb-brand-sub">Lesson 11</div>
      <button class="sb-close" aria-label="Close navigation">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div class="sb-nav" role="list">
      <div class="sb-section-label">Introduction</div>
      <div class="sb-nav-item" data-page="page-01" role="listitem" tabindex="0"><span class="sb-num">01</span><span class="sb-label">What is DSA?</span></div>
      <div class="sb-nav-item" data-page="page-02" role="listitem" tabindex="0"><span class="sb-num">02</span><span class="sb-label">Why DSA Matters</span></div>

      <div class="sb-section-label">Complexity</div>
      <div class="sb-nav-item" data-page="page-03" role="listitem" tabindex="0"><span class="sb-num">03</span><span class="sb-label">Complexity Analysis</span></div>
      <div class="sb-nav-item" data-page="page-04" role="listitem" tabindex="0"><span class="sb-num">04</span><span class="sb-label">Big O Notation</span></div>
      <div class="sb-nav-item" data-page="page-05" role="listitem" tabindex="0"><span class="sb-num">05</span><span class="sb-label">Space vs Time</span></div>

      <div class="sb-section-label">Data Structures</div>
      <div class="sb-nav-item" data-page="page-06" role="listitem" tabindex="0"><span class="sb-num">06</span><span class="sb-label">Arrays</span></div>
      <div class="sb-nav-item" data-page="page-07" role="listitem" tabindex="0"><span class="sb-num">07</span><span class="sb-label">Strings</span></div>
      <div class="sb-nav-item" data-page="page-08" role="listitem" tabindex="0"><span class="sb-num">08</span><span class="sb-label">Linked Lists</span></div>
      <div class="sb-nav-item" data-page="page-09" role="listitem" tabindex="0"><span class="sb-num">09</span><span class="sb-label">Stacks</span></div>
      <div class="sb-nav-item" data-page="page-10" role="listitem" tabindex="0"><span class="sb-num">10</span><span class="sb-label">Queues</span></div>
    </div>

    <div class="sb-progress">
      <div class="sb-progress-label">
        <span>Progress</span>
        <span class="sb-progress-count">1/10</span>
      </div>
      <div class="sb-progress-bar">
        <div class="sb-progress-fill"></div>
      </div>
    </div>
  </nav>

  <!-- Main -->
  <main id="main" role="main">
    <div id="page-container" data-built="true">
${pages}
    </div>
  </main>

  <script>
${indent(js, 4)}
  </script>

</body>
</html>`;
}

// ── Write output ──────────────────────────────────────────────────────────────

function build() {
  console.log('\nRise Academy DSA — Build\n' + '─'.repeat(40));

  // Ensure dist/ exists
  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
    console.log('  Created dist/');
  }

  console.log('  Bundling CSS...');
  console.log('  Bundling JS...');
  console.log('  Inlining pages...');

  const html = buildHTML();
  const outPath = path.join(DIST, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');

  const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`\n  Output: dist/index.html  (${sizeKB} KB)`);
  console.log('  Open dist/index.html directly in any browser — no server needed.\n');
}

build();
