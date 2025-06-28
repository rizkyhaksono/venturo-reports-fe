import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { CircleDollarSign } from "lucide-react";

const Navbar = () => {
  return (
    <header className="max-w-7xl mx-auto flex justify-center sticky top-0 z-50 w-full border-b border-b-black/10 bg-gray-200/20 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-0 md:px-6">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <CircleDollarSign className="size-5" />
            <span className="font-bold text-md">Sale Reports</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/sales" className="text-muted-foreground hover:text-foreground transition-colors">
              Sales
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;