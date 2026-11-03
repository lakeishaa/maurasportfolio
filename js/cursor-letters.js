function initCursorSparkles() {
  // Desktop mouse only
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const symbols = ["&", "*", "$", "!", "#", "%", "+", "@"];
  const colors = ["#A4B51B"];
  const maxParticles = 50;
  const particles = [];

  let lastSpawn = 0;

  const container = document.createElement("div");
  container.className = "cursor-sparkles";
  document.body.appendChild(container);

  function createParticle() {
    const el = document.createElement("span");
    el.className = "cursor-sparkle";
    container.appendChild(el);

    return {
      el,
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
      rotationSpeed: 0,
      life: 0,
      maxLife: 0,
    };
  }

  // Reuse particles instead of creating new elements forever
  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle());
  }

  function spawn(x, y) {
    const particle = particles.find((p) => !p.active);
    if (!particle) return;

    particle.active = true;
    particle.x = x + (Math.random() - 0.5) * 12;
    particle.y = y + (Math.random() - 0.5) * 12;
    particle.vx = (Math.random() - 0.5) * 1.5;
    particle.vy = -0.5 + Math.random() * 1.5;
    particle.rotation = (Math.random() - 0.5) * 30;
    particle.rotationSpeed = (Math.random() - 0.5) * 3;
    particle.life = 0;
    particle.maxLife = 35 + Math.random() * 25;

    particle.el.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.el.style.color = colors[Math.floor(Math.random() * colors.length)];

    particle.el.style.fontSize = `${16 + Math.random() * 7}px`;
    particle.el.style.opacity = "1";
  }

  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;

    const now = performance.now();

    // Spawn one particle approximately every 25ms
    if (now - lastSpawn < 25) return;

    lastSpawn = now;
    spawn(e.clientX, e.clientY);
  });

  function animate() {
    particles.forEach((p) => {
      if (!p.active) return;

      p.life++;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.035;
      p.rotation += p.rotationSpeed;

      const progress = p.life / p.maxLife;

      if (progress >= 1) {
        p.active = false;
        p.el.style.opacity = "0";
        return;
      }

      p.el.style.transform = `
          translate3d(${p.x}px, ${p.y}px, 0)
          translate(-50%, -50%)
          rotate(${p.rotation}deg)
          scale(${1 - progress * 0.35})
        `;

      p.el.style.opacity = String(1 - progress);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

initCursorSparkles();
