(function () {
  'use strict';
  var id = 'G-DWDNELR72E';
  var key = 'howtokyc_analytics_v1';
  var loaded = false;
  var choice;
  try { choice = localStorage.getItem(key); } catch (_) {}
  window['ga-disable-' + id] = choice !== 'granted';

  function enable() {
    window['ga-disable-' + id] = false;
    if (loaded) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', id);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }

  function disable() {
    window['ga-disable-' + id] = true;
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', location.hostname, '.howtokyc.com'].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  var panel = document.createElement('section');
  panel.setAttribute('aria-label', 'Analytics consent');
  panel.style.cssText = 'position:fixed;bottom:16px;left:16px;right:16px;max-width:560px;padding:20px;background:#fff;color:#111;border:1px solid #999;border-radius:12px;z-index:1000;box-shadow:0 4px 24px #0003;font:16px/1.5 sans-serif';
  var description = document.createElement('p');
  description.textContent = 'Allow analytics cookies to help us understand which guides are useful? You can read every guide without them.';
  panel.appendChild(description);
  function button(label, action, parent) {
    var element = document.createElement('button');
    element.type = 'button';
    element.textContent = label;
    element.style.cssText = 'padding:10px 14px;margin:4px;cursor:pointer;color:#111;background:#fff;border:1px solid #555;border-radius:6px';
    element.addEventListener('click', action);
    parent.appendChild(element);
    return element;
  }
  function choose(value) {
    choice = value;
    try { localStorage.setItem(key, value); } catch (_) {}
    if (value === 'granted') enable(); else disable();
    panel.hidden = true;
    settings.focus();
  }
  var allow = button('Allow analytics', function () { choose('granted'); }, panel);
  button('Decline analytics', function () { choose('denied'); }, panel);
  var privacy = document.createElement('a');
  privacy.href = '/privacy';
  privacy.textContent = 'Privacy policy';
  panel.appendChild(privacy);
  document.body.appendChild(panel);
  var settings = button('Analytics settings', function () { panel.hidden = false; allow.focus(); }, document.body);
  window.addEventListener('storage', function (event) {
    if (event.key !== key) return;
    if (event.newValue === 'granted') enable(); else disable();
    panel.hidden = event.newValue === 'granted' || event.newValue === 'denied';
  });
  panel.hidden = choice === 'granted' || choice === 'denied';
  if (choice === 'granted') enable();
}());
