/* Client-side search over /assets/js/search-data.json using lunr. */
(function () {
  'use strict';
  if (typeof lunr === 'undefined') return;

  var doc = document;
  var input = doc.getElementById('q');
  var form = doc.querySelector('[data-search-form]');
  var results = doc.querySelector('[data-search-results]');
  var empty = doc.querySelector('[data-search-empty]');
  var idle = doc.querySelector('[data-search-idle]');
  var end = doc.querySelector('[data-search-end]');
  var stats = doc.querySelector('[data-search-stats]');
  var echo = doc.querySelector('[data-search-echo]');
  var echoEmpty = doc.querySelector('[data-search-echo-empty]');
  var scopeButtons = Array.prototype.slice.call(doc.querySelectorAll('[data-scope]'));
  if (!input || !results) return;

  var DATA_URL = '/assets/js/search-data.json';
  var docs = [];
  var byUrl = {};
  var index = null;
  var scope = '';
  var current = [];
  var selected = -1;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function terms(q) {
    return q.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
  }

  function highlight(text, ts) {
    var out = esc(text);
    if (!ts.length) return out;
    var re = new RegExp('(' + ts.map(escRe).join('|') + ')', 'gi');
    return out.replace(re, '<mark>$1</mark>');
  }

  function snippet(content, ts) {
    if (!content) return '';
    var lower = content.toLowerCase();
    var pos = -1;
    for (var i = 0; i < ts.length; i++) {
      var p = lower.indexOf(ts[i]);
      if (p !== -1 && (pos === -1 || p < pos)) pos = p;
    }
    if (pos === -1) return content.slice(0, 160) + (content.length > 160 ? '…' : '');
    var start = Math.max(0, pos - 70);
    var slice = content.slice(start, start + 180);
    return (start > 0 ? '…' : '') + slice + (start + 180 < content.length ? '…' : '');
  }

  function hits(d, ts) {
    if (!ts.length) return 0;
    var hay = (d.title + ' ' + d.excerpt + ' ' + d.content).toLowerCase();
    var n = 0;
    ts.forEach(function (t) {
      var re = new RegExp(escRe(t), 'g');
      var m = hay.match(re);
      if (m) n += m.length;
    });
    return n;
  }

  function typeLabel(t) { return t === 'post' ? 'POST' : t === 'work' ? 'WORK' : 'PAGE'; }

  function render(list, q, ts, ms) {
    results.innerHTML = '';
    selected = -1;
    current = list;
    var total = list.length;

    if (!q) {
      idle.hidden = false; empty.hidden = true; end.hidden = true;
      stats.textContent = docs.length + ' documents indexed';
      return;
    }
    idle.hidden = true;
    if (!total) {
      empty.hidden = false; end.hidden = true;
      if (echoEmpty) echoEmpty.textContent = '"' + q + '"';
      stats.textContent = '0 matches in ' + ms + ' ms';
      return;
    }
    empty.hidden = true;
    stats.textContent = total + (total === 1 ? ' match' : ' matches') + ' in ' + ms + ' ms';

    list.forEach(function (d, i) {
      var a = doc.createElement('a');
      a.className = 'result';
      a.href = d.url;
      a.setAttribute('role', 'option');
      a.setAttribute('aria-selected', 'false');
      a.setAttribute('data-index', String(i));
      var body = d.excerpt && ts.some(function (t) { return d.excerpt.toLowerCase().indexOf(t) !== -1; }) ? d.excerpt : snippet(d.content, ts);
      var n = hits(d, ts);
      a.innerHTML =
        '<span class="result__side">' +
          '<span class="result__type result__type--' + esc(d.type) + '">' + typeLabel(d.type) + '</span>' +
          '<span class="result__meta">' + esc(d.meta || '') + '</span>' +
        '</span>' +
        '<span class="result__main">' +
          '<span class="result__title">' + highlight(d.title, ts) + '</span>' +
          '<span class="result__excerpt">' + highlight(body, ts) + '</span>' +
          '<span class="result__url">' + esc(d.url) + '</span>' +
        '</span>' +
        '<span class="result__hits">' + n + (n === 1 ? ' hit' : ' hits') + '</span>';
      results.appendChild(a);
    });
    end.hidden = false;
    end.textContent = 'end of results — ' + total + ' of ' + total;
  }

  function search(q) {
    var ts = terms(q);
    var t0 = performance.now();
    var matched = [];
    if (index && ts.length) {
      var query = ts.map(function (t) { return t + '^1 ' + t + '*'; }).join(' ');
      try {
        matched = index.search(query).map(function (r) { return byUrl[r.ref]; });
      } catch (err) {
        matched = index.search(ts.join(' ')).map(function (r) { return byUrl[r.ref]; });
      }
    }
    var counts = { '': matched.length, post: 0, work: 0, page: 0 };
    matched.forEach(function (d) { counts[d.type] = (counts[d.type] || 0) + 1; });
    scopeButtons.forEach(function (b) {
      var c = b.querySelector('[data-scope-count]');
      if (c) c.textContent = counts[b.getAttribute('data-scope')] || 0;
    });
    var list = scope ? matched.filter(function (d) { return d.type === scope; }) : matched;
    if (echo) echo.textContent = q || '…';
    render(list, q.trim(), ts, Math.max(1, Math.round(performance.now() - t0)));
  }

  function setUrl(q) {
    var url = window.location.pathname + (q ? '?q=' + encodeURIComponent(q) : '');
    window.history.replaceState(null, '', url);
  }

  function select(i) {
    var items = results.querySelectorAll('.result');
    if (!items.length) return;
    selected = ((i % items.length) + items.length) % items.length;
    Array.prototype.forEach.call(items, function (el, n) {
      el.setAttribute('aria-selected', n === selected ? 'true' : 'false');
    });
    items[selected].scrollIntoView({ block: 'nearest' });
  }

  var timer = null;
  input.addEventListener('input', function () {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () { setUrl(input.value.trim()); search(input.value); }, 80);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); search(input.value); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (input.value) { input.value = ''; setUrl(''); search(''); }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') { e.preventDefault(); select(selected + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); select(selected - 1); }
    else if (e.key === 'Enter' && selected >= 0) {
      var items = results.querySelectorAll('.result');
      if (items[selected]) { e.preventDefault(); window.location.href = items[selected].href; }
    }
  });
  scopeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      scope = b.getAttribute('data-scope') || '';
      scopeButtons.forEach(function (x) { x.removeAttribute('aria-current'); });
      b.setAttribute('aria-current', 'true');
      search(input.value);
    });
  });
  Array.prototype.forEach.call(doc.querySelectorAll('[data-search-tag]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      input.value = a.getAttribute('data-search-tag');
      setUrl(input.value);
      search(input.value);
      input.focus();
    });
  });

  fetch(DATA_URL).then(function (r) { return r.json(); }).then(function (data) {
    docs = data;
    docs.forEach(function (d) { byUrl[d.url] = d; });
    index = lunr(function () {
      this.ref('url');
      this.field('title', { boost: 10 });
      this.field('tags', { boost: 5 });
      this.field('excerpt', { boost: 2 });
      this.field('content');
      this.metadataWhitelist = [];
      var self = this;
      docs.forEach(function (d) {
        self.add({ url: d.url, title: d.title, tags: (d.tags || []).join(' '), excerpt: d.excerpt, content: d.content });
      });
    });
    var m = /[?&]q=([^&#]*)/.exec(window.location.search);
    var q = m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
    if (q) input.value = q;
    search(input.value);
  }).catch(function () {
    stats.textContent = 'search index unavailable';
  });
})();
