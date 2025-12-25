import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowRight, Mic, BookOpen, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../App.css'

export default function HomePage({ isDark, setIsDark }) {
  const navigate = useNavigate()
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const buttonRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }

    // Animate description
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )
    }

    // Animate button
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: 'back.out' }
      )
    }

    // Animate features
    if (featuresRef.current) {
      const items = featuresRef.current.querySelectorAll('.feature-item')
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.6,
          ease: 'power3.out',
        }
      )
    }
  }, [])

  const handleStartClick = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.1 })
        navigate('/flow')
      },
    })
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <div ref={titleRef} className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4 text-gray-900 dark:text-white">
              <span className="hero-title block mb-2">Master Your</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200">
                Fluency & Pronunciation
              </span>
            </h1>
          </div>

          {/* Description */}
          <div ref={descRef} className="mb-12 max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-4 font-medium">
              Improve your English speaking skills with AI-powered fluency analysis. Get real-time feedback on your pronunciation, accuracy, and speaking pace.
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Choose from curated paragraphs or paste your own content to practice with.
            </p>
          </div>

          {/* CTA Button */}
          <div ref={buttonRef} className="mb-20 flex justify-center">
            <button
              onClick={handleStartClick}
              className="btn-primary group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 text-lg"
            >
              Start Practicing Now
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Features Grid */}
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="feature-item hover-lift p-8 rounded-2xl bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Accurate Feedback</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Get detailed analysis of your pronunciation and fluency with word-by-word accuracy metrics.
              </p>
            </div>

            <div className="feature-item hover-lift p-8 rounded-2xl bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <BookOpen size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Curated Content</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Practice with 10 levels of carefully designed paragraphs to progressively improve your skills.
              </p>
            </div>

            <div className="feature-item hover-lift p-8 rounded-2xl bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Mic size={32} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Real-time Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                See live feedback as you speak with visual highlighting and instant accuracy scoring.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-black/60 dark:to-black/40 rounded-3xl p-12 border-2 border-blue-200 dark:border-gray-700 shadow-lg">
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center md:text-left ">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                    1
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Choose Your Content</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Select from predefined paragraphs or paste your own content to practice with.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                    2
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Start Recording</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Click start and begin reading. Your voice is converted to text in real-time.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                    3
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Get Instant Feedback</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      See highlighted words and real-time accuracy metrics as you read.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                    4
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Review Results</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Get detailed accuracy scores and identify areas for improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
