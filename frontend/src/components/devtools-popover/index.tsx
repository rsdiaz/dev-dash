import React from 'react'
import useSWR from 'swr'
import Spinner from '../@ui/spinner'
import { cx } from '../../utils/classNames'

const fetcher = async () => await fetch('http://localhost:4000/tools', {
  method: 'GET'
}).then(async (response) => await response.json())

export default function MoreDevtools () {
  const [ isOpen, setIsOpen ] = React.useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const {
    data: tools,
    error,
    isValidating
  } = useSWR('http://localhost:4000/tools', fetcher)

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
          <svg width='20' height='20' fill='none' strokeWidth={2.5} stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>

        {
          isOpen && (
            <div className='absolute z-20 bottom-auto top-full mt-2 left-auto right-0 flex items-center min-w-max'>
              <div className='w-full max-w-[18.5rem] min-w-[18rem] flex flex-col rounded p-4 z-40 border dark:border-white/5 bg-white/70 dark:bg-white/20 backdrop-blur-md max-h-[30rem]'>
                <header className='w-full flex items-start justify-between'>
                  <h2 className='text-lg'> More devtools </h2>
                  <button
                    onClick={handleOpen}
                    className='flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 backdrop-sm dark:hover:bg-white/10 hover:bg-black/5'>
                    <svg width='22' height='22' fill='none' strokeWidth={2} stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                    </svg>
                  </button>
                </header>
                {isValidating
                  ? <div className='p-4 mx-auto'><Spinner size='md' /></div>
                  : (
                    <>
                      {error !== null && error !== undefined
                        ? <p className='text-center mt-3 text-xs text-red-500'>An error occurred try to connect again</p>
                        : (
                          <ul className='grid grid-cols-4 mt-4 gap-2 overflow-y-auto h-full pr-2'>
                            {tools?.map((tool: any) => (
                              <React.Fragment key={tool.id}>
                                <li
                                  className='flex items-center justify-center rounded p-2 border cursor-pointer dark:border-white/5 dark:bg-white/70 backdrop-blur-lg transition-colors duration-300 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-white/90 dark:hover:border-white/5 '
                                >
                                  <div
                                    className='object-cover'
                                    dangerouslySetInnerHTML={{ __html: tool.svg }} />
                                  <span className='sr-only'>{tool.name}</span>
                                </li>

                              </React.Fragment>
                            ))}
                          </ul>
                        )
                      }
                    </>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
