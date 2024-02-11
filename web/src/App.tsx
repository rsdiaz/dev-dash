import './App.css'
import TopBar from './components/TopBar'
import BookMarks from './components/BookMarks'
import DockerWidget from './components/DockerWidget'
import WeatherWidget from './components/Weather'

function App() {

  return (
    <>
      <div className='mx-11'>
        <TopBar />
      </div>
      <div className='mt-4 mx-11 flex gap-4'>
        <DockerWidget />
        <WeatherWidget />
      </div>
      <main className='max-w-[130rem] mx-auto'>
        <div className='p-20'>
          <BookMarks />
        </div>
      </main>
    </>
  )
}

export default App
