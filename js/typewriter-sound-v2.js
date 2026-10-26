(() => {
  "use strict";

  const soundFiles = [
    "../assets/sound/typewriter-1.mov",
    "../assets/sound/typewriter-2.mov",
    "../assets/sound/typewriter-3.mov",
  ];

  const VOLUME = 0.25;
  const MIN_INTERVAL = 45;

  let lastSoundTime = 0;
  let audioUnlocked = false;

  const sounds = soundFiles.map((src) => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = VOLUME;
    return audio;
  });

  // Browsers require user interaction before playing audio.
  function unlockAudio() {
    audioUnlocked = true;
  }

  document.addEventListener("pointerdown", unlockAudio, { once: true });
  document.addEventListener("keydown", unlockAudio, { once: true });

  window.playTypewriterSound = function () {
    if (!audioUnlocked) return;

    const now = performance.now();

    // Prevent excessive overlapping sounds
    if (now - lastSoundTime < MIN_INTERVAL) return;

    lastSoundTime = now;

    const audio = sounds[Math.floor(Math.random() * sounds.length)];

    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };
})();
