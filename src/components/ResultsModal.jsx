import { X, TrendingUp, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../App.css'

export default function ResultsModal({ results, onClose, onReset, isDark }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Animate modal entrance
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out' }
    )
  }, [])

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30'
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30'
    return 'bg-red-100 dark:bg-red-900/30'
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b-2 border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Your Results</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Score Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Accuracy */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${getScoreBg(results.accuracy)} border-2 border-opacity-50`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className={getScoreColor(results.accuracy)} />
                <span className="text-xs sm:text-sm font-bold text-black dark:text-gray-300">
                  Accuracy
                </span>
              </div>
              <div className={`text-3xl sm:text-4xl font-black ${getScoreColor(results.accuracy)}`}>
                {results.accuracy}%
              </div>
            </div>

            {/* Fluency */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${getScoreBg(results.fluency)} border-2 border-opacity-50`}>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className={getScoreColor(results.fluency)} />
                <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                  Fluency
                </span>
              </div>
              <div className={`text-3xl sm:text-4xl font-black ${getScoreColor(results.fluency)}`}>
                {results.fluency}
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1">words/min</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
              <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">
                {results.matchedWords.length}
              </p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Matched</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400 mb-1">
                {results.missedWords.length}
              </p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Missed</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
              <p className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">
                {results.elapsedTime}s
              </p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Time</p>
            </div>
          </div>

          {/* Missed Words */}
          {results.missedWords.length > 0 && (
            <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">Words to Practice:</h3>
                <button
                  onClick={() => {
                    const wordsText = results.missedWords.join(', ')
                    navigator.clipboard.writeText(wordsText)
                    alert('Words copied to clipboard!')
                  }}
                  className="px-3 py-1 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                >
                  Copy All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.missedWords.slice(0, 15).map((word, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold"
                  >
                    {word}
                  </span>
                ))}
                {results.missedWords.length > 15 && (
                  <span className="px-3 py-1 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                    +{results.missedWords.length - 15} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800">
            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
              {results.accuracy >= 80
                ? '🎉 Excellent! You read with great accuracy. Keep practicing to improve your fluency!'
                : results.accuracy >= 60
                ? '👍 Good effort! Focus on the missed words and try again to improve your accuracy.'
                : '💪 Keep practicing! Try reading more slowly and focus on pronunciation.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <button
              onClick={onReset}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
