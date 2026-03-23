/**
 * navigation.js — Sidebar open/close (plain script, no ES modules)
 * Functions used by app.js which loads after this file.
 */

function openSidebar() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('overlay');
  if (sb) sb.classList.add('open');
  if (ov) ov.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('overlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('visible');
  document.body.style.overflow = '';
}

// initNavigation is called by app.js — kept for build.js compat
function initNavigation() {
  // Wired directly in app.js wireNav()
}
