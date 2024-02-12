import DevTools from "./DevTools";
import Cpu from "./cpu";
import Github from "./github";
import DevtoolsPopover from "./devtools-popover";
import Ram from "./ram";

function TopBar() {

  return (
    <div className="sticky z-50 top-0 w-full border-b border-white/5 bg-[#ffffff01] ">
      <div className="w-full max-w-[130rem] mx-auto px-6 py-4">
        <div className="w-full flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <Cpu />
            <Ram />
          </div>
          <nav className="flex items-center text-sm gap-2">
            <div className="hidden md:flex items-center">
              <DevTools />
            </div>
            <DevtoolsPopover  />
            <Github />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
