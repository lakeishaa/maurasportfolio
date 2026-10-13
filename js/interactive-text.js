/* =========================================
   GLOBAL INTERACTIVE TYPOGRAPHY
========================================= */

const interactiveColors = ["#F43F25", "#C7DD38", "#32B7FF", "#FF87F4"];

const interactiveSymbols = ["&", "*", "$", "!", "#", "%", "+", "@"];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function makeTextInteractive(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;

      if (!parent || !node.textContent.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      if (
        parent.closest(
          [
            "script",
            "style",
            "noscript",
            "textarea",
            "input",
            "button",
            "select",
            "option",
            "svg",
            "code",
            "pre",
            ".interactive-letter",
            ".interactive-word",
            "a",
            ".no-interaction",
            "#maura-interactive",
          ].join(",")
        )
      ) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();

    const parts = node.textContent.match(/\s+|\S+/g) || [];

    parts.forEach((part) => {
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      const word = document.createElement("span");
      word.className = "interactive-word";

      for (const character of part) {
        const letter = document.createElement("span");

        letter.className = "interactive-letter";
        letter.textContent = character;

        word.appendChild(letter);
      }

      fragment.appendChild(word);
    });

    node.replaceWith(fragment);
  });
}

/* =========================================
     LETTER HOVER INTERACTION
  ========================================= */

document.addEventListener("pointerover", (event) => {
  const letter = event.target.closest?.(".interactive-letter");

  if (!letter || letter.dataset.animating === "true") {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const original = letter.textContent;

  letter.dataset.animating = "true";
  letter.style.color = randomItem(interactiveColors);

  if (Math.random() < 0.35) {
    letter.textContent = randomItem(interactiveSymbols);
  }

  setTimeout(() => {
    letter.textContent = original;
    letter.style.color = "";
    letter.dataset.animating = "false";
  }, 300);
});

/* =========================================
     INITIALIZE
  ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const headingSelector = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    ".project-number",
  ].join(", ");

  function applyToHeadings(root = document) {
    if (root.nodeType === Node.ELEMENT_NODE && root.matches(headingSelector)) {
      makeTextInteractive(root);
    }

    root.querySelectorAll(headingSelector).forEach((heading) => {
      makeTextInteractive(heading);
    });
  }

  // Apply only to headings already on the page
  applyToHeadings();

  // Apply to headings added later by site.js
  const observer = new MutationObserver((mutations) => {
    const addedElements = new Set();

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          addedElements.add(node);
        }
      });
    });

    addedElements.forEach((element) => {
      if (element.isConnected) {
        applyToHeadings(element);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
