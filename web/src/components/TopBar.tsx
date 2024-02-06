function TopBar() {
  return (
    <div className="sticky top-0 w-full bg-slate-900">
      <div className="max-w-screen-2xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center">
            <div className="relative">
              <button className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5">
                CPU: AMD Ryzen 7800 KSS
              </button>
            </div>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/10 rounded-full py-1 px-3 hidden xl:flex items-center hover:bg-sky-400/20"
            >
              RAM: 16 GB
            </a>
            <div className="relative hidden lg:flex items-center ml-auto">
              <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="flex space-x-8">
                  <li>
                    <a
                      className="hover:text-sky-500 dark:hover:text-sky-400"
                      href="/"
                    >
                      Backend
                    </a>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
