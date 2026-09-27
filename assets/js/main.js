/* 柯永庆简历站 V2 · 交互逻辑 */
(function () {
  "use strict";

  var I18N = window.I18N || {};
  var LANGS = ["zh", "en", "vi"];
  var currentLang = "zh";

  /* ================= 主题（深浅） ================= */
  var root = document.documentElement;
  function applyTheme(theme) {
    if (theme !== "dark" && theme !== "light") theme = "light";
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("kyq-theme", theme); } catch (e) {}
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("kyq-theme"); } catch (e) {}
    if (saved === "dark" || saved === "light") { applyTheme(saved); return; }
    var prefersDark = false;
    try { prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) {}
    applyTheme(prefersDark ? "dark" : "light");
  }
  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ================= 语言 ================= */
  function detectLang() {
    var m = (location.search || "").match(/[?&]lang=(zh|en|vi)/i);
    if (m) return m[1].toLowerCase();
    try {
      var s = localStorage.getItem("kyq-lang");
      if (LANGS.indexOf(s) > -1) return s;
    } catch (e) {}
    return "zh";
  }
  function applyLang(lang) {
    currentLang = lang;
    var dict = I18N[lang] || I18N.zh || {};
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;

    var i, els, k;
    els = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < els.length; i++) {
      k = els[i].getAttribute("data-i18n");
      if (dict[k] != null) els[i].textContent = dict[k];
    }
    els = document.querySelectorAll("[data-i18n-html]");
    for (i = 0; i < els.length; i++) {
      k = els[i].getAttribute("data-i18n-html");
      if (dict[k] != null) els[i].innerHTML = dict[k];
    }
    els = document.querySelectorAll("[data-i18n-alt]");
    for (i = 0; i < els.length; i++) {
      k = els[i].getAttribute("data-i18n-alt");
      if (dict[k] != null) els[i].setAttribute("alt", dict[k]);
    }
    els = document.querySelectorAll("[data-i18n-aria]");
    for (i = 0; i < els.length; i++) {
      k = els[i].getAttribute("data-i18n-aria");
      if (dict[k] != null) els[i].setAttribute("aria-label", dict[k]);
    }

    if (dict["_title"]) document.title = dict["_title"];
    var desc = document.querySelector("meta[name='description']");
    if (desc && dict["_desc"]) desc.setAttribute("content", dict["_desc"]);
    var ogt = document.querySelector("meta[property='og:title']");
    if (ogt && dict["_og_title"]) ogt.setAttribute("content", dict["_og_title"]);
    var ogd = document.querySelector("meta[property='og:description']");
    if (ogd && dict["_og_desc"]) ogd.setAttribute("content", dict["_og_desc"]);
    var ogl = document.querySelector("meta[property='og:locale']");
    if (ogl) ogl.setAttribute("content", lang === "zh" ? "zh_CN" : lang === "en" ? "en_US" : "vi_VN");

    var opts = document.querySelectorAll(".lang-opt");
    for (i = 0; i < opts.length; i++) {
      opts[i].classList.toggle("active", opts[i].getAttribute("data-lang") === lang);
    }
    var lb = document.getElementById("langBtnText");
    if (lb) lb.textContent = dict["_lang_name"] || lang.toUpperCase();
    /* 下载简历随界面语言联动 */
    var pdfs = {
      zh: { file: "./assets/柯永庆_简历.pdf", name: "柯永庆_简历.pdf" },
      en: { file: "./assets/Ke_Yongqing_Resume_EN.pdf", name: "Ke_Yongqing_Resume_EN.pdf" },
      vi: { file: "./assets/Ke_Yongqing_Resume_VI.pdf", name: "Ke_Yongqing_Resume_VI.pdf" }
    };
    var pdf = pdfs[lang] || pdfs.zh;
    var dl = document.querySelectorAll("a[download]");
    for (i = 0; i < dl.length; i++) {
      dl[i].setAttribute("href", pdf.file);
      dl[i].setAttribute("download", pdf.name);
    }
    var pn = document.getElementById("pdfNote");
    if (pn) pn.textContent = pdf.name;
    try { localStorage.setItem("kyq-lang", lang); } catch (e) {}
    /* 语言切换时终端按新语言重播 */
    if (document.getElementById("termBody")) {
      runTerminal();
      var t = document.querySelector(".terminal");
      if (t) t.title = dict["terminal.restart"] || "click to replay";
    }
  }

  var langBtns = document.querySelectorAll(".lang-opt[data-lang]");
  for (var li = 0; li < langBtns.length; li++) {
    langBtns[li].addEventListener("click", function () {
      applyLang(this.getAttribute("data-lang"));
    });
  }

  /* 语言下拉框展开/收起 */
  var langBtn = document.getElementById("langBtn");
  var langMenu = document.getElementById("langMenu");
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = langMenu.classList.toggle("open");
      langBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    langMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      langMenu.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("click", function () {
      langMenu.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
    });
  }

  /* ================= 数据条 count-up ================= */
  function animateNumbers() {
    var nums = document.querySelectorAll("[data-num]");
    if (!nums.length) return;
    var reduce = false;
    try { reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    for (var i = 0; i < nums.length; i++) {
      (function (el) {
        var target = parseInt(el.getAttribute("data-num"), 10) || 0;
        if (reduce) { el.textContent = target; return; }
        var dur = 1100, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      })(nums[i]);
    }
  }
  var statsObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { animateNumbers(); statsObs.disconnect(); }
    });
  }, { threshold: 0.3 });
  var statsEl = document.querySelector(".stats");
  if (statsEl && "IntersectionObserver" in window) statsObs.observe(statsEl);
  else if (statsEl) animateNumbers();

  /* ================= 终端打字动画 ================= */
  function getCmd(i18n, lang) {
    var d = i18n[lang] || i18n.zh || {};
    return [
      { type: "cmd", text: "whoami" },
      { type: "out", text: d["terminal.out1"] || "" },
      { type: "cmd", text: "cat skills.md" },
      { type: "out", text: d["terminal.out2"] || "" },
      { type: "cmd", text: "uptime" },
      { type: "out", text: d["terminal.out3"] || "" }
    ];
  }
  function runTerminal() {
    var body = document.getElementById("termBody");
    if (!body) return;
    var reduce = false;
    try { reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    var cmds = getCmd(I18N, currentLang);
    var lineIndex = 0, charIndex = 0, currentLine = null;
    var interval = reduce ? 1 : 28;

    function buildLine(cmd, lang) {
      var ln = document.createElement("div");
      var no = document.createElement("span");
      no.className = "ln";
      no.textContent = String(lineIndex + 1);
      if (cmd.type === "cmd") {
        var ps1 = document.createElement("span");
        ps1.className = "ps1";
        ps1.textContent = "$";
        var c = document.createElement("span");
        c.className = "cmd";
        c.textContent = "";
        ln.appendChild(no); ln.appendChild(ps1); ln.appendChild(c);
        currentLine = { el: ln, charEl: c, type: "cmd", text: cmd.text, full: cmd.text };
        if (!reduce) {
          var caret = document.createElement("span");
          caret.className = "caret";
          caret.setAttribute("aria-hidden", "true");
          ln.appendChild(caret);
        }
      } else {
        var o = document.createElement("span");
        o.className = "out";
        o.textContent = "";
        ln.appendChild(no); ln.appendChild(o);
        currentLine = { el: ln, charEl: o, type: "out", text: cmd.text, full: cmd.text };
      }
      return ln;
    }

    function nextChar() {
      if (!currentLine) return;
      var full = currentLine.full || "";
      if (charIndex < full.length) {
        currentLine.charEl.textContent = full.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(nextChar, interval);
      } else {
        currentLine = null;
        if (lineIndex < cmds.length) {
          setTimeout(addLine, 260);
        }
      }
    }
    function addLine() {
      if (lineIndex >= cmds.length) return;
      var cmd = cmds[lineIndex];
      lineIndex++;
      charIndex = 0;
      var ln = buildLine(cmd);
      body.appendChild(ln);
      setTimeout(nextChar, reduce ? 10 : 300);
    }
    body.innerHTML = "";
    addLine();
    if (!reduce) {
      setInterval(function () {
        if (lineIndex >= cmds.length && !currentLine) clearInterval(this);
      }, 500);
    }
    /* 终端结束后自动滚动到可视区 */
    setTimeout(function () {
      try {
        var r = body.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.85) body.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } catch (e) {}
    }, 300);
  }

  /* ================= 项目筛选 ================= */
  var grid = document.getElementById("projGrid");
  var empty = document.getElementById("projEmpty");
  var filterBtns = document.querySelectorAll(".filter-btn");
  function applyFilter(f) {
    if (!grid) return;
    var cards = grid.querySelectorAll(".proj-card");
    var shown = 0;
    for (var i = 0; i < cards.length; i++) {
      var cats = (cards[i].getAttribute("data-cat") || "").split(/\s+/);
      var hit = f === "all" || cats.indexOf(f) > -1;
      cards[i].style.display = hit ? "" : "none";
      if (hit) shown++;
    }
    if (empty) empty.style.display = shown === 0 ? "" : "none";
    for (var j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.toggle("active", filterBtns[j].getAttribute("data-filter") === f);
    }
  }
  for (var fi = 0; fi < filterBtns.length; fi++) {
    filterBtns[fi].addEventListener("click", function () {
      applyFilter(this.getAttribute("data-filter"));
    });
  }

  /* ================= 滚动渐显 ================= */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ================= 移动端菜单 ================= */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("siteNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ================= 初始化 ================= */
  initTheme();
  applyLang(detectLang());
  var termEl = document.querySelector(".terminal");
  if (termEl) {
    termEl.addEventListener("click", runTerminal);
    termEl.title = (I18N[currentLang] || I18N.zh || {})["terminal.restart"] || "click to replay";
  }
})();
