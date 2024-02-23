import React, { type FormEvent } from 'react'
import useSWRMutation from 'swr/mutation'
import { cx } from '../../utils/classNames'
import { Button } from '@/components/ui/button'

interface FormData {
  url: string
  title: string
  category: string
}

async function addBookmark (url: string, { arg }: { arg: FormData }) {
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  })
}

function AddBookMark () {
  const { trigger } = useSWRMutation(
    'http://localhost:4000/bookmarks',
    addBookmark
  )

  const [ formData, setFormData ] = React.useState<FormData>({
    url: '',
    title: '',
    category: ''
  })

  const [ isOpen, setIsOpen ] = React.useState(false)

  function handleOpen (): void {
    setIsOpen(!isOpen)
  }

  async function handleSubmit (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()
    await trigger(formData)
    setIsOpen(false)
  }

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className='absolute bottom-6 left-1/2'>
      <div className='relative flex flex-col-reverse w-44'>
        <button
          onClick={handleOpen}
          className={cx(
            'flex items-center justify-center rounded-full h-10 w-10 transition-colors duration-300 border dark:border-white/5 dark:hover:bg-white/10 dark:focus:bg-white/10 backdrop-blur-md',
            isOpen ? 'bg-black/5' : ''
          )}
        >
          <svg
            width='20'
            height='20'
            fill='none'
            strokeWidth={2.5}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
        {isOpen && (
          <div className='absolute z-20 left-auto right-0 flex items-center min-w-max'>
            <div className='w-full max-w-[18.5rem] min-w-[18rem] flex flex-col rounded p-4 z-40 border dark:border-white/5 bg-white/70 dark:bg-white/20 backdrop-blur-md max-h-[30rem]'>
              <header className='w-full flex items-start justify-between'>
                <h2 className='text-lg'>Add bookmark</h2>
                <button
                  onClick={handleOpen}
                  className='flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 backdrop-sm dark:hover:bg-white/10 hover:bg-black/5'
                >
                  <svg
                    width='22'
                    height='22'
                    fill='none'
                    strokeWidth={2}
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18 18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </header>
              <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='title'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Title:
                  </label>
                  <input
                    type='text'
                    name='title'
                    onChange={handleInputChange}
                    className='min-w-28 px-1 rounded h-8 cursor-pointer bg-white dark:bg-white/20 dark:focus:bg-white focus:bg-white ring-2 ring-transparent focus:ring-black dark:focus:text-black dark:focus:ring-white'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='url'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    URL:
                  </label>
                  <input
                    type='text'
                    name='url'
                    onChange={handleInputChange}
                    className='min-w-28 px-1 rounded h-8 cursor-pointer bg-white dark:bg-white/20 dark:focus:bg-white focus:bg-white ring-2 ring-transparent focus:ring-black dark:focus:text-black dark:focus:ring-white'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='category'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Category:
                  </label>
                  <input
                    type='text'
                    name='category'
                    onChange={handleInputChange}
                    className='min-w-28 px-1 rounded h-8 cursor-pointer bg-white dark:bg-white/20 dark:focus:bg-white focus:bg-white ring-2 ring-transparent focus:ring-black dark:focus:text-black dark:focus:ring-white'
                  />
                </div>
                <Button type='submit'>Add bookmark</Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddBookMark
