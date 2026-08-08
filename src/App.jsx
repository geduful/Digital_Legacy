import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import AmbientBackground from './components/AmbientBackground'
import Spotlight from './components/Spotlight'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BirthdayLetter from './components/BirthdayLetter'
import Gallery from './components/Gallery'
import Reasons from './components/Reasons'
import VideoSection from './components/VideoSection'
import FinalWish from './components/FinalWish'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen bg-midnight text-mist-50">
        <AmbientBackground />
        <Spotlight />
        <ScrollProgress />

        <AnimatePresence>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <BirthdayLetter />
              <Gallery />
              <Reasons />
              <VideoSection />
              <FinalWish />
            </main>
          </>
        )}
      </div>
    </MotionConfig>
  )
}

export default App
