# Happy Birthday, Prince Albert Koomson

A surprise luxury birthday experience, created with love by **Godfred & Family**.
Designed to feel like opening a beautifully wrapped gift — not a website to be
read, but a feeling to be felt.

The whole experience is a short, mobile-first journey through **six screens**:

1. **Welcome** — full-screen portrait, "Happy Birthday", and a gentle surprise intro before the site begins
2. **Our Birthday Message** — one short, heartfelt letter (~130 words)
3. **Our Favourite Memories** — exactly six large photographs, one short caption each, premium lightbox
4. **Why We Celebrate You** — six glass cards; tap one to reveal a single sentence
5. **Birthday Video** — one cinematic player (placeholder until a film is added)
6. **Final Birthday Wish** — dark, emotional close with blessings and signature

Built with **React + Vite**, **Tailwind CSS**, **Framer Motion** and
**Lucide Icons**. Mobile-first, minimal, premium — no long text anywhere.

## Getting Started

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # lint with oxlint
```

## Adding Images

All images are managed from one place — no component edits needed.

1. Drop your photographs into **`src/assets/images/`** using the naming
   convention `1.jpg` … `6.jpg` (jpg, jpeg, png and webp are supported).
2. The central config in **`src/data/images.js`** maps files to their places:
   - `1.jpg` — welcome portrait
   - `2.jpg` — first memory & family photograph
   - `3–6.jpg` — favourite memories
   - `3.jpg` — also used as the video poster
3. Edit the one-line captions in **`src/data/memories.captions`**
   (`src/data/content.js`).

The site renders elegant placeholders wherever an image is still missing.

## Background Music

Music never autoplays. A discreet control sits in the navigation bar so the
visitor chooses whether to listen.

1. Add a melody to **`public/music/`** (e.g. `birthday-melody.mp3`).
2. Set `music.src` in `src/data/content.js` to `/music/birthday-melody.mp3`.

Until then, the control politely shows "coming soon".

## Editing Content

All copy lives in **`src/data/content.js`** — the surprise intro messages, hero
greeting, birthday letter, memory captions, reason cards, blessings and the
final signature.

## Birthday Video

Add a short film (60–90 seconds) to **`public/videos/`** (e.g. `tribute.mp4`)
and set `video.videoUrl` in `src/data/content.js`. Until then a premium
placeholder with a play button is shown.

## Deploying to Vercel

```bash
npm i -g vercel
vercel           # preview deployment
vercel --prod    # production
```

Vercel auto-detects Vite — no configuration required.
