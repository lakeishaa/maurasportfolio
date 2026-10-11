function initImageHover() {
  const projects = window.PORTFOLIO || [];
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card, index) => {
    const project = projects[index];

    if (!project?.hoverImages?.length || !project.cover) {
      return;
    }

    const image = card.querySelector("img.cover");
    if (!image) return;

    const cover = project.cover;
    const hoverImages = project.hoverImages;

    // Lock the aspect ratio to the original cover.
    function lockCoverRatio() {
      if (!image.naturalWidth || !image.naturalHeight) return;

      image.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
    }

    // Use the cover's dimensions, not the hover image's.
    if (image.complete && image.naturalWidth) {
      lockCoverRatio();
    } else {
      image.addEventListener("load", lockCoverRatio, {
        once: true,
      });
    }

    // Preload hover images.
    hoverImages.forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });

    image.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      const rect = image.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width)
      );

      const imageIndex = Math.min(
        hoverImages.length - 1,
        Math.floor(progress * hoverImages.length)
      );

      const nextImage = hoverImages[imageIndex];

      if (image.getAttribute("src") !== nextImage) {
        image.src = nextImage;
      }
    });
  });
}

window.addEventListener("load", initImageHover);
