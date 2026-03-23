/**
 * app.js — Main entry point (no ES modules — works on file://, servers, Vercel)
 *
 * navigation.js and tabs.js are loaded as plain <script> tags before this file.
 * All functions (initNavigation, initTabs, etc.) are available on window scope.
 */

;(function () {
  'use strict';

  var PAGES = [
    'page-01','page-02','page-03','page-04','page-05',
    'page-06','page-07','page-08','page-09','page-10'
  ];
  var TOTAL = PAGES.length;

  /* ── Mode detection ──────────────────────────────────────── */

  function isBuiltMode() {
    var container = document.getElementById('page-container');
    return !!(container && container.dataset.built === 'true');
  }

  /* ── Navigation ──────────────────────────────────────────── */

  function navigateTo(pageId) {
    if (isBuiltMode()) {
      activatePage(pageId);
      updateProgress(pageId);
      window.scrollTo({ top: 0, behavior: 'instant' });
      closeSidebarMobile();
    } else {
      loadAndActivate(pageId);
    }
  }

  function activatePage(pageId) {
    document.querySelectorAll('.page').forEach(function(p) {
      p.classList.remove('active');
    });
    document.querySelectorAll('.sb-nav-item').forEach(function(n) {
      n.classList.remove('active');
    });

    var page = document.getElementById(pageId);
    if (page) {
      page.classList.add('active');
      if (typeof initTabs === 'function') initTabs(page);
    }

    var navItem = document.querySelector('.sb-nav-item[data-page="' + pageId + '"]');
    if (navItem) navItem.classList.add('active');
  }

  /* ── Dev-mode fetch ──────────────────────────────────────── */

  function loadAndActivate(pageId) {
    var existing = document.getElementById(pageId);
    if (existing && !existing.querySelector('#page-loader')) {
      activatePage(pageId);
      updateProgress(pageId);
      window.scrollTo({ top: 0, behavior: 'instant' });
      closeSidebarMobile();
      return;
    }

    if (!existing) showSpinner(pageId);
    activatePage(pageId);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'pages/' + pageId + '.html', true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var slot = document.getElementById(pageId);
        if (slot) {
          slot.innerHTML = xhr.responseText;
          if (typeof initTabs === 'function') initTabs(slot);
        }
      } else {
        showError(pageId, 'HTTP ' + xhr.status);
      }
      updateProgress(pageId);
      window.scrollTo({ top: 0, behavior: 'instant' });
      closeSidebarMobile();
    };
    xhr.onerror = function () {
      showError(pageId, 'Network error — serve via a local server or run node build.js');
    };
    xhr.send();
  }

  function showSpinner(pageId) {
    var container = document.getElementById('page-container');
    if (!container || document.getElementById(pageId)) return;
    var div = document.createElement('div');
    div.id = pageId;
    div.className = 'page';
    div.innerHTML =
      '<div id="page-loader">' +
        '<div class="skeleton-hero-wrap">' +
          '<div class="skeleton skeleton-badge"></div>' +
          '<div class="skeleton skeleton-title"></div>' +
          '<div class="skeleton skeleton-title w-40"></div>' +
          '<div class="skeleton skeleton-defn"></div>' +
        '</div>' +
        '<div class="skeleton-body-wrap">' +
          '<div class="skeleton-section">' +
            '<div class="skeleton-label"></div>' +
            '<div class="skeleton-card"></div>' +
          '</div>' +
          '<div class="skeleton-section">' +
            '<div class="skeleton-section-heading"></div>' +
            '<div class="skeleton-line w-full"></div>' +
            '<div class="skeleton-line w-85"></div>' +
            '<div class="skeleton-line w-65"></div>' +
          '</div>' +
          '<div class="skeleton-section">' +
            '<div class="skeleton-card"></div>' +
            '<div class="skeleton-card"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    container.appendChild(div);
  }

  function showError(pageId, message) {
    var slot = document.getElementById(pageId);
    if (!slot) return;
    slot.innerHTML =
      '<div class="page-error">' +
        '<div class="page-error-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
            '<circle cx="12" cy="12" r="10"/>' +
            '<line x1="12" y1="8" x2="12" y2="12"/>' +
            '<line x1="12" y1="16" x2="12.01" y2="16"/>' +
          '</svg>' +
        '</div>' +
        '<p class="page-error-title">Couldn\'t load this page</p>' +
        '<p class="page-error-desc">Something went wrong while fetching the content. Check your connection and try again.</p>' +
        '<button class="page-error-retry" data-retry="' + pageId + '">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>' +
          'Try again' +
        '</button>' +
        '<p class="page-error-hint">Or run <code>node build.js</code> → open <code>dist/index.html</code></p>' +
      '</div>';

    var retryBtn = slot.querySelector('[data-retry]');
    if (retryBtn) {
      retryBtn.addEventListener('click', function() {
        var parent = slot.parentNode;
        if (parent) parent.removeChild(slot);
        loadAndActivate(pageId);
      });
    }
  }

  /* ── Progress ─────────────────────────────────────────────── */

  function updateProgress(pageId) {
    var num = parseInt(pageId.replace('page-', ''), 10);
    var pct = Math.round((num / TOTAL) * 100);

    var fill  = document.querySelector('.sb-progress-fill');
    var count = document.querySelector('.sb-progress-count');
    var topBar = document.querySelector('.top-bar-progress');

    if (fill)   fill.style.width = pct + '%';
    if (count)  count.textContent = num + '/' + TOTAL;
    if (topBar) topBar.textContent = num + ' / ' + TOTAL;
  }

  /* ── Mobile sidebar ───────────────────────────────────────── */

  function closeSidebarMobile() {
    var sb = document.getElementById('sidebar');
    var ov = document.getElementById('overlay');
    if (sb) sb.classList.remove('open');
    if (ov) ov.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function openSidebarMobile() {
    var sb = document.getElementById('sidebar');
    var ov = document.getElementById('overlay');
    if (sb) sb.classList.add('open');
    if (ov) ov.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  /* ── Desktop sidebar collapse ─────────────────────────────── */

  function collapseSidebar() {
    var sb     = document.getElementById('sidebar');
    var main   = document.getElementById('main');
    var reopen = document.getElementById('sb-reopen');
    var btn    = document.getElementById('sb-collapse-btn');
    if (sb)     sb.classList.add('collapsed');
    if (main)   main.classList.add('sidebar-collapsed');
    if (reopen) reopen.style.display = 'flex';
    if (btn)    btn.querySelector('svg').style.transform = 'rotate(180deg)';
  }

  function expandSidebar() {
    var sb     = document.getElementById('sidebar');
    var main   = document.getElementById('main');
    var reopen = document.getElementById('sb-reopen');
    var btn    = document.getElementById('sb-collapse-btn');
    if (sb)     sb.classList.remove('collapsed');
    if (main)   main.classList.remove('sidebar-collapsed');
    if (reopen) reopen.style.display = 'none';
    if (btn)    btn.querySelector('svg').style.transform = '';
  }

  /* ── Wire navigation ──────────────────────────────────────── */

  function wireNav() {
    var menuBtn  = document.getElementById('menu-btn');
    var overlay  = document.getElementById('overlay');
    var sbClose  = document.querySelector('.sb-close');
    var sbCollapse = document.getElementById('sb-collapse-btn');
    var sbReopen   = document.getElementById('sb-reopen');

    if (menuBtn)   menuBtn.addEventListener('click', openSidebarMobile);
    if (overlay)   overlay.addEventListener('click', closeSidebarMobile);
    if (sbClose)   sbClose.addEventListener('click', closeSidebarMobile);
    if (sbCollapse) sbCollapse.addEventListener('click', collapseSidebar);
    if (sbReopen)   sbReopen.addEventListener('click', expandSidebar);

    document.querySelectorAll('.sb-nav-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var pageId = item.dataset.page;
        if (pageId) navigateTo(pageId);
      });
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var pageId = item.dataset.page;
          if (pageId) navigateTo(pageId);
        }
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSidebarMobile();
    });
  }

  /* ── SVG sprite (dev mode only) ───────────────────────────── */

  function injectSVGSprite() {
    if (isBuiltMode()) return;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/icons.svg', true);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        var div = document.createElement('div');
        div.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
        div.innerHTML = xhr.responseText;
        document.body.insertBefore(div, document.body.firstChild);
      }
    };
    xhr.send();
  }

  /* ── Bootstrap ────────────────────────────────────────────── */

  function init() {
    injectSVGSprite();
    wireNav();
    navigateTo('page-01');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
