import { Link, useLocation } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { CircleDollarSign, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getLinkClassName = (path: string, baseColor: string) => {
    const isActive = isActiveLink(path);
    const baseClasses = "px-3 py-2 md:px-4 md:py-2 border-2 border-black font-bold uppercase text-xs md:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100";

    if (isActive) {
      return `${baseClasses} bg-black text-white`;
    }
    return `${baseClasses} ${baseColor} text-black`;
  };

  const getMobileLinkClassName = (path: string, baseColor: string) => {
    const isActive = isActiveLink(path);
    const baseClasses = "px-4 py-3 border-2 border-black font-bold uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100";

    if (isActive) {
      return `${baseClasses} bg-black text-white`;
    }
    return `${baseClasses} ${baseColor} text-black`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-yellow-400 border-b-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto flex h-14 md:h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <div className="flex gap-4 md:gap-6 items-center">
          <Link to="/" className="flex items-center space-x-1 md:space-x-2 bg-black text-yellow-400 px-2 py-1 md:px-3 md:py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100">
            <CircleDollarSign className="size-4 md:size-5" />
            <span className="font-black text-xs md:text-base uppercase">SALE REPORTS</span>
          </Link>
          <nav className="hidden md:flex gap-3 lg:gap-4">
            <Link
              to="/"
              className={getLinkClassName("/", "bg-cyan-400")}
            >
              HOME
            </Link>
            <Link
              to="/sales"
              className={getLinkClassName("/sales", "bg-pink-400")}
            >
              SALES
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="md:hidden bg-red-400 text-black p-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="size-4 md:size-5" /> : <Menu className="size-4 md:size-5" />}
          </button>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-lime-300 border-b-4 border-l-4 border-r-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-4 mb-4">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              to="/"
              className={getMobileLinkClassName("/", "bg-cyan-400")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/sales"
              className={getMobileLinkClassName("/sales", "bg-pink-400")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SALES
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;