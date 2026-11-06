const gifCursor = document.getElementById("gif-cursor");

if (gifCursor) {
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;

    gifCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

    gifCursor.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    gifCursor.style.opacity = "0";
  });
}
