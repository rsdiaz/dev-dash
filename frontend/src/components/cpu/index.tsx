import React from 'react'
import { cx } from '../../utils/classNames'
import { Context } from '../../context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

export default function Cpu () {
  const { systemInfo } = React.useContext(Context)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button className='flex items-center gap-2 border rounded px-3 h-10 dark:border-white/5 bg-white/10 backdrop-blur-md'>
              <div className='flex items-center gap-3'>
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
                    d='M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z'
                  />
                </svg>

                <span className='text-sm font-medium'>CPU</span>
              </div>
              <span className='text-sm font-medium min-w-14'>
                {systemInfo?.cpu?.usage}%
              </span>
              <div className='w-8 h-8 flex items-center relative'>
                <svg
                  width='100'
                  height='100'
                  viewBox='0 0 100 100'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    cx='50'
                    cy='50'
                    r='40'
                    className='stroke-gray-200 dark:stroke-white/10'
                    strokeWidth='10'
                    fill='none'
                  />
                  <circle
                    cx='50'
                    cy='50'
                    r='40'
                    className={cx(
                      systemInfo?.cpu?.usage > 80
                        ? 'stroke-red-500'
                        : 'stroke-emerald-400'
                    )}
                    strokeWidth='10'
                    fill='none'
                    strokeDasharray={251.2}
                    strokeDashoffset={
                      251.2 * (1 - systemInfo?.cpu?.usage / 100)
                    }
                  >
                    <animate
                      attributeName='strokeDashoffset'
                      dur='2s'
                      from='251.2'
                      to='0'
                      fill='freeze'
                    />
                  </circle>
                </svg>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <div className='mb-2'>
              <p className='font-bold'>CPU Info:</p>
            </div>
            <div className='text-xs'>
              <p>Model: {systemInfo?.cpu?.model}</p>
              <p>Nº Cores: {systemInfo?.cpu?.cpus}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
