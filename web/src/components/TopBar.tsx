import DevTools from "./DevTools";
import Cpu from "./cpu";
import Github from "./github";
import Ram from "./ram";

function TopBar() {
  
  return (
    <div className="sticky top-0 w-full py-4 border-b border-white/5 bg-[#ffffff01] ">
      <div className="w-full max-w-[130rem] mx-auto">
        <div className="w-full flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <Cpu />
            <Ram />
          </div>
          <nav className="hidden md:flex items-center text-sm gap-2">
            <DevTools />
            <Github />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
