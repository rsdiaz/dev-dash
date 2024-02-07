/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { socket } from "../socket";

function TopBar() {
  const [systemInfo, setSystemInfo] = useState<any>({});

  function bytesToGigabytes(bytes: any): string {
    const gigabytes = bytes / Math.pow(1024, 3);
    return gigabytes.toFixed(2);
  }

  useEffect(() => {
    function onFooEvent(value: any) {
      setSystemInfo(value);
    }

    socket.on("systemInfo", (info) => onFooEvent(info));

    return () => {
      socket.off("foo", onFooEvent);
    };
  }, [systemInfo]);

  return (
    <div className="sticky top-0 w-full bg-slate-900">
      <div className="max-w-screen-2xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center">
            <button className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5">
              OS: Windows
            </button>
            <div className="ml-3 relative">
              <button className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5">
                CPU: {systemInfo?.cpu?.model}
              </button>
            </div>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/10 rounded-full py-1 px-3 hidden xl:flex items-center hover:bg-sky-400/20"
            >
              RAM -&gt; <span>total</span>:{" "}
              {bytesToGigabytes(systemInfo?.memory?.total)} GB used:{" "}
              {bytesToGigabytes(systemInfo?.memory?.used)} GB
            </a>
            <div className="relative hidden lg:flex items-center ml-auto">
              <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="flex space-x-8">
                  <li>
                    <button className="ml-3 text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5">
                      NodeJS: {systemInfo?.nodev}
                    </button>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="hover:text-sky-500 dark:hover:text-sky-400"
                    >
                      Front
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-sky-500 dark:hover:text-sky-400"
                      href="/"
                    >
                      Tools
                    </a>
                  </li>
                </ul>
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
