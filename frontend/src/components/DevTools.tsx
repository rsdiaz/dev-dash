import useSWR from 'swr'
import Spinner from './@ui/spinner'

const fetcher = async () =>
  await fetch('http://localhost:4000/tools', { method: 'GET' }).then(async (response) =>
    await response.json()
  )

const DevTools = () => {
  const {
    data: tools,
    error,
    isValidating
  } = useSWR('http://localhost:4000/tools', fetcher)

  if (error !== null && error !== undefined) return <div className='failed'>failed to load</div>
  if (isValidating) return <div className='flex items-center px-4'><Spinner size='sm' /></div>

  console.log(tools)

  return (
    <ul className='flex items-center gap-2'>
      {tools?.map((tool: any, index: number) => (
        <li key={index} className='flex items-center rounded px-3 h-10 border dark:border-white/5 bg-white/10 backdrop-blur-md'>
          <div className='flex gap-2 text-sm font-medium'>
            <div className='tools-logo' dangerouslySetInnerHTML={{ __html: tool.svg }} />
            <p className='flex items-center gap-1'>
              <span className='font-medium'>{tool.current_version}</span>
              {tool.is_outdated === true && (
                <>
                  <svg width='14' height='14' fill='none' strokeWidth='2' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
                  </svg>
                  <span className='text-emerald-500 dark:text-emerald-400'>{tool.latest_version}</span>
                </>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default DevTools
