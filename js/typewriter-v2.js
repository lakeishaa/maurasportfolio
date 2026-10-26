(() => {
  "use strict";

  // Typing controls (durations are scaled by typingSpeed).
  const typingSpeed = 0.3;
  const LETTER_DELAY_MIN = 35;
  const LETTER_DELAY_RANDOM = 20;
  const SPACE_DELAY_MIN = 20;
  const SPACE_DELAY_RANDOM = 100;
  const PUNCTUATION_DELAY_MIN = 180;
  const PUNCTUATION_DELAY_RANDOM = 300;
  const HESITATION_CHANCE = 0.03;
  const HESITATION_DELAY_MIN = 150;
  const HESITATION_DELAY_RANDOM = 300;
  const DELETE_DELAY_MIN = 25;
  const DELETE_DELAY_RANDOM = 40;
  const TYPO_NOTICE_DELAY_MIN = 300;
  const TYPO_NOTICE_DELAY_RANDOM = 600;
  const TYPO_RETYPE_DELAY_MIN = 100;
  const TYPO_RETYPE_DELAY_RANDOM = 150;
  const START_DELAY = 700;
  const THINKING_PAUSE_1 = 800;
  const THINKING_PAUSE_2 = 600;
  const THINKING_PAUSE_3 = 900;
  const SYMBOL_CHANCE = 0.25;
  const HOVER_ACTIVE_DURATION = 700;
  const TRAIL_CURRENT = 0;
  const TRAIL_PREV_1 = 120;
  const TRAIL_PREV_2 = 240;
  const TRAIL_PREV_3 = 360;
  const TRAIL_NEXT_1 = 160;
  const TYPING_COLOR_TRAIL = 4;
  const TYPING_COLOR_RESET_DELAY = 120;

  const demo = document.getElementById("demo");
  const cursor = document.getElementById("cursor");
  if (!demo || !cursor) return;

  const colors = ["#F43F25", "#C7DD38", "#32B7FF", "#FF87F4"];
  const symbols = ["&", "*", "$", "!", "#", "%", "+", "@"];
  const specialCharacters = {};
  const wordLinks = {
    journalist:
      "https://docs.google.com/spreadsheets/d/1Dmp2cSqLhPTW8UnpUvJse67bP00qQ-QeH2lBWXlPUS0/edit?gid=0#gid=0",
    dancer:
      "https://www.instagram.com/p/BFO7nAYmOPG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  };
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const randomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];
  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms * typingSpeed));

  let currentWord = null;
  let lastTyped = null;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function typingDelay(character) {
    let delay = LETTER_DELAY_MIN + Math.random() * LETTER_DELAY_RANDOM;
    if (character === " ")
      delay += SPACE_DELAY_MIN + Math.random() * SPACE_DELAY_RANDOM;
    if (/[,.!?]/.test(character))
      delay += PUNCTUATION_DELAY_MIN + Math.random() * PUNCTUATION_DELAY_RANDOM;
    if (Math.random() < HESITATION_CHANCE)
      delay += HESITATION_DELAY_MIN + Math.random() * HESITATION_DELAY_RANDOM;
    return delay;
  }

  function activateLetter(letter, delay = 0) {
    if (!letter || letter.dataset.busy === "true" || reducedMotion) return;

    letter.dataset.busy = "true";

    setTimeout(() => {
      if (!letter.isConnected) return;

      const original = letter.dataset.original;
      const link = letter.closest(".typewriter-link");

      // Keep linked letters pink while hovering
      const isLinkHovered = link && link.matches(":hover");

      letter.style.color = isLinkHovered ? "#FF87F4" : randomColor();

      // Keep the changing-character effect
      letter.textContent =
        Math.random() < SYMBOL_CHANCE ? randomSymbol() : original;

      letter.classList.add("active");
      window.playTypewriterSound?.();

      setTimeout(() => {
        if (!letter.isConnected) return;

        letter.textContent = original;

        // Check hover again when animation finishes
        const stillHovered = link && link.matches(":hover");

        letter.style.color = stillHovered
          ? "#FF87F4"
          : letter.dataset.baseColor;

        letter.classList.remove("active");
        letter.dataset.busy = "false";
      }, HOVER_ACTIVE_DURATION);
    }, delay);
  }

  function createTrail(letter) {
    const letters = Array.from(demo.querySelectorAll(".letter"));
    const index = letters.indexOf(letter);
    [
      [0, TRAIL_CURRENT],
      [-1, TRAIL_PREV_1],
      [-2, TRAIL_PREV_2],
      [-3, TRAIL_PREV_3],
      [1, TRAIL_NEXT_1],
    ].forEach(([offset, delay]) =>
      activateLetter(letters[index + offset], delay)
    );
  }

  function createCharacter(character) {
    if (character === " ") {
      currentWord = null;

      const space = document.createElement("span");
      space.className = "space";
      space.textContent = " ";
      demo.insertBefore(space, cursor);
      lastTyped = space;
      return;
    }

    if (!currentWord) {
      currentWord = document.createElement("span");
      currentWord.className = "word";
      demo.insertBefore(currentWord, cursor);
    }

    const span = document.createElement("span");
    span.className = "letter";
    span.dataset.original = character;
    span.dataset.busy = "false";
    span.dataset.baseColor = specialCharacters[character] || "black";
    span.textContent = character;
    span.style.color = span.dataset.baseColor;

    span.addEventListener("mouseenter", () => createTrail(span));

    const target = currentWord.querySelector(".typewriter-link") || currentWord;
    target.appendChild(span);

    lastTyped = span;
  }

  function deleteLastCharacter() {
    const last = cursor.previousElementSibling;
    if (!last) return;

    if (last.classList.contains("space")) {
      last.remove();
      const prev = cursor.previousElementSibling;
      currentWord = prev?.classList.contains("word") ? prev : null;
      return;
    }

    const container = last.querySelector(".typewriter-link") || last;
    const char = container.lastElementChild;

    if (char) char.remove();

    if (!container.children.length) {
      if (container.classList.contains("typewriter-link")) {
        // Keep the empty link for the corrected word
        currentWord = last;
      } else {
        last.remove();
        currentWord = null;
      }
    } else {
      currentWord = last;
    }
  }

  function updateTypingColorTrail() {
    const letters = Array.from(demo.querySelectorAll(".letter"));
    const old = letters.slice(0, -TYPING_COLOR_TRAIL);
    const newest = letters.slice(-TYPING_COLOR_TRAIL);

    old.forEach((letter, index) => {
      setTimeout(
        () => {
          if (!letter.isConnected || letter.dataset.busy === "true") return;

          const isLink = !!letter.closest(".typewriter-link");
          const color = isLink
            ? letter.closest(".typewriter-link").matches(":hover")
              ? "#FF87F4"
              : "#a4b51b"
            : "black";

          letter.style.color = color;
          letter.dataset.baseColor = color;
        },
        Math.min(index * 5, TYPING_COLOR_RESET_DELAY)
      );
    });

    newest.forEach((letter) => {
      if (letter.dataset.busy === "true") return;

      const isLink = !!letter.closest(".typewriter-link");
      const color = isLink
        ? letter.closest(".typewriter-link").matches(":hover")
          ? "#FF87F4"
          : "#a4b51b"
        : randomColor();

      letter.style.color = color;
      letter.dataset.baseColor = color;
    });
  }

  function startLinkedWord(word) {
    currentWord = document.createElement("span");
    currentWord.className = "word";
    demo.insertBefore(currentWord, cursor);

    const link = document.createElement("a");
    link.href = wordLinks[word];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "typewriter-link";
    link.setAttribute("aria-label", `Open ${word} link`);

    currentWord.appendChild(link);
  }

  async function typeCharacters(text) {
    for (const character of text) {
      createCharacter(character);
      updateTypingColorTrail();

      if (character !== " ") {
        window.playTypewriterSound?.();
      }

      await sleep(typingDelay(character));
    }
  }

  async function deleteCharacters(amount) {
    for (let i = 0; i < amount; i++) {
      deleteLastCharacter();
      await sleep(DELETE_DELAY_MIN + Math.random() * DELETE_DELAY_RANDOM);
    }
  }

  async function typo(correct, incorrect) {
    await typeCharacters(incorrect);
    await sleep(
      TYPO_NOTICE_DELAY_MIN + Math.random() * TYPO_NOTICE_DELAY_RANDOM
    );
    await deleteCharacters(Array.from(incorrect).length);
    await sleep(
      TYPO_RETYPE_DELAY_MIN + Math.random() * TYPO_RETYPE_DELAY_RANDOM
    );
    await typeCharacters(correct);
  }

  // function linkTypedWords() {
  //   demo.querySelectorAll(".word").forEach((word) => {
  //     const text = word.textContent;

  //     // Remove decorative symbols before checking the word
  //     const cleanWord = text
  //       .replace(/^[^a-zA-Z]+/, "")
  //       .replace(/[^a-zA-Z]+$/, "")
  //       .toLowerCase();

  //     const url = wordLinks[cleanWord];
  //     if (!url || word.querySelector("a")) return;

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.target = "_blank";
  //     link.rel = "noopener noreferrer";
  //     link.className = "typewriter-link";
  //     link.setAttribute("aria-label", `Open ${cleanWord} link`);

  //     // Move existing letters into the link
  //     while (word.firstChild) {
  //       link.appendChild(word.firstChild);
  //     }

  //     word.appendChild(link);
  //   });
  // }

  function finishTypingColors() {
    demo.querySelectorAll(".letter").forEach((letter, index) => {
      setTimeout(() => {
        if (!letter.isConnected || letter.dataset.busy === "true") return;

        const isLink = !!letter.closest(".typewriter-link");
        const color = isLink ? "#a4b51b" : "black";

        letter.style.color = color;
        letter.dataset.baseColor = color;
      }, index * 8);
    });
  }

  const finalText =
    "Maura is a Senior Copywriter who writes magnetic and magical ⋆˚stories⋆. A✎journalist and dancer❀ in a past life, a dolphin in her next one ✺";

  async function humanType() {
    if (reducedMotion) {
      demo.textContent = finalText;
      return;
    }
    await sleep(START_DELAY);
    await typeCharacters("Maura is a Senior ");
    await typo("Copywriter", "Copywrtier");
    await typeCharacters(" who writes");
    await typeCharacters(" magnetic and ");
    await sleep(THINKING_PAUSE_1);
    await typeCharacters("magical ⋆˚stories⋆. A ");

    startLinkedWord("journalist");
    await typo("✎journalist", "✎journlist");

    await typeCharacters(" and ");

    startLinkedWord("dancer");
    await typeCharacters("dancer❀");

    await typeCharacters(" in a past life,");

    await sleep(THINKING_PAUSE_2);
    await typeCharacters(" a dolphin");
    await sleep(THINKING_PAUSE_3);
    await typeCharacters(" in her next one ✺");
    await sleep(250);
    finishTypingColors();
  }

  if (document.readyState === "complete") humanType();
  else window.addEventListener("load", humanType, { once: true });
})();
