import './App.css'
import TopBar from './components/TopBar'
import BookMarks from './components/BookMarks'
import DockerWidget from './components/DockerWidget'
import WeatherWidget from './components/Weather'
import Trends from './components/Trends'
import React from 'react'

function App () {
  // Check prefer dark mode

  React.useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
    if (darkMode.matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <>
      <TopBar />
      <main className='max-w-[130rem] mx-auto px-6'>
        <div className='mt-4 flex gap-4'>
          <WeatherWidget />
          <DockerWidget />
          <Trends />
        </div>
        <div className='py-20'>
          <BookMarks />
        </div>
      </main>
    </>
  )
}

export default App
