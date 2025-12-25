import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import ReadingSession from '../ReadingSession'
import '../../App.css'

export default function PasteContentFlow({ onBack, isDark }) {
  const [content, setContent] = useState('')
  const [isEditing, setIsEditing] = useState(true)
  const [isReading, setIsReading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setContent(text)
    } catch (err) {
      alert('Failed to read clipboard. Please paste manually.')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartReading = () => {
    if (content.trim().length < 20) {
      alert('Please paste at least 20 characters of content.')
      return
    }
    setIsEditing(false)
    setIsReading(true)
  }

  if (isReading) {
    return (
      <ReadingSession
        paragraph={{ text: content, wordCount: content.split(/\s+/).length }}
        level="Custom"
        onBack={() => {
          setIsReading(false)
          setIsEditing(true)
        }}
        isDark={isDark}
      />
    )
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Paste Your Content</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Paste any content from websites, articles, or documents. You can edit it before starting to practice.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Paste Area */}
        <div className="relative">
          <label className="block text-lg font-bold mb-3 text-gray-900 dark:text-white">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!isEditing}
            placeholder="Paste your content here... (minimum 20 characters)"
            className={`w-full h-80 p-6 rounded-2xl border-2 resize-none focus:outline-none transition-all text-base text-gray-900 dark:text-white ${
              isEditing
                ? 'border-blue-300 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-900'
                : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 cursor-not-allowed'
            }`}
          />
          <div className="absolute top-10 right-4 flex gap-2">
            {isEditing && (
              <button
                onClick={handlePaste}
                className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                title="Paste from clipboard"
              >
                <Copy size={18} className="text-blue-600 dark:text-blue-400" />
              </button>
            )}
          </div>
        </div>

        {/* Word Count */}
        {content && (
          <div className="text-base text-gray-600 dark:text-gray-400 font-medium">
            <span>{content.split(/\s+/).filter(w => w).length} words</span>
            <span className="mx-3">•</span>
            <span>{content.length} characters</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 justify-center">
          {isEditing ? (
            <>
              <button
                onClick={() => setContent('')}
                className="px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
              >
                Clear
              </button>
              <button
                onClick={handleStartReading}
                disabled={content.trim().length < 20}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white transition-colors font-semibold"
              >
                Start Reading
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
              >
                Edit Content
              </button>
              <button
                onClick={handleCopy}
                className="px-8 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 font-semibold"
              >
                {copied ? (
                  <>
                    <Check size={20} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Copy
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 max-w-4xl mx-auto">
          <h4 className="font-bold text-lg mb-3 text-blue-900 dark:text-blue-100">Tips:</h4>
          <ul className="text-base text-blue-800 dark:text-blue-200 space-y-2">
            <li>• Copy content from news articles, blogs, or any website</li>
            <li>• Minimum 20 characters required to start</li>
            <li>• You can edit the content before practicing</li>
            <li>• Once you start reading, the content becomes read-only</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
