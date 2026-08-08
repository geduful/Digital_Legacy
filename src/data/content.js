import {
  Heart,
  HeartHandshake,
  Lightbulb,
  Flower2,
  Compass,
  Clock,
  HeartPulse,
  Dumbbell,
  Sparkles,
} from 'lucide-react'

// ------------------------------------------------------------------
// CENTRAL CONTENT — all editable text lives here.
// ------------------------------------------------------------------

export const site = {
  name: 'Prince Albert Koomson',
  initials: 'PAK',
}

export const navLinks = [
  { id: 'home', label: 'Birthday' },
  { id: 'message', label: 'Letter' },
  { id: 'memories', label: 'Memories' },
  { id: 'video', label: 'Video' },
  { id: 'wish', label: 'Wish' },
]

// Surprise intro sequence shown before the website begins.
export const intro = {
  messages: [
    'Someone prepared something special for you...',
    'Happy Birthday, Prince Albert Koomson.',
  ],
}

export const hero = {
  eyebrow: 'A Celebration Made With Love',
  greeting: 'Happy Birthday',
  name: 'Prince Albert Koomson',
  line1: 'Today isn\'t about titles.',
  line2: 'Today is about celebrating you.',
  cta: 'Begin The Celebration',
}

export const letter = {
  eyebrow: 'Our Birthday Message',
  title: 'From Our Hearts',
  salutation: 'Dear Prince Albert Koomson,',
  paragraphs: [
    'Today, we simply want to say what our hearts have always known.',
    'Thank you for your kindness, your wisdom, and the quiet strength you have given us all our lives. You have supported us, encouraged us, and believed in us — often before we believed in ourselves. You remain our greatest example and our safest place.',
    'You have taught us that true greatness is gentle, that real leadership serves, and that love is something you do, not something you say.',
    'As you step into another beautiful year, may joy find you daily, may health never leave you, and may peace stay close to your heart.',
    'Happy birthday, Dad. You are loved, deeply and always.',
  ],
  closing: 'With all our love,',
  signature: 'Godfred & Family',
  seal: 'P.A.K',
  note: 'No long speeches. Just this — we love you.',
}

export const memories = {
  eyebrow: 'Our Favourite Memories',
  title: 'Moments We Treasure',
  intro: 'Six photographs. Six stories. All of them, you.',
  captions: {
    '1': 'The smile we carry with us.',
    '2': 'A memory we\'ll always treasure.',
    '3': 'Every moment with you, golden.',
    '4': 'Joy, simply by being together.',
    '5': 'The years, beautifully lived.',
    '6': 'Laughter that never fades.',
  },
  emptyTitle: 'Photographs Coming Soon',
  emptyText: 'Our favourite memories are finding their way into this album.',
}

export const reasons = {
  eyebrow: 'Why We Celebrate You',
  title: 'Why We Celebrate You',
  intro: 'Tap a card to see why.',
  items: [
    {
      icon: Heart,
      title: 'Kind',
      detail: 'You care in ways most people never see.',
    },
    {
      icon: HeartHandshake,
      title: 'Supportive',
      detail: 'You are our first call and our firmest anchor.',
    },
    {
      icon: Lightbulb,
      title: 'Wise',
      detail: 'Your advice has carried us through every season.',
    },
    {
      icon: Flower2,
      title: 'Humble',
      detail: 'You do so much, and say so little about it.',
    },
    {
      icon: Compass,
      title: 'Inspiring',
      detail: 'Your example makes us want to be better.',
    },
    {
      icon: Clock,
      title: 'Always Present',
      detail: 'Through everything, you have always been there.',
    },
  ],
}

export const video = {
  eyebrow: 'Birthday Video',
  title: 'A Celebration In Motion',
  placeholder:
    'A short birthday film, made with love, will premiere here soon.',
  // Add your film to  public/videos/  — e.g.  tribute.mp4 — and it
  // plays in the cinematic player below.
  videoUrl: '', // Set to '/videos/tribute.mp4' once public/videos/tribute.mp4 is added.
}

export const finalWish = {
  eyebrow: 'Final Birthday Wish',
  heading: 'Happy Birthday',
  name: 'Prince Albert Koomson',
  thanks: 'Thank you for being such an incredible part of our lives.',
  blessingsTitle: 'May God continue to bless you with',
  blessings: [
    { icon: Heart, label: 'Joy' },
    { icon: Flower2, label: 'Peace' },
    { icon: Dumbbell, label: 'Strength' },
    { icon: HeartPulse, label: 'Good Health' },
    { icon: Sparkles, label: 'Many beautiful years ahead' },
  ],
  signature: 'With Love,',
  signatureName: 'Godfred & Family',
  footer: 'Happy Birthday, Prince Albert Koomson',
}

export const music = {
  // Add a melody to  public/music/  and set its filename here.
  // Music never autoplays — visitors choose to listen.
  src: '/music/birthday-melody.mp3',
  label: 'Birthday melody',
  hint: 'Tap here for a birthday melody',
  comingSoon: 'A birthday melody is being prepared.',
}
