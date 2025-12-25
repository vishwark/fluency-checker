import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, RotateCcw, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { gsap } from 'gsap'
import ResultsModal from './ResultsModal'
import '../App.css'

export default function ReadingSession({ paragraph, level, onBack, isDark }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recognizedText, setRecognizedText] = useState('')
  const [highlightedWords, setHighlightedWords] = useState(new Set())
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [showSpokenText, setShowSpokenText] = useState(window.innerWidth >= 1024)

  const recognitionRef = useRef(null)
  const timerRef = useRef(null)
  const paragraphRef = useRef(null)
  const accumulatedTextRef = useRef('')

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error('Speech Recognition API not supported in this browser')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onstart = () => {
      setIsRecording(true)
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }

    recognitionRef.current.onresult = (event) => {
      let interim = ''
      let final = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript || ''
        if (event.results[i].isFinal) {
          final += transcript + ' '
          accumulatedTextRef.current += transcript + ' '
        } else {
          interim += transcript
        }
      }

      const fullText = (accumulatedTextRef.current + interim).trim()
      if (fullText) {
        setRecognizedText(fullText)
        // Calculate accuracy and highlight words
        updateHighlighting(fullText)
      }
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
    }

    recognitionRef.current.onend = () => {
      setIsRecording(false)
      clearInterval(timerRef.current)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      clearInterval(timerRef.current)
    }
  }, [])

  const updateHighlighting = (recognized) => {
    const paragraphWords = paragraph.text.toLowerCase().split(/\s+/)
    const recognizedWords = recognized.toLowerCase().split(/\s+/)

    let matchedCount = 0
    const highlighted = new Set()

    recognizedWords.forEach((word) => {
      const cleanWord = word.replace(/[.,!?;:]/g, '')
      paragraphWords.forEach((pWord, idx) => {
        const cleanPWord = pWord.replace(/[.,!?;:]/g, '')
        if (cleanWord === cleanPWord && !highlighted.has(idx)) {
          highlighted.add(idx)
          matchedCount++
        }
      })
    })

    setHighlightedWords(highlighted)
    const acc = Math.round((matchedCount / paragraphWords.length) * 100)
    setAccuracy(acc)
  }

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      setRecognizedText('')
      accumulatedTextRef.current = ''
      setHighlightedWords(new Set())
      setElapsedTime(0)
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
      }
    }
  }

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleEvaluate = () => {
    // Stop recording if still active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
    }

    const paragraphWords = paragraph.text.toLowerCase().split(/\s+/)
    const recognizedWords = recognizedText.toLowerCase().split(/\s+/)

    const matchedWords = []
    const missedWords = []

    paragraphWords.forEach((word) => {
      const cleanWord = word.replace(/[.,!?;:]/g, '')
      const found = recognizedWords.some(
        (rWord) => rWord.replace(/[.,!?;:]/g, '') === cleanWord
      )
      if (found) {
        matchedWords.push(word)
      } else {
        missedWords.push(word)
      }
    })

    const finalAccuracy = Math.round((matchedWords.length / paragraphWords.length) * 100)
    const fluency = Math.round((paragraphWords.length / (elapsedTime || 1)) * 60)

    setResults({
      accuracy: finalAccuracy,
      fluency,
      matchedWords,
      missedWords,
      totalWords: paragraphWords.length,
      recognizedWords: recognizedWords.length,
      elapsedTime,
    })

    setShowResults(true)
  }

  const handleReset = () => {
    setRecognizedText('')
    accumulatedTextRef.current = ''
    setHighlightedWords(new Set())
    setElapsedTime(0)
    setAccuracy(0)
    setShowResults(false)
    setResults(null)
  }

  if (!paragraph || !paragraph.text) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading paragraph...</p>
      </div>
    )
  }

  const paragraphWords = paragraph.text.split(/\s+/)

  return (
    <div className="w-full flex flex-col bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden relative">
      {/* Header - Compact Stats */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Level {level}</h2>
            <div className="flex gap-4 sm:gap-8 text-center">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Time</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{elapsedTime}s</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Words</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{paragraph.wordCount || paragraphWords.length}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">{accuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Paragraph Area - Fixed Height */}
      <div className="h-96 sm:h-[80%] lg:h-auto lg:flex-1 overflow-y-auto min-h-0 bg-gray-50 dark:bg-black/50">
        <div className="w-full p-4 sm:p-8">
          <div
            ref={paragraphRef}
            className="p-6 sm:p-2 rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-black/80 shadow-lg"
          >
            <p className="text-lg sm:text-2xl leading-relaxed text-black dark:text-gray-200 text-center">
              {paragraphWords.map((word, idx) => (
                <span
                  key={idx}
                  className={`transition-all duration-300 ${
                    highlightedWords.has(idx)
                      ? 'word-highlight bg-blue-200 dark:bg-blue-800'
                      : ''
                  }`}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          {/* Collapsible Recognized Text */}
          {recognizedText && (
            <div className="mt-6 w-full">
              <button
                onClick={() => setShowSpokenText(!showSpokenText)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <h3 className="font-bold text-sm sm:text-base text-green-900 dark:text-green-100">
                  See what you spoke
                </h3>
                {showSpokenText ? (
                  <ChevronUp size={20} className="text-green-900 dark:text-green-100" />
                ) : (
                  <ChevronDown size={20} className="text-green-900 dark:text-green-100" />
                )}
              </button>
              {showSpokenText && (
                <div className="mt-2 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
                  <p className="text-sm sm:text-base text-green-800 dark:text-green-200 leading-relaxed">{recognizedText}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Controls - Floating on Mobile */}
      <div className="hidden sm:block bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl"
              >
                <Mic size={18} />
                Start
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl pulse-dot"
              >
                <MicOff size={18} />
                Stop
              </button>
            )}

            {recognizedText && (
              <button
                onClick={handleEvaluate}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl"
              >
                <Check size={18} />
                Evaluate
              </button>
            )}

            {recognizedText && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Controls - Mobile Only */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 flex gap-2 flex-wrap justify-center">
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl"
          >
            <Mic size={18} />
            Start
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl pulse-dot"
          >
            <MicOff size={18} />
            Stop
          </button>
        )}

        {recognizedText && (
          <button
            onClick={handleEvaluate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl"
          >
            <Check size={18} />
            Evaluate
          </button>
        )}

        {recognizedText && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold text-sm"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        )}
      </div>

      {/* Results Modal */}
      {showResults && results && (
        <ResultsModal
          results={results}
          onClose={() => setShowResults(false)}
          onReset={handleReset}
          isDark={isDark}
        />
      )}
    </div>
  )
}
