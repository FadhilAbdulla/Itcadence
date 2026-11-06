/* ITCadence — interactions & animations */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Nav: scroll state, mobile menu, progress, back-to-top ---------- */
  const nav = $(".nav");
  const progress = $(".scroll-progress");
  const backTop = $(".back-top");
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle("is-scrolled", y > 30);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (backTop) backTop.classList.toggle("is-visible", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".nav__links a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }
  if (backTop) backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

  /* ---------- Split headings into words ---------- */
  $$("[data-split]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(" ");
    el.classList.add("split-words");
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal, .split-words, .process, .flow, [data-count]").forEach((el) => io.observe(el));

  /* ---------- Stagger children ---------- */
  $$("[data-stagger]").forEach((wrap) => {
    $$(":scope > *", wrap).forEach((child, i) => {
      child.classList.add("reveal");
      child.style.setProperty("--d", `${i * 0.1}s`);
      io.observe(child);
    });
  });

  /* ---------- Counters ---------- */
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        countIO.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const dec = (el.dataset.count.split(".")[1] || "").length;
        if (reduce) { el.textContent = target.toFixed(dec); return; }
        const dur = 1800;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- Rotating words ---------- */
  const rot = $("[data-rotate]");
  if (rot) {
    const words = rot.dataset.rotate.split("|");
    let idx = 0;
    const make = (word) => {
      const span = document.createElement("span");
      span.className = "rotator__word";
      span.innerHTML = [...word].map((c, i) => `<span class="ch" style="transition-delay:${i * 0.03}s">${c === " " ? "&nbsp;" : c}</span>`).join("");
      return span;
    };
    let current = make(words[0]);
    rot.appendChild(current);
    requestAnimationFrame(() => requestAnimationFrame(() => current.classList.add("is-in")));
    if (!reduce) {
      setInterval(() => {
        const old = current;
        old.classList.remove("is-in");
        old.classList.add("is-out");
        setTimeout(() => {
          old.remove();
          idx = (idx + 1) % words.length;
          current = make(words[idx]);
          rot.appendChild(current);
          requestAnimationFrame(() => requestAnimationFrame(() => current.classList.add("is-in")));
        }, 550);
      }, 2800);
    }
  }

  /* ---------- Hero network canvas ---------- */
  const canvas = $(".hero__canvas");
  if (canvas && !reduce) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, pts = [];
    const mouse = { x: -9999, y: -9999 };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
    let running = true;
    new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); }).observe(canvas);
    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 140) { p.x += (p.x - mouse.x) / dm; p.y += (p.y - mouse.y) / dm; }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(46,230,197,${(1 - d / 130) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = dm < 160 ? "rgba(255,181,71,0.95)" : "rgba(180,240,230,0.75)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- 3D tilt (cards + dashboard) ---------- */
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (fine && !reduce) {
    $$("[data-tilt]").forEach((el) => {
      const max = parseFloat(el.dataset.tilt) || 6;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-6px)`;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });

    /* Magnetic buttons */
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });

    /* Cursor glow */
    const glow = $(".cursor-glow");
    if (glow) {
      let gx = 0, gy = 0, tx = 0, ty = 0;
      window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; document.body.classList.add("has-cursor"); });
      const follow = () => { gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12; glow.style.left = gx + "px"; glow.style.top = gy + "px"; requestAnimationFrame(follow); };
      follow();
    }
  }

  /* ---------- Parallax ---------- */
  const para = $$("[data-parallax]");
  if (para.length && !reduce) {
    const run = () => {
      para.forEach((el) => {
        const r = el.getBoundingClientRect();
        const off = (r.top + r.height / 2 - window.innerHeight / 2) * parseFloat(el.dataset.parallax);
        el.style.translate = `0 ${off}px`;
      });
    };
    window.addEventListener("scroll", () => requestAnimationFrame(run), { passive: true });
    run();
  }

  /* ---------- Module tabs (auto-advance) ---------- */
  const modules = $(".modules");
  if (modules) {
    const tabs = $$(".tab", modules), panels = $$(".panel", modules);
    let i = 0, timer;
    const show = (n) => {
      i = n;
      tabs.forEach((t, k) => { t.classList.toggle("is-active", k === n); t.setAttribute("aria-selected", k === n); });
      panels.forEach((p, k) => p.classList.toggle("is-active", k === n));
      tabs[n].querySelector(".tab__timer")?.replaceWith(Object.assign(document.createElement("i"), { className: "tab__timer" }));
    };
    const start = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show((i + 1) % tabs.length), 7000); };
    tabs.forEach((t, k) => t.addEventListener("click", () => { show(k); start(); }));
    modules.addEventListener("mouseenter", () => { clearInterval(timer); modules.classList.add("is-paused"); });
    modules.addEventListener("mouseleave", () => { modules.classList.remove("is-paused"); start(); });
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : clearInterval(timer))).observe(modules);
  }

  /* ---------- FAQ ---------- */
  $$(".faq__q").forEach((q) =>
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item");
      const open = item.classList.contains("is-open");
      $$(".faq__item.is-open").forEach((x) => { x.classList.remove("is-open"); x.querySelector(".faq__q").setAttribute("aria-expanded", "false"); });
      if (!open) { item.classList.add("is-open"); q.setAttribute("aria-expanded", "true"); }
    })
  );

  /* ---------- Blog filters ---------- */
  const filters = $$(".filter");
  if (filters.length) {
    filters.forEach((f) =>
      f.addEventListener("click", () => {
        filters.forEach((x) => x.classList.toggle("is-active", x === f));
        const cat = f.dataset.filter;
        let n = 0;
        $$(".posts .post-card").forEach((card) => {
          const show = cat === "all" || card.dataset.cat === cat;
          card.classList.toggle("is-hidden", !show);
          card.classList.remove("anim-in");
          if (show) { void card.offsetWidth; card.style.animationDelay = `${n++ * 0.08}s`; card.classList.add("anim-in", "is-visible"); }
        });
      })
    );
  }

  /* ---------- Contact form (front-end only) ---------- */
  $$("form[data-form]").forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add("is-sent");
      if (form.dataset.form === "contact") {
        const d = new FormData(form);
        const text = encodeURIComponent(
          `Hello ITCadence,\n\nName: ${d.get("name")}\nInstitution: ${d.get("org") || "-"}\nEmail: ${d.get("email")}\nInterest: ${d.get("topic")}\n\n${d.get("message") || ""}`
        );
        const wa = form.querySelector("[data-wa-link]");
        if (wa) wa.href = `https://wa.me/971569380690?text=${text}`;
      }
      form.reset();
    })
  );

  /* ---------- Article: TOC + reading progress ---------- */
  const toc = $(".toc ol");
  const prose = $(".prose");
  if (toc && prose) {
    const heads = $$("h2", prose);
    heads.forEach((h, k) => {
      if (!h.id) h.id = "s" + (k + 1);
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${h.id}">${h.textContent}</a>`;
      toc.appendChild(li);
    });
    const links = $$("a", toc);
    const tocIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    heads.forEach((h) => tocIO.observe(h));
  }
  const copyBtn = $("[data-copy-link]");
  if (copyBtn) copyBtn.addEventListener("click", () => {
    navigator.clipboard?.writeText(location.href);
    copyBtn.title = "Link copied";
    copyBtn.style.background = "var(--accent)";
    setTimeout(() => (copyBtn.style.background = ""), 1200);
  });

  /* ---------- Footer big letters ---------- */
  $$(".footer__big").forEach((el) => {
    el.innerHTML = [...el.textContent].map((c) => `<span>${c}</span>`).join("");
  });
})();

/* WhatsApp greeting bubble */
(function () {
  var wa = document.querySelector(".wa-float");
  if (!wa) return;
  setTimeout(function () { wa.classList.add("is-greeting"); }, 3500);
  setTimeout(function () { wa.classList.remove("is-greeting"); }, 11000);
})();
