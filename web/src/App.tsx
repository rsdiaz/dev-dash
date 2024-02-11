import './App.css'
import TopBar from './components/TopBar'
import BookMarks from './components/BookMarks'

function App() {

  return (
    <>
      <TopBar />
      <main className='max-w-[130rem] mx-auto'>
        <div className='p-20'>
          <BookMarks />
        </div>
      </main>
    </>
  )
}

export default App
