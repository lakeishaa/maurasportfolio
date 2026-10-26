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
        const offsetY = Number(block.offsetY) || 0;

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
          class="hero-block ${esc(block.className || "")}"
            style="
            --col: ${col};
            --span: ${span};
            --row: ${row};
            --mobile-order: ${order};
            --offset-y: ${offsetY}px;
            "
          >
            ${content}
          </div>`;
      })
      .join("");

    return `<div class="project-hero-grid ${p.slug === "walmart" ? "walmart-hero-grid" : ""}">${blocks}</div>`;
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
        <h2 class="interactive-text">${esc(heading)}</h2>
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

        if (section.layout === "staggered") {
          const rows = [[], [], []];

          assets.forEach((asset, i) => {
            rows[i % 3].push(media(asset));
          });

          const rowsHTML = rows
            .map(
              (items) => `
              <div class="staggered-row-scroll" tabindex="0">
                <div class="staggered-row">
                  ${items.join("")}
                </div>
              </div>
            `
            )
            .join("");

          return `
            <section class="work-section staggered-section"
                     aria-label="${esc(section.title)}">
        
              <div class="work-copy">
                <h2 class="interactive-text">
                  ${String(index + 1).padStart(2, "0")}. ${esc(section.title)}
                </h2>
                ${section.description ? `<p>${section.description}</p>` : ""}
              </div>
              
              <div class="staggered-gallery"
              aria-label="${esc(section.title)} gallery">
              <div class="staggered-track">
              ${rowsHTML}
              </div>
              </div>
        
            </section>
          `;
        }

        return `
          <section class="work-section" aria-label="${esc(section.title)}">
            <div class="work-scroll" tabindex="0">
              <div class="work-copy">
              <h2 class="interactive-text">${String(index + 1).padStart(2, "0")}. ${esc(section.title)}</h2>
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
                <span class="interactive-text">${esc(credit.role)}</span>
                <span class="interactive-text">${esc(credit.name)}</span>
              </p>`
          )
          .join("")
      : esc(p.credits || "");

    root.dataset.project = p.slug;

    root.innerHTML = `
      <article class="project-detail" data-project="${esc(p.slug)}">

        
      <header class="project-heading-group">
        <p class="project-brand interactive-text">${esc(p.brand)}</p>
        <h1 class="project-heading">${esc(p.tagline)}</h1>
      </header>


    ${renderHero(p)}

        ${sectionsHTML}

        <section class="project-bottom">
          
        <div class="project-press">
        ${renderLinks(
          p.press,
          p.slug === "baskin" ? "Press ('Sweet on Sydney' Campaign)" : "Press"
        )}
        </div>

          ${
            creditsHTML
              ? `<div class="project-credits"><h2 class="interactive-text">Credits</h2>${creditsHTML}</div>`
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
    const colors = ["#F43F25", "#C7DD38", "#32B7FF", "#FF87F4"];
    const symbols = ["&", "*", "$", "!", "#", "%", "+", "@"];

    // Same trail timing as typewriter.js
    const TRAIL_CURRENT = 0;
    const TRAIL_PREV_1 = 120;
    const TRAIL_PREV_2 = 240;
    const TRAIL_PREV_3 = 360;
    const TRAIL_NEXT_1 = 160;

    const HOVER_ACTIVE_DURATION = 700;
    const SYMBOL_CHANCE = 0.25;

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const randomSymbol = () =>
      symbols[Math.floor(Math.random() * symbols.length)];

    function activateLetter(letter, delay = 0) {
      if (!letter || letter.dataset.busy === "true") return;

      letter.dataset.busy = "true";

      setTimeout(() => {
        if (!letter.isConnected) {
          letter.dataset.busy = "false";
          return;
        }

        const original = letter.dataset.original;

        letter.style.color = randomColor();

        letter.textContent =
          Math.random() < SYMBOL_CHANCE ? randomSymbol() : original;

        letter.classList.add("active");

        setTimeout(() => {
          if (!letter.isConnected) return;

          letter.textContent = original;
          letter.style.color = "";
          letter.classList.remove("active");
          letter.dataset.busy = "false";
        }, HOVER_ACTIVE_DURATION);
      }, delay);
    }

    function createTrail(letter, container) {
      // Only animate letters within the same text element
      const letters = Array.from(container.querySelectorAll(".letter"));

      const index = letters.indexOf(letter);

      [
        [0, TRAIL_CURRENT],
        [-1, TRAIL_PREV_1],
        [-2, TRAIL_PREV_2],
        [-3, TRAIL_PREV_3],
        [1, TRAIL_NEXT_1],
      ].forEach(([offset, delay]) => {
        activateLetter(letters[index + offset], delay);
      });
    }

    document.querySelectorAll(".interactive-text").forEach((el) => {
      // Prevent initializing the same element twice
      if (el.dataset.interactiveReady === "true") return;
      el.dataset.interactiveReady = "true";

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);

      const nodes = [];

      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }

      nodes.forEach((node) => {
        if (!node.nodeValue.trim()) return;

        const frag = document.createDocumentFragment();

        // Separate words and whitespace
        const parts = node.nodeValue.match(/\S+|\s+/g) || [];

        parts.forEach((part) => {
          // Keep spaces as normal text so wrapping works naturally
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(part));
            return;
          }

          // Group each word so it cannot break between letters
          const word = document.createElement("span");
          word.className = "interactive-word";

          for (const ch of part) {
            const span = document.createElement("span");
            span.className = "letter";
            span.dataset.original = ch;
            span.dataset.busy = "false";
            span.textContent = ch;

            span.addEventListener("mouseenter", () => {
              createTrail(span, el);
            });

            word.appendChild(span);
          }

          frag.appendChild(word);
        });

        node.replaceWith(frag);
      });
    });
  }

  if (document.body.dataset.page === "home") {
    home();
  } else {
    detail();
  }

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

  function initStaggeredGalleries() {
    document.querySelectorAll(".staggered-row-scroll").forEach((row) => {
      let targetScroll = row.scrollLeft;
      let currentScroll = row.scrollLeft;
      let animationFrame = null;
      let isHovering = false;

      // Lower = smoother/slower, higher = faster
      const smoothness = 0.06;

      function animate() {
        currentScroll += (targetScroll - currentScroll) * smoothness;

        if (Math.abs(targetScroll - currentScroll) < 0.5) {
          currentScroll = targetScroll;
        }

        row.scrollLeft = currentScroll;

        if (Math.abs(targetScroll - currentScroll) >= 0.5) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          animationFrame = null;
        }
      }

      function startAnimation() {
        if (animationFrame === null) {
          animationFrame = requestAnimationFrame(animate);
        }
      }

      row.addEventListener("pointerenter", (e) => {
        if (e.pointerType !== "mouse") return;
        isHovering = true;
        currentScroll = row.scrollLeft;
      });

      row.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse" || !isHovering) return;

        const rect = row.getBoundingClientRect();
        const maxScroll = row.scrollWidth - row.clientWidth;

        if (maxScroll <= 0) return;

        const position = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );

        targetScroll = position * maxScroll;
        startAnimation();
      });

      row.addEventListener("pointerleave", () => {
        isHovering = false;
      });

      // Keep Shift + wheel scrolling
      row.addEventListener(
        "wheel",
        (e) => {
          if (!e.shiftKey) return;

          e.preventDefault();

          const delta =
            Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

          targetScroll = Math.max(
            0,
            Math.min(row.scrollWidth - row.clientWidth, targetScroll + delta)
          );

          startAnimation();
        },
        { passive: false }
      );
    });
  }

  initStaggeredGalleries();

  function initGalleryHoverNudge() {
    const galleries = document.querySelectorAll(
      ".work-scroll, .staggered-row-scroll"
    );

    galleries.forEach((gallery) => {
      let animationFrame = null;
      let lastTime = null;

      // Adjust speed here (pixels per second)
      const speed = 35;

      function animate(time) {
        if (lastTime === null) lastTime = time;

        const delta = (time - lastTime) / 1000;
        lastTime = time;

        const maxScroll = gallery.scrollWidth - gallery.clientWidth;

        if (maxScroll > 0) {
          gallery.scrollLeft = Math.min(
            gallery.scrollLeft + speed * delta,
            maxScroll
          );
        }

        animationFrame = requestAnimationFrame(animate);
      }

      gallery.addEventListener("pointerenter", (e) => {
        if (e.pointerType !== "mouse") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;

        if (animationFrame !== null) return;

        lastTime = null;
        animationFrame = requestAnimationFrame(animate);
      });

      gallery.addEventListener("pointerleave", () => {
        if (animationFrame !== null) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
        lastTime = null;
      });
    });
  }

  function initMobileSwipeHint() {
    if (!window.matchMedia("(max-width: 1100px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const galleries = document.querySelectorAll(
      ".work-scroll, .staggered-row-scroll"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const gallery = entry.target;

          // Reset when gallery leaves the screen
          if (!entry.isIntersecting) {
            gallery.dataset.hintPlayed = "false";
            return;
          }

          // Only animate once per appearance
          if (gallery.dataset.hintPlayed === "true") return;

          const maxScroll = gallery.scrollWidth - gallery.clientWidth;
          if (maxScroll <= 0) return;

          gallery.dataset.hintPlayed = "true";

          const start = gallery.scrollLeft;
          const distance = Math.min(80, maxScroll - start);

          // Slide left
          gallery.scrollTo({
            left: start + distance,
            behavior: "smooth",
          });

          // Slide back
          setTimeout(() => {
            gallery.scrollTo({
              left: start,
              behavior: "smooth",
            });
          }, 700);
        });
      },
      {
        threshold: 0.5,
      }
    );

    galleries.forEach((gallery) => observer.observe(gallery));
  }

  initMobileSwipeHint();

  initGalleryHoverNudge();
})();
