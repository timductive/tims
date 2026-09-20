/* Site-wide progressive enhancement. Everything here is optional:
   the pages work without it. Vanilla ES5-ish for broad support. */
(function () {
  'use strict';

  var doc = document;
  doc.documentElement.className = doc.documentElement.className.replace(/\bno-js\b/, 'js');

  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }

  /* ---------- Mobile nav toggle ---------- */
  (function navToggle() {
    var toggle = $('.nav-toggle');
    var nav = $('#site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    doc.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
  })();

  /* ---------- ⌘K / Ctrl+K / "/" → search ---------- */
  (function searchShortcut() {
    var searchLink = $('.search-button');
    if (!searchLink) return;
    var href = searchLink.getAttribute('href');

    function isTypingTarget(el) {
      if (!el) return false;
      var tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    }

    doc.addEventListener('keydown', function (e) {
      var cmdK = (e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && (e.key === 'k' || e.key === 'K');
      var slash = e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target);
      if (!cmdK && !slash) return;
      e.preventDefault();
      var input = $('#q');
      if (input) {
        // Bring the box into view first; focus() alone won't scroll if it's already focused.
        var box = input.closest('.search-box') || input;
        box.scrollIntoView({ block: 'center', behavior: 'smooth' });
        input.focus({ preventScroll: true });
        input.select();
        return;
      }
      window.location.href = href;
    });
  })();

  /* ---------- ?tag= / ?filter= list filtering (Writing, Work) ---------- */
  (function listFilter() {
    var list = $('[data-filter-list]');
    if (!list) return;
    var param = list.getAttribute('data-filter-param') || 'tag';
    var attr = list.getAttribute('data-filter-attr') || 'data-tags';
    var chips = $$('[data-filter-chip]');
    var groups = $$('[data-filter-group]', list);
    var items = $$('[' + attr + ']', list);
    var status = $('[data-filter-status]');

    function read() {
      var m = new RegExp('[?&]' + param + '=([^&#]*)').exec(window.location.search);
      return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
    }

    function apply(value) {
      var shown = 0;
      items.forEach(function (el) {
        var vals = (el.getAttribute(attr) || '').split('|');
        var ok = !value || vals.indexOf(value) !== -1;
        el.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach(function (g) {
        var visible = $$('[' + attr + ']', g).some(function (el) { return !el.hidden; });
        g.hidden = !visible;
      });
      chips.forEach(function (chip) {
        var v = chip.getAttribute('data-filter-chip');
        var active = (v === '' && !value) || v === value;
        if (active) chip.setAttribute('aria-current', 'true'); else chip.removeAttribute('aria-current');
      });
      if (status) {
        status.textContent = value ? shown + ' shown · filtered by "' + value + '"' : '';
      }
      window.dispatchEvent(new Event('resize'));
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function (e) {
        // Only intercept same-page filter links.
        if (chip.tagName !== 'A') return;
        var value = chip.getAttribute('data-filter-chip');
        e.preventDefault();
        var url = window.location.pathname + (value ? '?' + param + '=' + encodeURIComponent(value) : '');
        window.history.replaceState(null, '', url);
        apply(value);
      });
    });

    apply(read());
  })();

  /* ---------- Chip row overflow → "more" dropdown ---------- */
  (function chipOverflow() {
    var row = $('[data-chip-overflow]');
    if (!row) return;
    var chips = $$('[data-filter-chip]', row);
    if (chips.length < 2) return;

    var more = doc.createElement('details');
    more.className = 'chip-more';
    var summary = doc.createElement('summary');
    summary.className = 'chip chip-more__summary';
    summary.innerHTML = '<span data-more-label>more</span>' +
      '<svg class="icon chip-more__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="6,9 12,15 18,9"></polyline></svg>';
    var menu = doc.createElement('div');
    menu.className = 'chip-more__menu';
    menu.setAttribute('role', 'list');
    more.appendChild(summary);
    more.appendChild(menu);
    row.appendChild(more);

    function overflows() {
      // The row is nowrap; it "overflows" when the last thing on it runs past the row's right edge
      // or onto a second line (no-JS fallback CSS allows wrapping).
      var rowBox = row.getBoundingClientRect();
      var lastBox = more.getBoundingClientRect();
      return lastBox.right > rowBox.right + 0.5 || lastBox.top > chips[0].getBoundingClientRect().top + 1;
    }

    function layout() {
      // Put everything back on the row, then peel chips off the end until it fits on one line.
      chips.forEach(function (c) { row.insertBefore(c, more); });
      more.hidden = false;
      more.open = false;
      var label = summary.querySelector('[data-more-label]');
      var guard = chips.length;
      function relabel() {
        var hidden = chips.filter(function (c) { return c.parentNode === menu; });
        // If the active filter is tucked away, say so on the button.
        var active = hidden.filter(function (c) { return c.getAttribute('aria-current') === 'true'; })[0];
        label.textContent = active ? active.textContent.replace(/\s*·.*$/, '') : 'more · ' + hidden.length;
        summary.classList.toggle('chip--active', !!active);
        return hidden.length;
      }
      // Peel chips off the end until the row (including the labeled button) fits on one line.
      while (guard-- > 0) {
        relabel();
        if (!overflows()) break;
        var visible = chips.filter(function (c) { return c.parentNode === row; });
        if (visible.length <= 1) break;
        menu.insertBefore(visible[visible.length - 1], menu.firstChild);
      }
      if (!relabel()) more.hidden = true;
    }

    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-filter-chip]')) {
        window.setTimeout(layout, 0);
      }
    });
    doc.addEventListener('click', function (e) {
      if (more.open && !more.contains(e.target)) more.open = false;
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && more.open) { more.open = false; summary.focus(); }
    });

    var raf = null;
    window.addEventListener('resize', function () {
      if (raf) return;
      raf = window.requestAnimationFrame(function () { raf = null; layout(); });
    });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(layout);
    layout();
  })();

  /* ---------- Copy buttons (link + code) ---------- */
  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      return;
    }
    var ta = doc.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    doc.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = doc.execCommand('copy'); } catch (err) { ok = false; }
    doc.body.removeChild(ta);
    done(ok);
  }

  function flash(btn, label) {
    var prev = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', prev);
    btn.classList.add('is-done');
    var live = btn.querySelector('[data-copy-text]');
    if (live) live.textContent = label; else btn.textContent = label;
    window.setTimeout(function () {
      btn.classList.remove('is-done');
      if (live) live.textContent = prev; else btn.textContent = prev;
    }, 1600);
  }

  (function copyLink() {
    $$('[data-copy-link]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        copyText(window.location.href, function (ok) { flash(btn, ok ? 'copied' : 'failed'); });
      });
    });
  })();

  (function codeBlocks() {
    // Bare <pre> from legacy posts: wrap so the bar has somewhere to live.
    $$('.prose > pre').forEach(function (pre) {
      var wrap = doc.createElement('div');
      wrap.className = 'highlighter-rouge';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
    });
    $$('.prose div.highlighter-rouge, .prose figure.highlight').forEach(function (block) {
      var pre = block.querySelector('pre');
      if (!pre) return;
      var lang = '';
      var m = /language-([a-z0-9_+-]+)/i.exec(block.className);
      if (m) lang = m[1];
      var bar = doc.createElement('div');
      bar.className = 'code__bar';
      var label = doc.createElement('span');
      label.className = 'code__lang';
      label.textContent = lang || 'code';
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'code__copy';
      btn.textContent = 'copy';
      btn.setAttribute('aria-label', 'Copy code');
      btn.addEventListener('click', function () {
        copyText(pre.textContent, function (ok) { flash(btn, ok ? 'copied' : 'failed'); });
      });
      bar.appendChild(label);
      bar.appendChild(btn);
      block.classList.add('code');
      block.insertBefore(bar, block.firstChild);
    });
  })();

  /* ---------- TOC scrollspy ---------- */
  (function scrollspy() {
    var toc = $('[data-toc]');
    if (!toc || !('IntersectionObserver' in window)) return;
    var links = $$('a[href^="#"]', toc);
    if (!links.length) return;
    var map = {};
    var headings = [];
    links.forEach(function (a) {
      var id = decodeURIComponent(a.getAttribute('href').slice(1));
      var h = doc.getElementById(id);
      if (h) { map[id] = a; headings.push(h); }
    });
    if (!headings.length) return;

    function activate(id) {
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      if (map[id]) map[id].setAttribute('aria-current', 'true');
    }
    var current = headings[0].id;
    activate(current);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { current = entry.target.id; activate(current); }
      });
    }, { rootMargin: '-10% 0px -75% 0px', threshold: 0 });
    headings.forEach(function (h) { io.observe(h); });
  })();

  /* ---------- Hero gallery ---------- */
  (function gallery() {
    var root = $('[data-gallery]');
    if (!root) return;
    var frames = $$('[data-gallery-frame]', root);
    if (frames.length < 2) return;
    var dots = $$('[data-gallery-dot]', root);
    var metas = $$('[data-gallery-meta]', root);
    var counter = $('[data-gallery-counter]', root);
    var title = $('[data-gallery-title]', root);
    var i = 0;

    var total = frames.length;
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    // Offset of frame n from the current one, wrapped to the shortest direction,
    // so stepping past either end slides the natural way.
    function offset(n) { return ((n - i + total + Math.floor(total / 2)) % total) - Math.floor(total / 2); }
    function show(k) {
      i = ((k % total) + total) % total;
      frames.forEach(function (f, n) {
        f.hidden = false;
        var off = offset(n);
        f.style.transform = 'translateX(' + (off * 100) + '%)';
        f.classList.toggle('is-current', n === i);
        f.setAttribute('aria-hidden', n === i ? 'false' : 'true');
      });
      metas.forEach(function (m, n) { m.hidden = false; m.classList.toggle('is-current', n === i); });
      dots.forEach(function (d, n) {
        if (n === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      if (counter) counter.textContent = pad(i + 1) + ' / ' + pad(frames.length);
      if (title) title.textContent = frames[i].getAttribute('data-gallery-frame');
    }
    $$('[data-gallery-prev]', root).forEach(function (b) { b.addEventListener('click', function () { show(i - 1); }); });
    $$('[data-gallery-next]', root).forEach(function (b) { b.addEventListener('click', function () { show(i + 1); }); });
    dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); }); });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
    });
    root.classList.add('is-enhanced');
    show(0);
    // Enable slide transitions only after the first layout so nothing animates on load.
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { root.classList.add('is-ready'); });
    });
  })();
})();
