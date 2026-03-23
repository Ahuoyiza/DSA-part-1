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
    div.innerHTML = '<div id="page-loader"><div class="loader-spinner"></div>Loading...</div>';
    container.appendChild(div);
  }

  function showError(pageId, message) {
    var slot = document.getElementById(pageId);
    if (slot) {
      slot.innerHTML =
        '<div class="page-error">' +
          '<p class="page-error-title">Failed to load page</p>' +
          '<p class="page-error-desc">' + message + '</p>' +
          '<p class="page-error-desc" style="margin-top:12px;color:var(--text-muted)">' +
            'Run <code>node build.js</code> and open <code>dist/index.html</code>, ' +
            'or serve with: <code>python3 -m http.server 8080</code>' +
          '</p>' +
        '</div>';
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
