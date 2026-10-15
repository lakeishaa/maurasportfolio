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
  function media(m) {
    if (!m) {
      return `<div class="media-item media-placeholder">Media coming soon</div>`;
    }

    const cls = `media-item ${esc(m.ratio || "")}`;

    let content = "";

    if (m.type === "youtube" && /^[\w-]{11}$/.test(m.id || "")) {
      content = `
        <iframe
          class="${cls}"
          src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.id)}?autoplay=${m.autoplay ? 1 : 0}&mute=${m.muted ? 1 : 0}&loop=${m.loop ? 1 : 0}&playlist=${encodeURIComponent(m.id)}"
          title="${esc(m.title || "Campaign video")}"
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>`;
    } else if (m.type === "video" && url(m.src)) {
      const autoplay = m.autoplay === true;
      content = `
        <video
          class="${cls}"
          src="${esc(url(m.src))}"
          ${autoplay ? "autoplay muted loop" : "controls"}
          playsinline
          preload="${autoplay ? "auto" : "metadata"}"
          ${m.poster && url(m.poster) ? `poster="${esc(url(m.poster))}"` : ""}
          ></video>`;
    } else if (m.type === "image" && url(m.src)) {
      content = `
        <img
          class="${cls}"
          src="${esc(url(m.src))}"
          alt="${esc(m.alt || m.title || "Project artwork")}"
          loading="lazy"
        >`;
    } else if (m.type === "link" && /^https:\/\//.test(m.url || "")) {
      content = `
        <a class="${cls} media-placeholder"
           href="${esc(m.url)}"
           target="_blank"
           rel="noopener noreferrer">
          ${esc(m.label || "View post")} ↗
        </a>`;
    } else {
      content = `
        <div class="${cls} media-placeholder">
          ${esc(m.label || "Media coming soon")}
        </div>`;
    }

    if (!m.title && !m.description && !m.link) {
      return content;
    }

    const assetLink = /^https?:\/\//.test(m.link || "")
      ? `<a href="${esc(m.link)}" target="_blank"
              rel="noopener noreferrer">View original ↗</a>`
      : "";

    return `
      <figure class="media-entry">
        ${content}
        <figcaption class="media-caption">
          ${m.title ? `<strong>${esc(m.title)}</strong>` : ""}
          ${m.description ? `<p>${esc(m.description)}</p>` : ""}
          ${assetLink}
        </figcaption>
      </figure>`;
  }

  function renderHero(p) {
    // Existing layout for projects without heroBlocks
    if (!Array.isArray(p.heroBlocks)) {
      const heroHTML = p.hero
        ? `<div class="hero-media">${media(p.hero)}</div>`
        : "";

      return `
        <div class="project-hero">
          <p class="project-intro">${p.intro || ""}</p>
          ${heroHTML}
        </div>`;
    }

    // Custom 12-column layout
    const blocks = p.heroBlocks
      .map((block) => {
        const col = Math.min(12, Math.max(1, Number(block.col) || 1));
        const span = Math.min(13 - col, Math.max(1, Number(block.span) || 4));
        const row = Math.max(1, Number(block.row) || 1);
        const order = Number(block.mobileOrder) || 0;

        let content = "";

        if (block.type === "intro") {
          content = `<p class="project-intro">${p.intro || ""}</p>`;
        } else if (block.type === "hero" && p.hero) {
          content = media(p.hero);
        } else if (block.type === "text") {
          let text = esc(block.content || "");

          if (block.link?.text && /^https?:\/\//.test(block.link.url || "")) {
            const linkText = esc(block.link.text);

            const linkHTML = `<a href="${esc(block.link.url)}"
      target="_blank"
      rel="noopener noreferrer">${linkText}</a>`;

            text = text.replace(linkText, linkHTML);
          }

          content = `<p class="project-intro">${text}</p>`;
        } else if (block.type === "image" || block.type === "video") {
          content = media(block);
        }

        if (!content) return "";

        return `
          <div
            class="hero-block"
            style="
              --col: ${col};
              --span: ${span};
              --row: ${row};
              --mobile-order: ${order};
            "
          >
            ${content}
          </div>`;
      })
      .join("");

    return `<div class="project-hero-grid">${blocks}</div>`;
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

  function renderLinks(items, heading) {
    if (!items?.length) return "";

    const links = items
      .filter((item) => /^https?:\/\//.test(item.url || ""))
      .map(
        (item) => `
          <a href="${esc(item.url)}"
             target="_blank"
             rel="noopener noreferrer">
            ${esc(item.title || "View link")} ↗
          </a>`
      )
      .join("");

    if (!links) return "";

    return `
      <section class="project-links">
        <h2>${esc(heading)}</h2>
        <div class="project-link-list">${links}</div>
      </section>`;
  }

  function detail() {
    const slug = new URLSearchParams(location.search).get("slug");
    const p = projects.find((project) => project.slug === slug);
    const root = document.querySelector("#project-root");

    if (!root) return;

    if (!p) {
      root.innerHTML =
        '<p>Project not found. <a href="index.html">Return home</a>.</p>';
      return;
    }

    document.title = `${p.brand} — Maura`;

    const currentIndex = projects.indexOf(p);
    const previous =
      projects[(currentIndex - 1 + projects.length) % projects.length];
    const next = projects[(currentIndex + 1) % projects.length];

    // const heroHTML = p.hero
    //   ? `<div class="hero-media">${media(p.hero)}</div>`
    //   : "";

    const sectionsHTML = (p.sections || [])
      .map((section, index) => {
        const assets = section.media || [];

        return `
          <section class="work-section" aria-label="${esc(section.title)}">
            <div class="work-scroll" tabindex="0">
              <div class="work-copy">
                <h2>${String(index + 1).padStart(2, "0")}. ${esc(section.title)}</h2>
                ${section.description ? `<p>${section.description}</p>` : ""}
              </div>

              ${
                assets.length
                  ? assets.map((asset) => media(asset)).join("")
                  : `<div class="media-item media-placeholder">
                       Assets coming soon
                     </div>`
              }
            </div>
          </section>`;
      })
      .join("");

    const creditsHTML = Array.isArray(p.credits)
      ? p.credits
          .map(
            (credit) => `
              <p>
                <span>${esc(credit.role)}</span>
                <span>${esc(credit.name)}</span>
              </p>`
          )
          .join("")
      : esc(p.credits || "");

    root.innerHTML = `
      <article class="project-detail">

        
      <header class="project-heading-group">
        <p class="project-brand">${esc(p.brand)}</p>
        <h1 class="project-heading">${esc(p.tagline)}</h1>
      </header>


    ${renderHero(p)}

        ${sectionsHTML}

        <section class="project-bottom">
          
        <div class="project-press">
        ${renderLinks(
          p.press,
          p.slug === "baskin"
            ? "Press (Only for 'Sweet on Sydney' Campaign)"
            : "Press"
        )}
        </div>

          ${
            creditsHTML
              ? `<div class="project-credits">
                  <h2>Credits</h2>
                  ${creditsHTML}
                </div>`
              : ""
          }
        </section>

        ${renderLinks(p.links, "Links")}

        <nav class="project-navigation" aria-label="Project navigation">
          <a href="project.html?slug=${encodeURIComponent(previous.slug)}">
            ← ${esc(previous.brand)}
          </a>
          <a href="project.html?slug=${encodeURIComponent(next.slug)}">
            ${esc(next.brand)} →
          </a>
        </nav>

      </article>`;
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

  function initGalleryCursor() {
    const galleries = document.querySelectorAll(".work-scroll");

    if (!galleries.length) return;

    const cursor = document.createElement("div");
    cursor.className = "gallery-cursor";
    cursor.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    `;

    document.body.appendChild(cursor);

    const path = cursor.querySelector("path");

    galleries.forEach((gallery) => {
      gallery.addEventListener("pointerenter", () => {
        cursor.classList.add("visible");
      });

      gallery.addEventListener("pointermove", (e) => {
        const rect = gallery.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const isLeft = x < rect.width / 2;

        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        path.setAttribute(
          "d",
          isLeft ? "M19 12H5m7-7-7 7 7 7" : "M5 12h14m-7-7 7 7-7 7"
        );
      });

      gallery.addEventListener("pointerleave", () => {
        cursor.classList.remove("visible");
      });

      gallery.addEventListener("click", (e) => {
        if (e.target.closest("a, button")) return;

        const rect = gallery.getBoundingClientRect();
        const isLeft = e.clientX - rect.left < rect.width / 2;

        gallery.scrollBy({
          left: isLeft ? -rect.width * 0.7 : rect.width * 0.7,
          behavior: "smooth",
        });
      });
    });
  }

  initGalleryCursor();
})();
