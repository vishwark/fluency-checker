import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SelectDefaultFlow from '../components/flows/SelectDefaultFlow'
import PasteContentFlow from '../components/flows/PasteContentFlow'
import '../App.css'

export default function FlowPage({ isDark, setIsDark }) {
  const navigate = useNavigate()
  const [selectedFlow, setSelectedFlow] = useState(null)

  const handleBack = () => {
    if (selectedFlow) {
      setSelectedFlow(null)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar isDark={isDark} setIsDark={setIsDark} showBackButton={true} onBack={handleBack} />

      {/* Main Content */}
      <main className="pt-24 pb-12 sm:pb-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-96px)] sm:min-h-auto">
        <div className="max-w-6xl mx-auto">
          {!selectedFlow ? (
            // Flow Selection Screen
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center text-gray-90">
                Choose Your Practice Mode
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Select how you'd like to practice your fluency and pronunciation skills.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Select Default Card */}
                <div
                  onClick={() => setSelectedFlow('default')}
                  className="hover-lift p-8 rounded-2xl bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-gray-700 cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-4xl">📖</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Select Default</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Practice with our curated paragraphs from Level 1 to 10. Each level is designed to progressively improve your fluency.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ 10 difficulty levels</li>
                    <li>✓ Professionally written content</li>
                    <li>✓ Progressive difficulty</li>
                    <li>✓ Instant accuracy feedback</li>
                  </ul>
                </div>

                {/* Paste Content Card */}
                <div
                  onClick={() => setSelectedFlow('paste')}
                  className="hover-lift p-8 rounded-2xl bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-gray-700 cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-4xl">📝</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Paste Content</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Paste any content from websites or documents. Practice with your own material and get detailed feedback.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ Use your own content</li>
                    <li>✓ Copy from any website</li>
                    <li>✓ Edit before practicing</li>
                    <li>✓ Personalized feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : selectedFlow === 'default' ? (
            <SelectDefaultFlow onBack={() => setSelectedFlow(null)} isDark={isDark} />
          ) : (
            <PasteContentFlow onBack={() => setSelectedFlow(null)} isDark={isDark} />
          )}
        </div>
      </main>

      <Footer className="hidden sm:block" />
    </div>
  )
}
