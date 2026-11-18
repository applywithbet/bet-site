/* Bet design system: behaviours. A plain script (no modules, no build), safe in a claude.ai artifact, an MV3
   extension page (load it as a file) and inside a shadow root. Load icons.js before it.

   Bet.init(root)  wires everything below inside root (a Document, an Element, or the wrapper element inside a
                   shadow root). Add data-bet-init to the <script> tag to run it on the document by itself.
   Every piece can also be called alone: Bet.theme, Bet.lens, Bet.pixels, Bet.reveal, Bet.appear, Bet.glow,
   Bet.copy, Bet.hearts, Bet.faq, Bet.seg, Bet.colorfield, Bet.offscreen, Bet.swim, Bet.glass, Bet.smooth,
   Bet.icon, Bet.mascot, Bet.friend, Bet.crew.
   Motion respects prefers-reduced-motion everywhere: things are simply there, nothing slides or draws in. */
(function (root) {
  'use strict';
  var doc = root.document;
  var noMQ = { matches: false, addEventListener: function () {} };
  function mq(q) { return root.matchMedia ? root.matchMedia(q) : noMQ; }
  var calm = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover: hover) and (pointer: fine)');
  function all(scope, sel) {
    var out = Array.prototype.slice.call(scope.querySelectorAll(sel));
    if (scope.matches && scope.matches(sel)) out.unshift(scope);
    return out;
  }
  function elOf(scope) {
    if (!scope) return doc.documentElement;
    if (scope.documentElement) return scope.documentElement;
    if (scope.host && scope.firstElementChild) return scope.firstElementChild;   // a shadow root: its wrapper
    return scope;
  }
  function once(el, tag) {   // wire each element once, however often init() runs
    if (el['__bet_' + tag]) return false;
    el['__bet_' + tag] = true;
    return true;
  }
  function icons() { return root.BetIcons || { glyph: {}, tile: {}, mascot: {}, friends: {} }; }

  /* ---------- Icons and the mascot as markup ---------- */
  // Bet.icon('check') -> a glyph; Bet.icon('star', { tile: true }) -> a tile icon. opts.cls adds classes,
  // opts.label makes it an image with that name (otherwise it is hidden from screen readers).
  function icon(name, opts) {
    opts = opts || {};
    var set = icons()[opts.tile ? 'tile' : 'glyph'] || {};
    var svg = set[name];
    if (!svg) return '';
    if (opts.cls) svg = svg.replace(/class="(bet-pxi|bet-pi)"/, 'class="$1 ' + opts.cls + '"');
    if (opts.label) svg = svg.replace('aria-hidden="true"', 'role="img" aria-label="' + String(opts.label).replace(/"/g, '&quot;') + '"');
    if (opts.drawn) svg = svg.replace(/class="(bet-pxi|bet-pi)/, 'class="$1 is-drawn');
    return svg;
  }
  // Bet.mascot({ cls: 'bet-32 is-standing' }) -> the octopus (Bloop)
  function mascot(opts) {
    opts = opts || {};
    var svg = (icons().mascot || {}).bet || '';
    if (opts.cls) svg = svg.replace('class="bet"', 'class="bet ' + opts.cls + '"');
    return svg;
  }
  // Bet.friend('fish') -> one of the sea friends as drawn (fish, crab, bubble, heart)
  function friend(name, opts) {
    opts = opts || {};
    var svg = (icons().friends || {})[name] || '';
    if (svg && opts.cls) svg = svg.replace('class="bet-sprite"', 'class="bet-sprite ' + opts.cls + '"');
    return svg;
  }
  // Bet.crew('eco', { px: 2 }) -> Eco the fish in its sized box; 'tango' -> Tango the crab; 'bloop' -> the octopus.
  // opts.px is the size of a pixel (1 to 4; the box classes .bet-px1 to .bet-px4, or a width for the octopus),
  // opts.cls adds classes to the box ('is-still' stops the idling). The box is hidden from screen readers.
  var CREW = { bloop: 'bet', eco: 'fish', tango: 'crab' };
  function crew(who, opts) {
    opts = opts || {};
    if (who === 'bloop') {
      var svg = mascot({ cls: opts.cls });
      if (opts.px) svg = svg.replace('<svg ', '<svg style="width:' + (16 * opts.px) + 'px;height:' + (14 * opts.px) + 'px" ');
      return svg;
    }
    if (!CREW[who]) return '';
    var cls = 'bet-' + who + (opts.px ? ' bet-px' + opts.px : '') + (opts.cls ? ' ' + opts.cls : '');
    return '<span class="' + cls + '" aria-hidden="true">' + friend(CREW[who]) + '</span>';
  }

  /* ---------- Theme: data-theme="light" | "dark" on <html> (or a shadow host) ----------
     Products that own their theme call Bet.theme.init() as early as possible (before first paint). Pages inside a
     claude.ai artifact leave it alone: the host sets data-theme itself. */
  var theme = {
    key: 'bet-theme',
    saved: function () {
      try { var t = root.localStorage.getItem(theme.key); return t === 'light' || t === 'dark' ? t : null; } catch (e) { return null; }
    },
    system: function () { return mq('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; },
    current: function (el) { return (el || doc.documentElement).getAttribute('data-theme') || theme.system(); },
    apply: function (t, el) {
      el = el || doc.documentElement;
      el.setAttribute('data-theme', t);
      all(el.getRootNode ? el.getRootNode() : doc, '[data-bet-theme-toggle], .bet-theme-toggle').forEach(function (b) {
        b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      });
    },
    init: function (el) {
      el = el || doc.documentElement;
      theme.apply(theme.saved() || theme.system(), el);
      var sys = mq('(prefers-color-scheme: dark)');
      if (sys.addEventListener) sys.addEventListener('change', function (e) { if (!theme.saved()) theme.apply(e.matches ? 'dark' : 'light', el); });
    },
    // The new theme grows as a circle out of the button (650ms), where the browser has view transitions.
    toggle: function (btn, el) {
      el = el || doc.documentElement;
      var next = theme.current(el) === 'dark' ? 'light' : 'dark';
      try { root.localStorage.setItem(theme.key, next); } catch (e) {}
      var page = el === doc.documentElement;
      if (!page || calm.matches || typeof doc.startViewTransition !== 'function' || !btn) { theme.apply(next, el); return; }
      var r = btn.getBoundingClientRect();
      var x = r.left + r.width / 2, y = r.top + r.height / 2;
      var end = Math.hypot(Math.max(x, root.innerWidth - x), Math.max(y, root.innerHeight - y));
      el.classList.add('theme-vt');
      var vt = doc.startViewTransition(function () { theme.apply(next, el); });
      var fin = function () { el.classList.remove('theme-vt'); };
      vt.finished.then(fin, fin);
      vt.ready.then(function () {
        el.animate(
          { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + end + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(function () {});
    },
    wire: function (scope, el) {
      all(scope, '[data-bet-theme-toggle], .bet-theme-toggle').forEach(function (b) {
        if (!once(b, 'theme')) return;
        b.setAttribute('aria-label', theme.current(el) === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        b.addEventListener('click', function () { theme.toggle(b, el); });
      });
    }
  };

  /* ---------- The glass lens: slides to the current tab, stretching like a drop of liquid ----------
     The current tab is the one with aria-current (any value but "false") or aria-selected="true". Change that
     attribute and the lens follows. Where the tabs overflow (phones) they scroll inside the bar, the edges fade
     and the current tab is kept in view. */
  function lens(bar) {
    var row = bar.classList && bar.classList.contains('bet-tabs') ? bar : bar.querySelector('.bet-tabs');
    if (!row || !once(row, 'lens')) return null;
    var lensEl = row.querySelector('.bet-lens');
    if (!lensEl) { lensEl = doc.createElement('span'); lensEl.className = 'bet-lens'; lensEl.setAttribute('aria-hidden', 'true'); row.insertBefore(lensEl, row.firstChild); }
    row.classList.add('is-lensed');
    var at = null;
    function fades() {
      var max = row.scrollWidth - row.clientWidth;
      row.classList.toggle('fade-l', max > 1 && row.scrollLeft > 1);
      row.classList.toggle('fade-r', max > 1 && row.scrollLeft < max - 1);
    }
    function reveal(tab, smooth) {
      var max = row.scrollWidth - row.clientWidth;
      if (max > 1 && tab) {
        var x = Math.max(0, Math.min(max, tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2));
        if (Math.abs(row.scrollLeft - x) > 1) row.scrollTo({ left: x, behavior: smooth && !calm.matches ? 'smooth' : 'auto' });
      }
      fades();
    }
    function place(tab, still) {
      if (!tab) { lensEl.classList.remove('is-on'); at = null; return; }
      if (tab === at && !still && lensEl.classList.contains('is-on')) return;
      var slide = !still && at && at !== tab && lensEl.classList.contains('is-on');
      var dx = slide ? tab.offsetLeft - at.offsetLeft : 0;
      lensEl.classList.toggle('to-right', dx > 0);
      lensEl.classList.toggle('to-left', dx < 0);
      if (!slide) lensEl.style.transition = 'none';
      lensEl.style.left = tab.offsetLeft + 'px';
      lensEl.style.right = (row.clientWidth - tab.offsetLeft - tab.offsetWidth) + 'px';
      if (!slide) { void lensEl.offsetWidth; lensEl.style.transition = ''; }
      lensEl.classList.add('is-on');
      if (slide && !calm.matches && lensEl.animate) {
        lensEl.animate([{ transform: 'none' }, { transform: 'scale(1.05, 0.84)', offset: 0.3 }, { transform: 'scale(0.985, 1.025)', offset: 0.7 }, { transform: 'none' }], { duration: 620, easing: 'ease-out' });
      }
      at = tab;
      reveal(tab, !still);
    }
    function current() {
      return row.querySelector('.bet-tab[aria-current]:not([aria-current="false"]), .bet-tab[aria-selected="true"]');
    }
    function update(still) { place(current(), still); }
    row.addEventListener('scroll', fades, { passive: true });
    // Each tab is watched too: a count filled in after load (or a web font arriving) widens a tab without resizing
    // the row, and the lens would otherwise stay at the old width and stop short of the count.
    if (root.ResizeObserver) {
      var ro = new ResizeObserver(function () { update(true); });
      ro.observe(row);
      Array.prototype.forEach.call(row.querySelectorAll('.bet-tab'), function (t) { ro.observe(t); });
    }
    if (root.MutationObserver) new MutationObserver(function () { update(false); }).observe(row, { subtree: true, attributes: true, attributeFilter: ['aria-current', 'aria-selected'] });
    update(true);
    return { update: update, place: place };
  }

  /* ---------- Liquid glass (Bet.glass) ----------
     bet.css draws the glass; this gives it the three things CSS cannot. Refraction (Chromium on a desktop): an SVG
     filter built to the element's exact size bends what is behind the rim inward, like the curved edge of a lens,
     and splits it a little into colours, while the middle stays frosted. The light stays where bet.css puts it (top
     left); it does not follow the pointer. Watching: glass that appears later (a toast, a menu, a status bar) is
     wired as it is added. Other browsers and touch keep the frost, the light and the spring. data-bet-glass="still" skips the bend, for
     many small pieces that move every frame. */
  var GLASS = '.bet-glass, .bet-btn-ghost, .bet-pill, .bet-menu, .bet-toast, .bet-statusbar, .bet-role-apply, .bet-topbar, .bet-lens, [data-bet-glass]';
  var chromium = !!(root.navigator && navigator.userAgentData && navigator.userAgentData.brands &&
    navigator.userAgentData.brands.some(function (b) { return /Chromium/.test(b.brand); }));
  var lgN = 0;
  function refract(el) {
    if (!chromium || !fine.matches || !mq('(min-width: 768px)').matches) return;
    if (el.getAttribute('data-bet-glass') === 'still' || el.classList.contains('bet-lens')) return;
    var ns = 'http://www.w3.org/2000/svg';
    var defs = doc.createElementNS(ns, 'svg');
    defs.setAttribute('class', 'bet-lg-defs');
    defs.setAttribute('aria-hidden', 'true');
    var tree = el.getRootNode && el.getRootNode();
    ((tree && tree.host) ? tree : doc.body).appendChild(defs);
    el.__bet_defs = defs;
    var canvas = doc.createElement('canvas');
    var w0 = 0, h0 = 0;
    function build() {
      if (!el.isConnected) { defs.remove(); return; }
      var w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
      if (!w || !h || (w === w0 && h === h0)) return;
      w0 = w; h0 = h;
      var r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
      var rim = Math.max(10, Math.min(Math.min(w, h) * 0.42, 30));   // how far in from the edge the glass curves
      var reach = rim * 0.55;                                          // how far (px) the outermost pixel looks inward
      canvas.width = w; canvas.height = h;
      var ctx = canvas.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          var px = x + 0.5 - w / 2, py = y + 0.5 - h / 2;
          var qx = Math.abs(px) - (w / 2 - r), qy = Math.abs(py) - (h / 2 - r);
          var ox = Math.max(qx, 0), oy = Math.max(qy, 0), len = Math.sqrt(ox * ox + oy * oy);
          var depth = r - len - Math.min(Math.max(qx, qy), 0);   // distance in from the edge
          var nx = 0, ny = 0;                                     // outward normal
          if (qx > 0 && qy > 0 && len > 0) { nx = ox / len; ny = oy / len; }
          else if (qx > qy) nx = 1; else ny = 1;
          if (px < 0) nx = -nx;
          if (py < 0) ny = -ny;
          var t = depth < rim ? 1 - Math.max(depth, 0) / rim : 0;                  // 0 where the glass is flat, 1 at the edge
          var m = 0.5 * t * t * (3 - 2 * t) + 0.5 * (1 - Math.sqrt(1 - t * t));   // the curve of the lens: gentle, then steep
          var i = (y * w + x) * 4;
          d[i] = 128 - nx * m * 127;                             // R: x offset (under 128 looks inward)
          d[i + 1] = 128 - ny * m * 127;                         // G: y offset
          d[i + 2] = Math.round(255 * Math.min(1, m * 1.6));     // B: how much of the bent, clearer backdrop shows here
          d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      // A new filter (and id) each time: Chrome keeps a backdrop filter it has resolved even after its attributes
      // change. The blur lives inside the filter: a frosted copy for the middle, a clearer one for the bend. Red,
      // green and blue are bent by slightly different amounts (the colour split at the edge of real glass), then
      // added back together, and the map's blue channel says where the bend shows over the frost.
      var id = 'bet-lg-' + (++lgN), S = reach * 2, keep = '  0 0 0 1 0';
      defs.innerHTML =
        '<filter id="' + id + '" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">' +
          '<feImage href="' + canvas.toDataURL() + '" x="0" y="0" width="' + w + '" height="' + h + '" preserveAspectRatio="none" result="map"/>' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="frost"/>' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="clear"/>' +
          '<feDisplacementMap in="clear" in2="map" scale="' + (S * 0.95).toFixed(1) + '" xChannelSelector="R" yChannelSelector="G" result="dr"/>' +
          '<feDisplacementMap in="clear" in2="map" scale="' + S.toFixed(1) + '" xChannelSelector="R" yChannelSelector="G" result="dg"/>' +
          '<feDisplacementMap in="clear" in2="map" scale="' + (S * 1.05).toFixed(1) + '" xChannelSelector="R" yChannelSelector="G" result="db"/>' +
          '<feColorMatrix in="dr" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0' + keep + '" result="r"/>' +
          '<feColorMatrix in="dg" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0' + keep + '" result="g"/>' +
          '<feColorMatrix in="db" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0' + keep + '" result="b"/>' +
          '<feComposite in="r" in2="g" operator="arithmetic" k2="1" k3="1" result="rg"/>' +
          '<feComposite in="rg" in2="b" operator="arithmetic" k2="1" k3="1" result="bent"/>' +
          '<feColorMatrix in="map" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 1 0 0" result="where"/>' +
          '<feComposite in="bent" in2="where" operator="in" result="edge"/>' +
          '<feComposite in="edge" in2="frost" operator="over"/>' +
        '</filter>';
      el.style.backdropFilter = 'url(#' + id + ') saturate(1.7)';
      el.setAttribute('data-bet-bent', '');
    }
    var queued = false;
    function rebuild() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; build(); }); }
    build();
    if (root.ResizeObserver) new ResizeObserver(rebuild).observe(el); else root.addEventListener('resize', rebuild);
  }
  function flex(el) {   // the bar flexes with the speed of the scroll under it and settles with a spring (bet.css)
    if (calm.matches || el.getAttribute('data-bet-glass') === 'still') return;
    var timer = 0, lastY = root.scrollY, lastT = 0;
    root.addEventListener('scroll', function () {
      var now = root.performance ? performance.now() : Date.now(), y = root.scrollY;
      var k = Math.min(1, Math.abs(y - lastY) / Math.max(1, now - lastT) / 3);   // 3px per ms is a flick
      lastY = y; lastT = now;
      el.style.scale = (1 + 0.012 * k).toFixed(4) + ' ' + (1 - 0.035 * k).toFixed(4);
      clearTimeout(timer);
      timer = setTimeout(function () { el.style.scale = ''; }, 90);
    }, { passive: true });
  }
  function glass(el) {
    if (!once(el, 'glass')) return;
    refract(el);
    if (el.classList.contains('bet-topbar')) flex(el);
  }
  function glassWatch(scope) {
    var el = elOf(scope);
    if (!root.MutationObserver || !once(el, 'glasswatch')) return;
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        m.addedNodes.forEach(function (n) { if (n.nodeType === 1) all(n, GLASS).forEach(glass); });
        m.removedNodes.forEach(function (n) {   // glass that was re-rendered leaves its filter behind: drop it
          if (n.nodeType === 1) all(n, GLASS).forEach(function (g) { if (g.__bet_defs && !g.isConnected) { g.__bet_defs.remove(); g.__bet_defs = null; } });
        });
      });
    }).observe(el, { childList: true, subtree: true });
  }

  /* ---------- Pixel icons draw themselves in, pixel by pixel, the first time most of one is on screen ---------- */
  function pixels(scope) {
    var el = elOf(scope);
    if (!root.IntersectionObserver || calm.matches) return;
    el.classList.add('bet-px-draw');
    if (!once(el, 'pixels')) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio >= 0.6) { e.target.classList.add('is-drawn'); io.unobserve(e.target); }
      });
    }, { threshold: [0.6] });
    var SEL = 'svg.bet-pi:not(.is-drawn), svg.bet-pxi:not(.is-drawn)';
    function watch(n) { all(n, SEL).forEach(function (s) { io.observe(s); }); }
    watch(el);
    if (root.MutationObserver) new MutationObserver(function (ms) {
      ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) watch(n); }); });
    }).observe(el, { childList: true, subtree: true });
  }

  /* ---------- Scroll reveal: only what starts below the first screen waits, then rises 32px into place ---------- */
  function reveal(scope) {
    if (!root.IntersectionObserver || calm.matches) return;
    var fold = root.innerHeight * 0.95;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove('is-pending'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    all(scope, '[data-bet-reveal]').forEach(function (el) {
      if (!once(el, 'reveal')) return;
      if (el.getBoundingClientRect().top > fold) { el.classList.add('is-pending'); io.observe(el); }
    });
  }
  /* Cards in a list rise in once (Salix timing: 60px, 0.6s, 0.1s late) */
  function appear(scope) {
    var items = all(scope, '.bet-appear:not(.is-in)');
    if (!root.IntersectionObserver || calm.matches) { items.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    items.forEach(function (el) { if (once(el, 'appear')) io.observe(el); });
  }

  /* ---------- Tile edges light up blue around the pointer (mouse and trackpad only) ---------- */
  function glow(container) {
    if (!fine.matches || !once(container, 'glow')) return;
    container.classList.add('bet-glow');
    var mx = 0, my = 0, queued = false;
    function paint() {   // every box read first, then every write (one style pass a frame, as in relight)
      queued = false;
      var tiles = all(container, '.bet-tile'), rects = tiles.map(function (t) { return t.getBoundingClientRect(); });
      tiles.forEach(function (t, i) {
        t.style.setProperty('--mx', (mx - rects[i].left).toFixed(1) + 'px');
        t.style.setProperty('--my', (my - rects[i].top).toFixed(1) + 'px');
      });
    }
    container.addEventListener('pointermove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!queued) { queued = true; requestAnimationFrame(paint); }
    });
  }

  /* ---------- Hearts: four pixel hearts float up from an element ---------- */
  function hearts(target) {
    if (calm.matches || !target) return;
    var svg = (icons().friends || {}).heart;
    if (!svg) return;
    var r = target.getBoundingClientRect();
    var rn = target.getRootNode ? target.getRootNode() : doc;
    var parent = rn.host ? rn : (rn.body || doc.body);
    [-20, -6, 8, 22].forEach(function (dx, i) {
      var h = doc.createElement('span');
      h.className = 'bet-heart';
      h.setAttribute('aria-hidden', 'true');
      h.innerHTML = svg;
      h.style.left = (r.left + r.width / 2 - 7 + dx * 0.3) + 'px';
      h.style.top = (r.top - 6) + 'px';
      h.style.setProperty('--hx', dx + 'px');
      h.style.animationDelay = (i * 80) + 'ms';
      parent.appendChild(h);
      setTimeout(function () { h.remove(); }, 1300 + i * 80);
    });
  }

  /* ---------- Copy capsule: [data-bet-copy="text"] copies on click ---------- */
  function oldCopy(text, back) {
    var ta = doc.createElement('textarea'), ok = false;
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
    (back.getRootNode().host ? back.getRootNode() : doc.body).appendChild(ta);
    try { ta.focus({ preventScroll: true }); ta.select(); ok = doc.execCommand('copy'); } catch (e) {}
    ta.remove();
    back.focus({ preventScroll: true });
    return ok;
  }
  function copy(btn) {
    if (!once(btn, 'copy')) return;
    var timer = null;
    var live = btn.parentNode.querySelector('.bet-copy-live');
    var value = btn.querySelector('.bet-copy-value');
    function result(ok) {
      clearTimeout(timer);
      if (!ok) {
        btn.classList.remove('is-copied');
        if (value) { try { var rg = doc.createRange(); rg.selectNodeContents(value); var s = root.getSelection(); s.removeAllRanges(); s.addRange(rg); } catch (e) {} }
        if (live) live.textContent = 'Couldn’t copy. It’s selected, so press ⌘C or Ctrl+C.';
        return;
      }
      if (!btn.classList.contains('is-copied')) hearts(btn.querySelector('.bet-copy-icon') || btn);
      btn.classList.add('is-copied');
      if (live) live.textContent = 'Copied.';
      timer = setTimeout(function () { btn.classList.remove('is-copied'); if (live) live.textContent = ''; }, 2200);
    }
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-bet-copy'), p = null;
      try { if (root.navigator.clipboard && root.isSecureContext) p = navigator.clipboard.writeText(text); } catch (e) {}
      if (p) p.then(function () { result(true); }, function () { result(oldCopy(text, btn)); });
      else result(oldCopy(text, btn));
    });
  }

  /* ---------- Accordion: one answer open at a time ---------- */
  function faq(list) {
    if (!once(list, 'faq')) return;
    list.classList.add('is-ready');
    var items = all(list, '.bet-faq-item');
    function set(item, open) {
      item.classList.toggle('is-open', open);
      var b = item.querySelector('.bet-faq-q button');
      if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    items.forEach(function (item) {
      set(item, item.classList.contains('is-open'));
      var b = item.querySelector('.bet-faq-q button');
      if (b) b.addEventListener('click', function () {
        var open = !item.classList.contains('is-open');
        items.forEach(function (o) { set(o, o === item && open); });
      });
    });
  }

  /* ---------- Segmented control: the thumb slides to the chosen button ---------- */
  function seg(el) {
    if (!once(el, 'seg')) return;
    var btns = Array.prototype.slice.call(el.querySelectorAll(':scope > button'));
    el.style.setProperty('--n', btns.length);
    function update() {
      var i = btns.findIndex(function (b) { return b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-selected') === 'true'; });
      el.style.setProperty('--at', Math.max(0, i));
    }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (o) { o.setAttribute(o.hasAttribute('aria-selected') ? 'aria-selected' : 'aria-pressed', o === b ? 'true' : 'false'); });
        update();
        el.dispatchEvent(new CustomEvent('bet-change', { detail: { index: i }, bubbles: true }));
      });
    });
    update();
  }

  /* ---------- The colour field keeps --m (its long side) so the blobs scale with the box ---------- */
  function colorfield(el) {
    if (!once(el, 'field')) return;
    function size() { el.style.setProperty('--m', Math.max(el.offsetWidth, el.offsetHeight) + 'px'); }
    size();
    if (root.ResizeObserver) new ResizeObserver(size).observe(el);
  }

  /* ---------- Loops pause while their section is off screen ---------- */
  function offscreen(el) {
    if (!root.IntersectionObserver || !once(el, 'off')) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('bet-anim-off', !e.isIntersecting); });
    }, { rootMargin: '15% 0px' }).observe(el);
  }

  /* ---------- The fish swims through its band once when the band comes into view (at most every 20s) ---------- */
  function swim(fish) {
    if (calm.matches || !root.IntersectionObserver || !once(fish, 'swim')) return;
    var band = fish.parentNode, last = -1e9, timer = null;
    var bubble = (icons().friends || {}).bubble || '';
    function go() {
      var now = Date.now();
      if (now - last < 20000) return;
      last = now;
      band.style.setProperty('--bw', band.offsetWidth + 'px');
      fish.style.setProperty('--swim', Math.max(6, band.offsetWidth / 150).toFixed(2) + 's');   // about 150px a second
      fish.classList.remove('is-on');
      void fish.offsetWidth;
      fish.classList.add('is-on');
      clearInterval(timer);
      var n = 0;
      timer = setInterval(function () {
        if (++n > 6 || !fish.classList.contains('is-on')) { clearInterval(timer); return; }
        var b = band.getBoundingClientRect(), f = fish.getBoundingClientRect();
        if (f.right < b.left + b.width * 0.14 || f.right > b.right - b.width * 0.14) return;
        var el = doc.createElement('span');
        el.className = 'bet-swim-bubble';
        el.innerHTML = bubble;
        el.style.left = (f.right - b.left - 6) + 'px';
        el.style.top = (f.top - b.top - 10) + 'px';
        band.appendChild(el);
        setTimeout(function () { el.remove(); }, 1900);
      }, 1300);
    }
    new IntersectionObserver(function (es) { if (es[es.length - 1].isIntersecting) go(); }, { threshold: 0.9 }).observe(band);
    fish.addEventListener('animationend', function (e) { if (e.animationName === 'bet-swim') fish.classList.remove('is-on'); });
  }

  /* ---------- Smooth scrolling (Lenis 1.1.18, loaded by the page; desktop pointers only) ---------- */
  function smooth() {
    if (calm.matches || !fine.matches || typeof root.Lenis !== 'function') return null;
    try {
      return new root.Lenis({ duration: 1.2, lerp: 0, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, autoRaf: true });
    } catch (e) { return null; }
  }

  /* ---------- Everything at once ---------- */
  function init(scope) {
    scope = scope || doc;
    var el = elOf(scope);
    el.classList.add('bet-js');
    var themeEl = scope.documentElement ? scope.documentElement : (el.getRootNode && el.getRootNode().host) || el;
    theme.wire(scope, themeEl);
    all(scope, '.bet-tabs').forEach(lens);
    all(scope, GLASS).forEach(glass);
    glassWatch(scope);
    pixels(scope);
    reveal(scope);
    appear(scope);
    all(scope, '[data-bet-glow], .bet-tiles').forEach(glow);
    all(scope, '[data-bet-copy]').forEach(copy);
    all(scope, '.bet-faq').forEach(faq);
    all(scope, '.bet-seg').forEach(seg);
    all(scope, '.bet-colorfield').forEach(colorfield);
    all(scope, '[data-bet-offscreen], .bet-band').forEach(offscreen);
    all(scope, '.bet-swim').forEach(swim);
  }

  root.Bet = {
    init: init, theme: theme, lens: lens, glass: glass, refraction: glass, pixels: pixels, reveal: reveal, appear: appear,
    glow: glow, hearts: hearts, copy: copy, faq: faq, seg: seg, colorfield: colorfield, offscreen: offscreen,
    swim: swim, smooth: smooth, icon: icon, mascot: mascot, friend: friend, crew: crew
  };

  var me = doc && doc.currentScript;
  if (me && me.hasAttribute('data-bet-init')) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { init(doc); smooth(); });
    else { init(doc); smooth(); }
  }
})(typeof window !== 'undefined' ? window : this);
