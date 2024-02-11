import React from "react";
import { Context } from "../../context";
import { cx } from "../../utils/classNames";

export default function Ram() {

  const { systemInfo, bytesToGigabytes } = React.useContext(Context);

  return (
    <div className="flex items-center gap-1 border rounded px-3 h-10 dark:border-white/5 bg-white/10 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
          ></path>
        </svg>
        <h2 className="text-sm font-medium block">RAM</h2>
      </div>
      <div className="ml-3 flex items-center font-medium text-sm text-white">
        <span>{bytesToGigabytes(systemInfo?.memory?.used)} GB</span>{" "}
        &nbsp; / &nbsp;
        <span>
          {bytesToGigabytes(systemInfo?.memory?.total)} GB
        </span>
      </div>
      <div className="ml-2 w-8 h-8 flex items-center relative">
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" className="stroke-gray-200 dark:stroke-white/10" strokeWidth="10" fill="none"/>
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            className={cx(
              systemInfo?.cpu?.usage > 80 ? "stroke-red-500" : "stroke-yellow-400"
            )}
            strokeWidth="10" 
            fill="none" 
            strokeDasharray={251.2} 
            strokeDashoffset={systemInfo?.memory?.used / systemInfo?.memory?.total * 251.2}
          >
            <animate attributeName="strokeDashoffset" dur="2s" from="251.2" to="0" fill="freeze" />
          </circle>
        </svg>
      </div>
      {/* <div className="flex flex-col w-44 space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-medium block">RAM</h2>
          <div className="flex items-center font-medium text-sm text-white">
            <span>{bytesToGigabytes(systemInfo?.memory?.used)} GB</span>{" "}
            &nbsp; / &nbsp;
            <span>
              {bytesToGigabytes(systemInfo?.memory?.total)} GB
            </span>
          </div>
        </div>
        <div className="relative w-full h-1 bg-gray-100 rounded-sm overflow-hidden dark:bg-gray-600">
          <div
            className={`absolute left-0 h-full bg-emerald-400`}
            style={{
              width: `${
                (systemInfo?.memory?.used / systemInfo?.memory?.total) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div> */}
    </div>
  )
}