import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import AmbientBackground from './components/AmbientBackground'
import Spotlight from './components/Spotlight'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Below-the-fold sections are code-split: the critical hero experience
// mounts immediately, everything else streams in as needed.
const BirthdayLetter = lazy(() => import('./components/BirthdayLetter'))
const Gallery = lazy(() => import('./components/Gallery'))
const Reasons = lazy(() => import('./components/Reasons'))
const VideoSection = lazy(() => import('./components/VideoSection'))
const FinalWish = lazy(() => import('./components/FinalWish'))

function App() {
  const [ready, setReady] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen bg-midnight text-mist-50">
        <AmbientBackground />
        <Spotlight />
        <ScrollProgress />

        {/* The whole experience mounts immediately — the intro splash
            simply layers on top while images warm up underneath. */}
        <Navbar />
        <main className="relative z-10">
          <Hero start={ready} />
          <Suspense fallback={null}>
            <BirthdayLetter />
            <Gallery />
            <Reasons />
            <VideoSection />
            <FinalWish />
          </Suspense>
        </main>

        <AnimatePresence>
          {!ready && <LoadingScreen onComplete={() => setReady(true)} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

export default App