const gifCursor = document.getElementById("gif-cursor");

if (gifCursor) {
  let x = 0;
  let y = 0;
  let frame = null;

  function updateCursor() {
    gifCursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

    gifCursor.style.opacity = "1";
    frame = null;
  }

  document.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;

      x = e.clientX;
      y = e.clientY;

      if (frame === null) {
        frame = requestAnimationFrame(updateCursor);
      }
    },
    { passive: true }
  );

  function hideCursor() {
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }

    gifCursor.style.opacity = "0";
  }

  document.documentElement.addEventListener("pointerleave", hideCursor);

  window.addEventListener("blur", hideCursor);
}

// const gifCursor = document.getElementById("gif-cursor");

// if (gifCursor) {
//   document.addEventListener("pointermove", (e) => {
//     if (e.pointerType !== "mouse") return;

//     gifCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

//     gifCursor.style.opacity = "1";
//   });

//   document.addEventListener("mouseleave", () => {
//     gifCursor.style.opacity = "0";
//   });
// }
