import React from 'react'
import { cx } from '../../utils/classNames'

export default function Config () {
  const [ isOpen, setIsOpen ] = React.useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  // Close popover on scape key

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => { window.removeEventListener('keydown', handleEscape) }
  }, [])

  return (
    <>
      {isOpen && <div className='fixed inset-0 z-10 bg-black/20 dark:bg-black/40' onClick={handleOpen} />}
      <div className='relative'>

        <button
          onClick={handleOpen}
          className={cx(
            'flex items-center justify-center rounded-full h-10 w-10 transition-colors duration-300 border dark:border-white/5 dark:hover:bg-white/10 dark:focus:bg-white/10 backdrop-blur-md',
            isOpen ? 'bg-black/5' : ''
          )}>
          <svg width='22' height='22' fill='none' strokeWidth={1.5} stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>

            <path strokeLinecap='round' strokeLinejoin='round' d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z' />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
          </svg>
        </button>

        {
          isOpen && (
            <div className='absolute z-20 bottom-auto top-full mt-2 left-auto right-0 flex items-center min-w-max'>
              <div className='w-full max-w-[18.5rem] min-w-[18rem] flex flex-col rounded-md p-4 z-40 border dark:border-white/5 bg-white/70 dark:bg-white/20 backdrop-blur-md max-h-[30rem]'>
                <header className='w-full flex items-start justify-between'>
                  <h2 className='text-lg'> Configurations </h2>
                  <button
                    onClick={handleOpen}
                    className='flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 backdrop-sm dark:hover:bg-white/10 hover:bg-black/5'>
                    <svg width='22' height='22' fill='none' strokeWidth={2} stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                    </svg>
                  </button>
                </header>

                <div className='flex flex-col mt-4'>

                  {/* Bloque */}
                  <div className='flex items-center justify-between'>
                    <label htmlFor='themeConfig' className='text-base'>Theme</label>
                    <select id='themeConfig' className='min-w-28 px-1 rounded h-8 cursor-pointer bg-white dark:bg-white/20 dark:focus:bg-white focus:bg-white ring-2 ring-transparent focus:ring-black dark:focus:text-black dark:focus:ring-white'>
                      <option value='system'> System </option>
                      <option value='light'> Light </option>
                      <option value='dark'> Dark </option>
                    </select>
                  </div>

                  {/* Bloque */}
                  <div className='flex flex-col mt-4'>
                    <h2 className='text-base'>Backgrounds</h2>
                    <p className='text-sm text-black/70 dark:text-white/60'>Choose your app background</p>
                    <div className='flex items-center flex-wrap mt-3 gap-3'>
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-blue-700 bg-blue-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-indigo-700 bg-indigo-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-violet-700 bg-violet-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-rose-700 bg-rose-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-red-700 bg-red-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-orange-700 bg-orange-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-green-700 bg-green-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-teal-700 bg-teal-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-cyan-700 bg-cyan-500' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-gray-950 bg-black' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8 bg-gradient-to-tr from-gray-100 bg-white' />
                      <button className='transition-all duration-300 hover:scale-110 rounded-full w-8 h-8'>
                        <img className='rounded-full w-full h-full max-w-full object-cover' src='https://www.svgrepo.com/show/452227/image.svg' alt='bg' />
                      </button>
                    </div>
                  </div>

                  {/* Bloque */}
                  <div className='mt-4'>
                    <ul>
                      <li className='block py-1'>About</li>
                      <li className='block py-1'>Help</li>
                      <li className='block py-1'>Version 1.0.0</li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
