import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FlowPage from './pages/FlowPage'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    // Apply dark mode class to document
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/flow" element={<FlowPage isDark={isDark} setIsDark={setIsDark} />} />
      </Routes>
    </Router>
  )
}

export default App
