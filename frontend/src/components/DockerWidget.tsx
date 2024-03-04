import useSWR from 'swr'

const fetcher = async () =>
  await fetch('http://localhost:4000/containers', { method: 'GET' }).then(
    async (response) => await response.json()
  )

function DockerWidget () {
  const {
    data: containers,
    error,
    isValidating
  } = useSWR('http://localhost:4000/containers', fetcher)

  if (error !== null && error !== undefined) {
    return (
      <div className='border shadow-sm break-inside flex justify-between flex-col p-4 mb-3 text-sm gap-4 rounded dark:border-white/5 bg-white/10 backdrop-blur-md max-w-[10rem]'>
        <div className='flex flex-col items-center gap-2'>
          <svg
            width='22'
            height='22'
            fill='none'
            strokeWidth='1.5'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
            />
          </svg>
          <span className='text-sm font-medium'>failed to load</span>
          <p className='text-xs text-center text-red-500'>
            An error occurred try to connect again
          </p>
        </div>
      </div>
    )
  }
  if (isValidating) return <div className='Loading'>Loading...</div>

  console.log(containers, 'containers')

  return (
    <article
      className='border shadow-sm break-inside flex justify-between flex-col p-4 mb-3 text-sm gap-4 rounded dark:border-white/5 bg-white/10 backdrop-blur-md'
      data-filter='social'
    >
      <div className='flex justify-start items-center gap-3'>
        <figure className='relative w-12 h-12 flex-none'>
          <svg
            role='img'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Docker</title>
            <path
              fill='#2496ED'
              d='M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z'
            />
          </svg>
          <figcaption className='sr-only'>Avatar</figcaption>
          <span
            className={`absolute right-0 bottom-0 inline-block w-3.5 h-3.5 rounded-full ${
              containers.status === 200 ? 'bg-green-500' : 'bg-red-500'
            } border-2 border-white dark:border-gray-950`}
          />
        </figure>
        <h2 className='font-medium text-sm'>
          Docker
          <br />
          <span className='text-gray-500 text-xs'>
            {containers.status === 200 ? 'running' : 'not running 🚨'}
          </span>
        </h2>
      </div>
      <div className='flex justify-between items-center gap-2'>
        <section className='flex flex-1 items-center gap-2 py-1 px-2 rounded-md dark:text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
            />
          </svg>

          <span>{containers.containers !== null ? containers.containers : '0'}</span>
        </section>
        <section className='flex flex-1 items-center gap-2 py-1 px-2 rounded-md dark:text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6 text-green-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
            />
          </svg>

          <span>{containers.running !== null ? containers.running : '0'}</span>
        </section>
        <section className='flex flex-1 items-center gap-2 py-1 px-2 rounded-md dark:text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6 text-yellow-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 5.25v13.5m-7.5-13.5v13.5'
            />
          </svg>

          <span>{containers.paused !== null ? containers.paused : '0'}</span>
        </section>
        <section className='flex flex-1 items-center gap-2 py-1 px-2 rounded-md dark:text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6 text-red-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z'
            />
          </svg>

          <span>{containers.stopped !== null ? containers.stopped : '0'}</span>
        </section>
      </div>
    </article>
  )
}

export default DockerWidget
