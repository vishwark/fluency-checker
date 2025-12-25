import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { PARAGRAPHS } from '../../data/paragraphs'
import ReadingSession from '../ReadingSession'
import '../../App.css'

export default function SelectDefaultFlow({ onBack, isDark }) {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [isReading, setIsReading] = useState(false)

  if (isReading && selectedLevel) {
    return (
      <ReadingSession
        paragraph={PARAGRAPHS[selectedLevel - 1]}
        level={selectedLevel}
        onBack={() => {
          setIsReading(false)
          setSelectedLevel(null)
        }}
        isDark={isDark}
      />
    )
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Select a Level</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose a difficulty level to start practicing. Each level contains a unique paragraph designed to improve your fluency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PARAGRAPHS.map((para, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer"
            onClick={() => {
              setSelectedLevel(index + 1)
              setIsReading(true)
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold">Level {index + 1}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {para.difficulty}
                </p>
              </div>
              <span className="text-2xl">{para.emoji}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {para.text}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>{para.wordCount} words</span>
              <span>{para.estimatedTime} min</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
