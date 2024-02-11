import './App.css'
import TopBar from './components/TopBar'
import BookMarks from './components/BookMarks'
import DockerWidget from './components/DockerWidget'

function App() {

  return (
    <>
      <div className='mx-11'>
        <TopBar />
      </div>
      <div className='mt-8 mx-11 flex gap-4'>
        <DockerWidget />
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
