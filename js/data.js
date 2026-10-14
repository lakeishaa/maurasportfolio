/* =========================================
   MAURA PORTFOLIO — PROJECT DATA
========================================= */

/*
  Add your images and videos inside /assets.

  Example:
  cover: "assets/fanta/cover.jpg"

  Empty paths will remain placeholders.

  The order below determines the order
  projects appear on the homepage.
*/

window.PORTFOLIO = [
  /* ======================================
       01. BASKIN-ROBBINS X IF
    ====================================== */

  {
    slug: "baskin-if",
    brand: "Baskin-Robbins X IF",
    tagline: "Treat Your Imagination",

    cover: "assets/baskin-if/cover.gif",
    shape: "portrait",

    hoverImages: [
      "assets/baskin-if/cover.gif",
      "assets/baskin-if/landing/1.png",
      "assets/baskin-if/landing/2.png",
      "assets/baskin-if/landing/3.png",
      "assets/baskin-if/landing/4.png",
      "assets/baskin-if/landing/5.png",
      "assets/baskin-if/landing/6.jpg",
    ],

    intro: `Our brains are in adulting mode 24/7. That leaves barely any time for our inner child to play.

    Introducing, Treat Your Imagination 🍨🌈
    
    In partnership with Paramount Pictures and John Krasinski's <a href="https://www.imdb.com/title/tt11152168/" target="_blank" rel="noopener noreferrer">IF</a>, I helped create an integrated campaign that brought imaginary friends (or IFs) into the real world—all with the help of Baskin-Robbins ice cream.`,

    hero: {
      // type: "youtube",
      // id: "2yj6B2XVt7M", // Main campaign YouTube video ID
      // autoplay: true,
      // muted: true,
      // loop: true,

      type: "video",
      src: "assets/baskin-if/video-1.mp4",
      label: "",
      // ratio: "wide",
      autoplay: true,
      // muted: true,
      loop: true,
      // controls: true,
    },

    press: [
      {
        title: "Mashed",
        url: "https://www.mashed.com/1574149/baskin-robbins-new-menu-inspired-if-movie/",
      },
      {
        title: "KTLA5",
        url: "https://ktla.com/video/if-partners-with-baskin-robbins-to-treat-your-imagination-and-taste-buds/9662877/",
      },
      {
        title: "Nasdaq",
        url: "https://www.nasdaq.com/press-release/treat-your-imagination-with-baskin-robbins-exclusive-if-movie-menu-2024-05-01",
      },
      {
        title: "Food World News",
        url: "https://www.foodworldnews.com/articles/70845/20240507/bring-imagination-life-baskin-robbins-movie-experience.htm",
      },
      {
        title: "Comic Book",
        url: "https://comicbook.com/movies/news/if-movie-website-imaginary-friends-generator/",
      },
    ],

    links: [
      // { title: "Campaign website", url: "https://..." },
    ],

    sections: [
      {
        title: "TV/OLV Spots",
        description: "",
        media: [
          {
            // type: "youtube",
            // id: "v2GiAfEaVfc",
            // ratio: "wide",
            // title: "",
            // description: "",
            type: "video",
            src: "assets/baskin-if/tv/video-1.mp4",
            label: "",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            // type: "youtube",
            // id: "-cYY2rxZFZg",
            // ratio: "wide",
            // title: "",
            // description: "",
            type: "video",
            src: "assets/baskin-if/tv/video-2.mp4",
            label: "",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
        ],
      },

      {
        title: "4D Photo Booth",
        description: `I helped create a 4D photo booth for fans to immerse in the world of IF. With Baskin-Robbins' ice cream and our pink spoon, fans unlocked the magic: the IFs greeted them via seat rumbles, a sneeze and more surprises.`,
        // media: [
        //   // 6 images
        //   ...Array.from({ length: 6 }, (_, i) => ({
        //     type: "image",
        //     src: "",
        //     label: `Photo Booth Image ${i + 1}`,
        //     ratio: "portrait",
        //   })),

        //   // 3 videos initially; add up to 5
        //   ...Array.from({ length: 3 }, (_, i) => ({
        //     type: "video",
        //     src: "",
        //     label: `Photo Booth Video ${i + 1}`,
        //     ratio: "portrait",
        //   })),
        // ],
        media: [
          // IMAGE 1
          {
            type: "image",
            src: "assets/baskin-if/4d/image-1.png",
            ratio: "portrait",
          },

          // VIDEO 1
          // {
          //   type: "video",
          //   src: "assets/baskin-if/4d/video-1.mp4",
          //   ratio: "portrait",
          // },

          // IMAGE 2
          {
            type: "image",
            src: "assets/baskin-if/landing/6.jpg",
            ratio: "portrait",
          },

          // VIDEO 2
          // {
          //   type: "video",
          //   src: "assets/baskin-if/4d/video-2.mp4",
          //   ratio: "wide",
          // },

          // IMAGE 3
          {
            type: "image",
            src: "assets/baskin-if/landing/3.png",
            ratio: "portrait",
          },

          {
            type: "image",
            src: "assets/baskin-if/4d/image-2.png",
            ratio: "portrait",
          },

          {
            type: "image",
            src: "assets/baskin-if/landing/2.png",
            ratio: "portrait",
          },

          {
            type: "image",
            src: "assets/baskin-if/4d/image-3.png",
            ratio: "portrait",
          },
        ],
      },

      {
        title: "Imagination Station",
        description: ` The magic doesn't stop there. Fans created their own IFs through our <a href="https://www.imdb.com/title/tt11152168/" target="_blank" rel="noopener noreferrer">IF Generator</a>, powered by Baskin-Robbins. Not one IF looked the same.`,
        media: [
          {
            type: "video",
            src: "assets/baskin-if/imagination-station/video-1.mp4",
            label: "Imagination Station Video",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "image",
            src: "assets/baskin-if/imagination-station/image-1.png",
            label: "Imagination Station Image",
            ratio: "wide",
          },
        ],
      },

      {
        title: "Social Takeover",
        description: "",
        media: [
          // ...Array.from({ length: 4 }, (_, i) => ({
          //   type: "video",
          //   src: "",
          //   label: `Social Takeover Video ${i + 1}`,
          //   ratio: "portrait",
          // })),
          {
            type: "video",
            src: "assets/baskin-if/social/video-1.mp4",
            label: "Imagination Station Video",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/baskin-if/social/video-2.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/baskin-if/social/video-3.mp4",
            label: "Imagination Station Video",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/baskin-if/social/video-4.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
        ],
      },
    ],

    credits: [
      { role: "Agency", name: "22Squared" },
      { role: "Group Creative Director", name: "Rocío Alvarado" },
      { role: "Senior Art Director", name: "Ryan Bailey" },
      { role: "Senior Copywriter", name: "Me!" },
      { role: "Junior Art Director", name: "Jeremiah Adeola" },
      { role: "Junior Copywriterr", name: "Dana Gross" },
      { role: "Producer", name: "Dana Taji" },
      { role: "Production House", name: "Unicorns & Unicorns" },
      { role: "Director", name: "John Poliquin" },
    ],
  },

  /* ======================================
       02. VENMO
    ====================================== */

  {
    slug: "venmo",
    brand: "Venmo",
    tagline: "Social At Venmo",

    cover: "assets/venmo/cover.jpg",
    shape: "large",

    hoverImages: [
      "assets/venmo/cover.jpg",
      "assets/venmo/landing/1.png",
      "assets/venmo/landing/2.png",
      "assets/venmo/landing/3.png",
      "assets/venmo/landing/4.png",
      "assets/venmo/landing/5.png",
      "assets/venmo/landing/6.png",
      "assets/venmo/landing/7.png",
      "assets/venmo/landing/8.png",
    ],

    intro:
      "Money stress is real for Zillennials. But Venmo believed it didn't have to be.\n\nWe created zesty and playful organic social content that turned Venmo into a destination for feel-good money—no matter what transaction you're making.",

    sections: [
      {
        title: "IRL Content",
        layout: "social",
        media: [
          {
            type: "image",
            src: "assets/venmo/irl-content/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-3.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-4.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-5.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-6.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-7.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-8.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/irl-content/image-9.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "Meme Content",
        layout: "social",
        media: [
          {
            type: "image",
            src: "assets/venmo/meme-content/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/meme-content/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/meme-content/image-3.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/meme-content/image-4.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/meme-content/image-5.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/meme-content/image-6.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "Vibey Content",
        layout: "social",
        media: [
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-3.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-4.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-5.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-6.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-7.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-8.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/venmo/vibey-content/image-9.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "Twitter",
        layout: "social",
        media: [],
      },
    ],

    credits: [
      { role: "Agency", name: "Swift" },
      { role: "Creative Directors", name: "Annie Vieira & Kate Gates" },
      { role: "Senior Copywriter", name: "Me!" },
      { role: "Designers", name: "Ryan Michael & Taylor Franklin " },
    ],
  },

  /* ======================================
       03. FANTA
    ====================================== */

  {
    slug: "fanta",
    brand: "Fanta",
    tagline: "Undeniably Fᶦᶻᶻing Delicious",

    cover: "assets/fanta/cover.gif",
    shape: "portrait",

    hoverImages: [
      "assets/fanta/cover.gif",
      //   "assets/fanta/landing/1.jpg",
      "assets/fanta/landing/2.png",
      //   "assets/fanta/landing/3.png",
      "assets/fanta/landing/4.png",
      //   "assets/fanta/landing/5.jpg",
      "assets/fanta/landing/6.jpg",
      "assets/fanta/landing/7.png",
      "assets/fanta/landing/8.jpg",
      "assets/fanta/landing/9.jpg",
      "assets/fanta/landing/10.gif",
    ],

    intro:
      "The world is draining online and offline. But Gen Z is still craving ways to tap back into fun. Fanta’s role on social media? To infuse indulgent escapes into the scroll by being undeniably fᶦᶻᶻing delicious.\n\nI created always-on content, jumped on real-time trends, and experimented with new features to keep our fans hooked on everything Fanta.",

    sections: [
      {
        title: "IG Posts",
        layout: "social",
        media: [
          {
            type: "video",
            src: "assets/fanta/instagram/video-1.mp4",
            label: "",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/fanta/instagram/video-2.mp4",
            label: "Imagination Station Video",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/fanta/instagram/video-3.mp4",
            label: "Imagination Station Image",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
        ],
      },
      {
        title: "TikTok Posts",
        layout: "social",
        media: [
          {
            type: "video",
            src: "assets/fanta/tiktok/video-1.mp4",
            label: "Imagination Station Image",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/fanta/tiktok/video-2.mp4",
            label: "Imagination Station Video",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/fanta/tiktok/video-3.mp4",
            label: "Imagination Station Image",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/fanta/tiktok/video-4.mp4",
            label: "Imagination Station Video",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/fanta/tiktok/video-5.mp4",
            label: "Imagination Station Image",
            ratio: "portrait",
            autoplay: true,
            muted: true,
            loop: true,
          },
        ],
      },
      {
        title: "Threads Posts",
        layout: "social",
        media: [],
      },
      {
        title: "IG Broadcast & More",
        layout: "social",
        media: [
          {
            type: "image",
            src: "assets/fanta/more/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/fanta/more/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/fanta/landing/7.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/fanta/more/image-3.gif",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/fanta/more/image-5.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/fanta/more/image-4.png",
            ratio: "portrait",
          },
        ],
      },
    ],

    credits: [
      { role: "Agency", name: "Ogilvy" },
      { role: "Creative Director", name: "Christa Felton" },
      { role: "ACD Art", name: "Sofia Rembalsky" },
      { role: "ACD Copy", name: "Allison Macintosh" },
      { role: "Sr. Content Creator (Copy)", name: "Me!" },
      { role: "Junior Copywriterr", name: "Dana Gross" },
      {
        role: "Sr. Content Creators (Art)",
        name: "Helen Ratner, Smitee Oberoi, Jamar Callender",
      },
    ],
  },

  /* ======================================
       04. BASKIN-ROBBINS
    ====================================== */

  {
    slug: "baskin",
    brand: "Baskin-Robbins",
    tagline: "A World of Flavors",

    cover: "assets/baskin/cover.gif",
    shape: "landscape",

    hoverImages: [
      "assets/baskin/cover.gif",
      "assets/baskin/landing/1.png",
      "assets/baskin/landing/2.png",
      "assets/baskin/landing/3.png",
      "assets/baskin/landing/4.png",
      "assets/baskin/landing/5.png",
      "assets/baskin/landing/6.png",
    ],

    intro:
      "As a flavor powerhouse, Baskin-Robbins needed flavor campaigns that matched their delicious craft. I developed flavor personas for new flavors every month and created social-first work to reach ice cream fans (and their cravings) nationwide.",

    press: [
      // put in
      {
        title: "EDIT THIS Only for Sweet on Sydney Campaign",
        url: "https://",
      },
      {
        title: "Hollywood Reporter",
        url: "https://www.hollywoodreporter.com/lifestyle/lifestyle-news/sydney-sweeney-baskin-robbins-ice-cream-collaboration-1236300838/",
      },
      {
        title: "Hypebae",
        url: "https://hypebae.com/2025/7/laneige-sydney-sweeney-baskin-robbins-collaboration-rainbow-sherbet-lip-sleeping-mask-where-to-buy",
      },
      {
        title: " Sports Illustrated",
        url: "https://lifestyle.si.com/fashion-beauty/sydney-sweeney-pretty-in-pink-new-baskin-robbins-collab",
      },
      {
        title: "Daily Mail",
        url: "https://www.dailymail.com/yourmoney/consumer/article-14839951/ice-cream-chain-limited-edition-menu-sydney-sweeney-baskin-robbins.html",
      },
      {
        title: "Elite Daily",
        url: "https://www.elitedaily.com/lifestyle/baskin-robbins-sydney-sweeney-menu-review",
      },
    ],
    sections: [
      {
        title: "Trolli Sour Blast",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/baskin/trolli/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/trolli/image-2.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "Sweet on Sydney",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/baskin/sydney/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/sydney/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/sydney/image-3.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/sydney/image-4.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/sydney/image-6.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/sydney/image-5.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "Island Sips",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/baskin/island/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-3.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-4.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-5.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-6.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-7.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-8.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/island/image-9.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "Galactic Brownie",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/baskin/galactic/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/galactic/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/galactic/image-3.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/baskin/galactic/image-4.png",
            ratio: "portrait",
          },
        ],
      },
    ],

    credits: [
      { role: "Agency", name: "22Squared" },
      { role: "ECD", name: "Della Mathew" },
      { role: "Senior Art Director", name: "Ryan Bailey" },
      { role: "Senior Copywriter", name: "Me!" },
      { role: "Senior Designer", name: "Chris Thompson" },
      { role: "Producer", name: "Lori Lawery " },
      { role: "Production House", name: "Yacht Club" },
      { role: "Director", name: "Matt Morgan" },
    ],
  },

  /* ======================================
       05. WALMART
    ====================================== */

  {
    slug: "walmart",
    brand: "Walmart",
    tagline: "Your Next Era",

    cover: "assets/walmart/cover.jpg",
    shape: "portrait",

    hoverImages: [
      "assets/walmart/cover.jpg",
      "assets/walmart/landing/1.png",
      "assets/walmart/landing/2.png",
      "assets/walmart/landing/3.png",
      "assets/walmart/landing/4.png",
      "assets/walmart/landing/5.png",
    ],

    intro:
      "Good bye winter hermitting. Hello to your next era. \n\n For Walmart’s spring campaign in 2024, we channeled big new year, new me energy through 6 paid social spots—all shot with an iPhone.\n\n Whether you’re becoming a pro pet parent or a proud homebody, we showed how Walmart can be your partner in your next era. ",

    hero: {
      type: "video",
      src: "assets/walmart/video-1.mp4",
      label: "Hero Video",
      ratio: "wide",
      autoplay: true,
      loop: true,
    },

    sections: [
      {
        title: "Campaign Films",
        layout: "media",
        media: [
          {
            type: "video",
            src: "assets/walmart/video-1.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/walmart/video-2.mp4",
            label: "Imagination Station Video",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/walmart/video-3.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/walmart/video-4.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/walmart/video-5.mp4",
            label: "Imagination Station Video",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/walmart/video-6.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
        ],
      },
    ],

    credits: [
      { role: "Agency", name: "DeptW (Digitas, Publicis NY)" },
      { role: "Creative Directors", name: "Mark Snow & Mai Nakamura" },
      { role: "Art Director", name: " Alessandra Divizia" },
      { role: "Copywriter", name: "Me!" },
      { role: "Producer", name: "Peter McCann" },
      { role: "Production House", name: "Station Film" },
      { role: "Director", name: "Lena Beug" },
    ],
  },

  /* ======================================
       06. MERRILL
    ====================================== */

  {
    slug: "merrill",
    brand: "Merrill",
    tagline: "Can't Stop Banking",

    cover: "assets/merrill/cover.jpg",
    shape: "landscape",

    hoverImages: [
      "assets/merrill/cover.jpg",
      "assets/merrill/landing/1.png",
      "assets/merrill/landing/2.png",
      "assets/merrill/landing/3.png",
      "assets/merrill/landing/4.jpg",
      "assets/merrill/landing/5.png",
    ],

    intro:
      "In the sea of shiny investment banks, Merrill might be seen as the stodgy option. But in reality, their digital tools are way ahead of the curve. \n\n To show just how powerful their digital tools are, I wrote three spots that tapped into everyone's habit of being on their phones, yet doing what you least expect—banking.",

    sections: [
      {
        title: "Campaign Films",
        layout: "media",
        media: [
          {
            type: "video",
            src: "assets/merrill/video-1.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/merrill/video-2.mp4",
            label: "Imagination Station Video",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/merrill/video-3.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
          {
            type: "video",
            src: "assets/merrill/video-4.mp4",
            label: "Imagination Station Image",
            ratio: "wide",
            autoplay: true,
            muted: true,
            loop: true,
          },
        ],
      },
    ],

    credits: [
      { role: "Agency", name: "GroupeConnect (A Publicis Company)" },
      {
        role: "Creative Directors",
        name: "George Apfelbach & Hache Hernandez",
      },
      { role: "ACDs", name: "Carly Drown, Tanya Saliba" },
      { role: "Copywriter", name: "Me!" },
      { role: "Art Director", name: "Aarti Thamma" },
    ],
  },

  /* ======================================
       07. CIRCLE
    ====================================== */

  {
    slug: "circle",
    brand: "Circle",
    tagline: "Meet Circle",

    cover: "assets/circle/cover.jpg",
    shape: "portrait",

    hoverImages: [
      "assets/circle/cover.jpg",
      "assets/circle/landing/1.jpg",
      "assets/circle/landing/2.png",
      "assets/circle/landing/3.png",
      "assets/circle/landing/4.png",
      "assets/circle/landing/5.png",
      "assets/circle/landing/6.png",
    ],

    intro:
      "To build a more inclusive financial future, Circle is the bridge that brings two incompatible things together. \n\n Between traditional and digital currencies. Between banking and blockchain. Between today and tomorrow. \n\n I helped build an awareness campaign that took place in the space between, because that's where Circle lives. For entrepreneurs, developers, and creators to build for the future.",

    sections: [
      {
        title: "Main Look & Feel",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/circle/main/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/circle/main/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/circle/main/image-3.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "OOH Placements",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/circle/ooh/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/circle/ooh/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/circle/ooh/image-3.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/circle/ooh/image-4.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/circle/ooh/image-5.png",
            ratio: "portrait",
          },
        ],
      },
      {
        title: "Print Ads",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/circle/print/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/circle/print/image-2.png",
            ratio: "portrait",
          },
        ],
      },
    ],

    credits: [
      { role: "Agency", name: "Performance Art" },
      {
        role: "Creative Directors",
        name: "Paul Fung & Omar Dbeis",
      },
      { role: "Art Director", name: "Benny Brickner" },
      { role: "Copywriter", name: "Me!" },
      { role: "Production Company", name: "Preymaker" },
    ],
  },

  /* ======================================
       08. PROTEST POSTER
    ====================================== */

  {
    slug: "protest-poster",
    brand: "Protest Poster",
    tagline: "Affordable. But Unlivable.",

    cover: "assets/protest/cover.jpg",
    shape: "portrait",

    hoverImages: ["assets/protest/cover.jpg", "assets/protest/landing/1.jpg"],

    intro:
      'To address the issue of homelessness in the United States, we designed a poster that replicates the essence and style of furniture ads, yet "selling" the lifestyle that no one would dream of living. \n\n Because living unhoused is affordable, but unlivable.\n\n Won a <a href="https://graphis.com/account/login?redirect=%2Fcompetitions%2Fawards&search=maura+munaf/" target="_blank" rel="noopener noreferrer">Graphis Silver Award</a>.',

    press: [
      {
        title: "Campaigns Of The World",
        url: "https://campaignsoftheworld.com/creative-print-ads/homelessness-awareness-unlivable/",
      },
      {
        title: "AdStasher",
        url: "https://www.adstasher.com/2021/12/affordable-but-unlivable-campaign-wins.html",
      },
      {
        title: "Voice of America",
        url: "https://www.voaindonesia.com/a/angkat-isu-tuna-wisma-maura-munaf-menang-kompetisi-desain-poster-di-as/6410622.html",
      },
    ],
    sections: [
      {
        title: "Poster Design",
        layout: "editorial",
        media: [
          {
            type: "image",
            src: "assets/protest/image-1.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/protest/image-2.png",
            ratio: "portrait",
          },
          {
            type: "image",
            src: "assets/protest/image-3.png",
            ratio: "portrait",
          },
        ],
      },
    ],
    credits: [
      { role: "Art Director", name: "Allie Phelan" },
      { role: "Copywriter", name: "Me!" },
    ],
  },
];
