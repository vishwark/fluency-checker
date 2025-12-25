export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 dark:text-gray-400">
          © 2024 FluentSpeak. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span>Made with</span>
          <span className="text-red-500">❤️</span>
          <span>for</span>
          <span className="text-2xl">🇮🇳</span>
        </div>
      </div>
    </footer>
  )
}
