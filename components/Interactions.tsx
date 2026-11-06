"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * All site animations live here. Markup is server-rendered (good for SEO);
 * this component attaches behaviour after hydration and cleans up on navigation.
 */
export default function Interactions() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window | Element, ev: K | string, fn: any, opts?: any) => {
      t.addEventListener(ev as string, fn, opts);
      cleanups.push(() => t.removeEventListener(ev as string, fn, opts));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s as any) as T | null;
    const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T>(s as any)) as T[];

    /* Nav state, progress bar, back-to-top */
    const nav = $(".nav");
    const progress = $(".scroll-progress");
    const backTop = $(".back-top");
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      nav?.classList.toggle("is-scrolled", y > 30);
      if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      backTop?.classList.toggle("is-visible", y > 700);
    };
    on(window, "scroll", onScroll, { passive: true });
    onScroll();

    const toggle = $(".nav__toggle");
    const closeMenu = () => {
      nav?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    closeMenu();
    if (toggle && nav) {
      on(toggle, "click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$(".nav__links a").forEach((a) => on(a, "click", closeMenu));
    }
    if (backTop) on(backTop, "click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

    /* Split headings into animated words */
    $$("[data-split]:not(.split-words)").forEach((el) => {
      const words = (el.textContent || "").trim().split(/\s+/);
      el.innerHTML = words.map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(" ");
      el.classList.add("split-words");
    });

    /* Reveal on scroll */
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    cleanups.push(() => io.disconnect());
    $$("[data-stagger]").forEach((wrap) =>
      Array.from(wrap.children).forEach((child, i) => {
        child.classList.add("reveal");
        (child as HTMLElement).style.setProperty("--d", `${Math.min(i, 8) * 0.08}s`);
      })
    );
    $$(".reveal, .split-words, .process, .flow").forEach((el) => io.observe(el));

    /* Counters */
    const countIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          countIO.unobserve(el);
          const target = parseFloat(el.dataset.count || "0");
          if (reduce) return void (el.textContent = String(target));
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / 1800, 1);
            el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 4))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.6 }
    );
    cleanups.push(() => countIO.disconnect());
    $$("[data-count]").forEach((el) => countIO.observe(el));

    /* Rotating hero word */
    const rot = $("[data-rotate]");
    if (rot) {
      const words = (rot.dataset.rotate || "").split("|");
      let idx = 0;
      const make = (word: string) => {
        const span = document.createElement("span");
        span.className = "rotator__word";
        span.innerHTML = [...word]
          .map((c, i) => `<span class="ch" style="transition-delay:${i * 0.03}s">${c === " " ? "&nbsp;" : c}</span>`)
          .join("");
        return span;
      };
      rot.innerHTML = "";
      let current = make(words[0]);
      rot.appendChild(current);
      requestAnimationFrame(() => requestAnimationFrame(() => current.classList.add("is-in")));
      if (!reduce) {
        const iv = window.setInterval(() => {
          const old = current;
          old.classList.replace("is-in", "is-out");
          window.setTimeout(() => {
            old.remove();
            idx = (idx + 1) % words.length;
            current = make(words[idx]);
            rot.appendChild(current);
            requestAnimationFrame(() => requestAnimationFrame(() => current.classList.add("is-in")));
          }, 550);
        }, 2800);
        cleanups.push(() => clearInterval(iv));
      }
    }

    /* Hero particle network */
    const canvas = $<HTMLCanvasElement>(".hero__canvas");
    if (canvas && !reduce) {
      const ctx = canvas.getContext("2d")!;
      let w = 0, h = 0, raf = 0, running = true;
      let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
      const mouse = { x: -9999, y: -9999 };
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.offsetWidth; h = canvas.offsetHeight;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round(Math.min(90, (w * h) / 16000));
        pts = Array.from({ length: n }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.6 + 0.6,
        }));
      };
      resize();
      on(window, "resize", resize);
      const host = canvas.parentElement!;
      on(host, "mousemove", (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      });
      on(host, "mouseleave", () => { mouse.x = mouse.y = -9999; });
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
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            }
          }
          ctx.fillStyle = dm < 160 ? "rgba(255,181,71,0.95)" : "rgba(180,240,230,0.75)";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
        raf = requestAnimationFrame(loop);
      };
      const vis = new IntersectionObserver(([e]) => {
        running = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (running) loop();
      });
      vis.observe(canvas);
      cleanups.push(() => { running = false; cancelAnimationFrame(raf); vis.disconnect(); });
    }

    /* Tilt, magnetic buttons, cursor glow */
    if (fine && !reduce) {
      $$("[data-tilt]").forEach((el) => {
        const max = parseFloat(el.dataset.tilt || "6");
        on(el, "mousemove", (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-6px)`;
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        });
        on(el, "mouseleave", () => (el.style.transform = ""));
      });
      $$("[data-magnetic]").forEach((el) => {
        on(el, "mousemove", (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        });
        on(el, "mouseleave", () => (el.style.transform = ""));
      });
      const glow = $(".cursor-glow");
      if (glow) {
        let gx = 0, gy = 0, tx = 0, ty = 0, raf = 0;
        on(window, "mousemove", (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; document.body.classList.add("has-cursor"); });
        const follow = () => {
          gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
          glow.style.left = gx + "px"; glow.style.top = gy + "px";
          raf = requestAnimationFrame(follow);
        };
        follow();
        cleanups.push(() => cancelAnimationFrame(raf));
      }
    }

    /* Banner module tabs (auto-advance) */
    const modules = $(".modules");
    if (modules) {
      const tabs = $$(".tab", modules), panels = $$(".panel", modules);
      let i = 0, timer = 0;
      const show = (n: number) => {
        i = n;
        tabs.forEach((t, k) => { t.classList.toggle("is-active", k === n); t.setAttribute("aria-selected", String(k === n)); });
        panels.forEach((p, k) => p.classList.toggle("is-active", k === n));
        const old = tabs[n].querySelector(".tab__timer");
        if (old) { const fresh = document.createElement("i"); fresh.className = "tab__timer"; old.replaceWith(fresh); }
      };
      const start = () => { clearInterval(timer); if (!reduce) timer = window.setInterval(() => show((i + 1) % tabs.length), 7000); };
      tabs.forEach((t, k) => on(t, "click", () => { show(k); start(); }));
      on(modules, "mouseenter", () => { clearInterval(timer); modules.classList.add("is-paused"); });
      on(modules, "mouseleave", () => { modules.classList.remove("is-paused"); start(); });
      const mio = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : clearInterval(timer)));
      mio.observe(modules);
      cleanups.push(() => { clearInterval(timer); mio.disconnect(); });
    }

    /* Accordions */
    $$(".faq__q").forEach((q) =>
      on(q, "click", () => {
        const item = q.closest(".faq__item")!;
        const group = item.parentElement!;
        const open = item.classList.contains("is-open");
        $$(".faq__item.is-open", group).forEach((x) => {
          x.classList.remove("is-open");
          x.querySelector(".faq__q")?.setAttribute("aria-expanded", "false");
        });
        if (!open) { item.classList.add("is-open"); q.setAttribute("aria-expanded", "true"); }
      })
    );

    /* Article table-of-contents highlight */
    const tocLinks = $$<HTMLAnchorElement>(".toc a");
    if (tocLinks.length) {
      const tio = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) tocLinks.forEach((a) => a.classList.toggle("is-active", a.hash === "#" + e.target.id));
        }),
        { rootMargin: "-20% 0px -70% 0px" }
      );
      $$(".prose h2[id]").forEach((h) => tio.observe(h));
      cleanups.push(() => tio.disconnect());
    }

    /* Footer letters */
    $$(".footer__big:not([data-done])").forEach((el) => {
      el.innerHTML = [...(el.textContent || "")].map((c) => `<span>${c}</span>`).join("");
      el.setAttribute("data-done", "");
    });

    /* WhatsApp greeting bubble */
    const wa = $(".wa-float");
    if (wa) {
      const t1 = window.setTimeout(() => wa.classList.add("is-greeting"), 3500);
      const t2 = window.setTimeout(() => wa.classList.remove("is-greeting"), 11000);
      cleanups.push(() => { clearTimeout(t1); clearTimeout(t2); });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
