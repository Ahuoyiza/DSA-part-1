/**
 * tabs.js — Tab switcher (plain script, no ES modules)
 * Exposes: initTabs(root)
 */

function initTabs(root) {
  root = root || document;

  root.querySelectorAll('.tab-btn').forEach(function(btn) {
    if (btn.dataset.tabsBound) return;
    btn.dataset.tabsBound = '1';

    btn.addEventListener('click', function() {
      var paneId = btn.dataset.pane;
      if (!paneId) return;

      var tabsEl = btn.closest('.tabs');
      if (!tabsEl) return;

      tabsEl.querySelectorAll('.tab-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      tabsEl.querySelectorAll('.tab-pane').forEach(function(p) {
        p.classList.remove('active');
      });

      btn.classList.add('active');
      var pane = document.getElementById(paneId);
      if (pane) pane.classList.add('active');
    });
  });

  // Activate first tab in each .tabs that has none active
  root.querySelectorAll('.tabs').forEach(function(tabsEl) {
    var firstBtn  = tabsEl.querySelector('.tab-btn');
    var firstPane = tabsEl.querySelector('.tab-pane');
    if (firstBtn  && !tabsEl.querySelector('.tab-btn.active'))  firstBtn.classList.add('active');
    if (firstPane && !tabsEl.querySelector('.tab-pane.active')) firstPane.classList.add('active');
  });
}
