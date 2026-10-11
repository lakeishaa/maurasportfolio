(() => {
  "use strict";
  const projects = window.PORTFOLIO || [];
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c]
    );
  const url = (s) => (/^(https?:\/\/|\/|assets\/)/.test(s || "") ? s : "");
  function media(m, hero = false) {
    if (!m)
      return `<div class="media-item media-placeholder">Hero media coming soon</div>`;
    const cls = `media-item ${esc(m.ratio || "")}`;
    if (m.type === "youtube" && /^[\w-]{11}$/.test(m.id || ""))
      return `<iframe class="${cls}" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.id)}" title="Campaign video" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    if (m.type === "video" && url(m.src))
      return `<video class="${cls}" controls playsinline preload="metadata" src="${esc(url(m.src))}"></video>`;
    if (m.type === "image" && url(m.src))
      return `<img class="${cls}" src="${esc(url(m.src))}" alt="${esc(m.label || "Project artwork")}" loading="lazy">`;
    if (m.type === "link" && /^https:\/\//.test(m.url || ""))
      return `<a class="${cls} media-placeholder" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.label || "View post")} ↗</a>`;
    return `<div class="${cls} media-placeholder">${esc(m.label || "Replace with project media")}</div>`;
  }
  function home() {
    const root = document.querySelector("#projects");
    if (!root) return;
    root.innerHTML = projects
      .map(
        (p, i) =>
          `<a class="project-card ${esc(p.shape || "")}" href="project.html?slug=${encodeURIComponent(p.slug)}"><figure><div class="project-number">${String(i + 1).padStart(2, "0")}.</div>${url(p.cover) ? `<img class="cover ${esc(p.shape || "")}" src="${esc(url(p.cover))}" alt="${esc(p.brand)}">` : `<div class="cover placeholder ${esc(p.shape || "")}">${esc(p.brand)}</div>`}<figcaption class="card-caption"><span class="brand">${esc(p.brand)}</span><br>${esc(p.tagline)}</figcaption></figure></a>`
      )
      .join("");
  }
  function detail() {
    const slug = new URLSearchParams(location.search).get("slug");
    const p = projects.find((x) => x.slug === slug);
    const root = document.querySelector("#project-root");
    if (!root) return;
    if (!p) {
      root.innerHTML =
        '<p>Project not found. <a href="index.html">Return home</a>.</p>';
      return;
    }
    document.title = `${p.brand} — Maura`;
    root.innerHTML = `<article class="project-detail"><h1 class="project-heading interactive-text">${esc(p.brand)}<br>${esc(p.tagline)}</h1><div class="project-hero"><p>${esc(p.intro || "Project introduction coming soon.")}</p><div class="hero-media">${media(p.hero)}</div></div>${(p.sections || []).map((s, i) => `<section class="work-section" aria-label="${esc(s.title)}"><div class="work-scroll" tabindex="0"><div class="work-copy"><h2>${i + 1}. ${esc(s.title)}</h2>${s.description ? `<p>${esc(s.description)}</p>` : ""}</div>${(s.media || []).map((m) => media(m)).join("")}</div></section>`).join("")}<footer class="project-credits">${esc(p.credits || "")}</footer></article>`;
  }
  function letters() {
    const colors = ["#d84b36", "#9bae1c", "#2699d2", "#ef78b8"];
    document.querySelectorAll(".interactive-text").forEach((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((n) => {
        if (!n.nodeValue.trim()) return;
        const frag = document.createDocumentFragment();
        for (const ch of n.nodeValue) {
          if (/\s/.test(ch)) {
            frag.append(ch);
            continue;
          }
          const span = document.createElement("span");
          span.className = "letter";
          span.textContent = ch;
          span.addEventListener("mouseenter", () => {
            span.style.color =
              colors[Math.floor(Math.random() * colors.length)];
            span.textContent = Math.random() < 0.18 ? "✳" : ch;
          });
          span.addEventListener("mouseleave", () => {
            span.textContent = ch;
            span.style.color = "";
          });
          frag.append(span);
        }
        n.replaceWith(frag);
      });
    });
  }
  if (document.body.dataset.page === "home") home();
  else detail();
  letters();
})();
