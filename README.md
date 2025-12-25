# FluentSpeak - Fluency & Pronunciation Checker

A modern, AI-powered web application for testing and improving English fluency and pronunciation skills. Built with React, Vite, Tailwind CSS, and GSAP animations.

## 🎯 Features

### Home Page
- **Hero Animation**: Smooth text shimmer and stagger animations using GSAP
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Feature Showcase**: Highlights key benefits of the application
- **How It Works**: Step-by-step guide for users

### Practice Modes

#### 1. Select Default
- 10 difficulty levels (Beginner to Expert)
- Professionally written paragraphs
- Progressive difficulty increase
- Real-time accuracy feedback
- Word-by-word highlighting

#### 2. Paste Content
- Paste any content from websites or documents
- Edit content before practicing
- Support for custom material
- Personalized feedback

### Reading Session
- **Real-time Speech Recognition**: Uses Web Speech API for audio-to-text conversion
- **Live Word Highlighting**: Words are highlighted as they're recognized
- **Accuracy Tracking**: Real-time accuracy percentage display
- **Fluency Metrics**: Words per minute calculation
- **Visual Feedback**: Color-coded highlighting for matched words

### Results Analysis
- **Accuracy Score**: Percentage of correctly read words
- **Fluency Score**: Words per minute reading speed
- **Matched Words**: Count of correctly recognized words
- **Missed Words**: Words that need practice
- **Personalized Feedback**: Encouraging messages based on performance
- **Practice Suggestions**: Highlighted words to focus on

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Animations**: GSAP 3.14.2
- **Routing**: React Router DOM 7.11.0
- **Icons**: Lucide React 0.562.0
- **UI Components**: Radix UI
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky, Lint-staged

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

1. **Clone the repository**
```bash
cd fluency-checker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 📁 Project Structure

```
fluency-checker/
├── src/
│   ├── components/
│   │   ├── flows/
│   │   │   ├── SelectDefaultFlow.jsx
│   │   │   └── PasteContentFlow.jsx
│   │   ├── ReadingSession.jsx
│   │   └── ResultsModal.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── FlowPage.jsx
│   ├── data/
│   │   └── paragraphs.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .prettierrc
├── .lintstagedrc.json
└── package.json
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Dark Mode**: Dark gray/black (#111827, #030712)
- **Light Mode**: White/light gray
- **Accent Colors**: Green, Yellow, Red for status indicators

### Animations
- **Hero Title**: Shimmer effect with gradient text
- **Stagger Animation**: Sequential fade-in for elements
- **Hover Effects**: Lift animation on cards
- **Word Highlighting**: Scale and color animation for matched words
- **Modal Entrance**: Smooth scale and fade animation
- **Button Interactions**: Smooth transitions and hover states

### Typography
- **Headings**: Bold, large font sizes (5xl-7xl for hero)
- **Body Text**: Clear, readable font with proper line height
- **Responsive**: Font sizes scale on smaller screens

## 🎤 How It Works

### Speech Recognition Flow

1. **User selects content** (default paragraph or custom text)
2. **User clicks "Start Recording"**
3. **Browser requests microphone permission**
4. **Web Speech API converts audio to text in real-time**
5. **Application matches recognized words with original text**
6. **Matched words are highlighted with animation**
7. **Accuracy percentage updates in real-time**
8. **User clicks "Stop Recording" when finished**
9. **Application calculates final metrics**
10. **Results modal displays with detailed feedback**

### Accuracy Calculation

```
Accuracy = (Matched Words / Total Words) × 100
Fluency = (Total Words / Time in Seconds) × 60
```

## 🌙 Dark/Light Mode

The application automatically detects system preference and allows manual toggling via the theme button in the header. Theme preference is maintained during the session.

## 📱 Responsive Design

- **Mobile**: Optimized for small screens with touch-friendly buttons
- **Tablet**: Adjusted layout for medium screens
- **Desktop**: Full-featured experience with optimal spacing

## 🔒 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14.5+)
- Opera: Full support

**Note**: Web Speech API support varies by browser. Chrome and Edge have the best support.

## 📊 Paragraph Levels

The application includes 10 difficulty levels:

1. **Beginner** (75 words) - Simple everyday vocabulary
2. **Elementary** (85 words) - Basic sentence structures
3. **Pre-Intermediate** (95 words) - Slightly complex topics
4. **Intermediate** (110 words) - Varied vocabulary
5. **Upper-Intermediate** (130 words) - Advanced topics
6. **Advanced** (145 words) - Complex concepts
7. **Advanced Plus** (160 words) - Specialized vocabulary
8. **Proficiency** (175 words) - Sophisticated language
9. **Mastery** (190 words) - Complex philosophical concepts
10. **Expert** (210 words) - Highly technical content

## 🎯 Performance Optimization

- **Code Splitting**: Lazy loading of routes
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Animation Performance**: GPU-accelerated GSAP animations
- **Bundle Size**: Optimized with Vite

## 🔧 Development

### Code Quality

The project uses ESLint and Prettier for code quality:

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Pre-commit Hooks

Husky and lint-staged are configured to run linting and formatting before commits.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

## 🎉 Made with ❤️ for India 🇮🇳

FluentSpeak is built with passion to help improve English fluency and pronunciation skills for everyone.

---

**Version**: 0.0.0  
**Last Updated**: December 19, 2024
