import React from "react";
import { Context } from "../context";
import DevTools from "./DevTools";

function TopBar() {
  const { systemInfo, bytesToGigabytes } = React.useContext(Context);

  console.log(systemInfo);

  return (
    <div className="sticky top-0 w-full dark:bg-gray-950">
      <div className="max-w-screen-2xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center">

            {/* Info */}
            <div className="ml-3 relative">
              <button className="flex items-center justify-center h-8 w-8 flex-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-900">
                <svg
                  width="22"
                  height="22"
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
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  ></path>
                </svg>
              </button>
            </div>

            {/* cpu */}
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center flex-none w-10 h-10">
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
              </div>
              <div className="flex flex-col w-44 space-y-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-medium block">CPU</h2>
                  <div className="flex items-center font-medium text-gray-500">
                    <span>{systemInfo?.cpu?.usage} %</span>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-gray-100 rounded-sm overflow-hidden dark:bg-gray-600">
                  <div
                    className={`absolute left-0 h-full bg-purple-500`}
                    style={{ width: `${systemInfo?.cpu?.usage}px` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* ram */}
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center flex-none w-10 h-10">
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
              </div>
              <div className="flex flex-col w-44 space-y-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-medium block">RAM</h2>
                  <div className="flex items-center font-medium text-gray-500">
                    <span>{bytesToGigabytes(systemInfo?.memory?.used)} GB</span>{" "}
                    /{" "}
                    <span>
                      {bytesToGigabytes(systemInfo?.memory?.total)} GB
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-gray-100 rounded-sm overflow-hidden dark:bg-gray-600">
                  <div
                    className={`absolute left-0 h-full bg-purple-500`}
                    style={{
                      width: `${
                        (systemInfo?.memory?.used / systemInfo?.memory?.total) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* app tools widget */}
            <div className="relative hidden lg:flex items-center ml-auto">
              <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <DevTools />
              </nav>
              <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                <a
                  href="https://github.com/rsdiaz/dev-dash"
                  className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                >
                  <span className="sr-only">DevDash GitHub</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
