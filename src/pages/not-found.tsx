import { Link } from "react-router";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-red-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Error Container */}
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-center">
          {/* Error Icon */}
          <div className="bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 inline-block mb-6">
            <AlertTriangle className="h-16 w-16 md:h-20 md:w-20 text-black" />
          </div>

          {/* 404 Text */}
          <div className="bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
            <h1 className="font-black text-6xl md:text-8xl uppercase mb-2">404</h1>
            <h2 className="font-black text-xl md:text-2xl uppercase tracking-wide">Page Not Found</h2>
          </div>

          {/* Error Message */}
          <div className="bg-pink-400 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
            <p className="font-bold text-black text-lg md:text-xl uppercase mb-4">
              Oops! This page doesn't exist
            </p>
            <p className="font-bold text-black text-sm md:text-base">
              The page you're looking for might have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="bg-cyan-400 text-black px-6 py-3 md:px-8 md:py-4 border-4 border-black font-black uppercase text-sm md:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 flex items-center gap-2"
            >
              <Home className="h-5 w-5 md:h-6 md:w-6" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="bg-lime-400 text-black px-6 py-3 md:px-8 md:py-4 border-4 border-black font-black uppercase text-sm md:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
              Go Back
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-purple-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mt-8">
            <p className="font-bold text-black text-xs md:text-sm uppercase">
              Need Help? Check our <Link to="/help" className="underline hover:no-underline">Help Center</Link>
            </p>
          </div>
        </div>

        {/* Floating Elements for Extra Brutalism */}
        <div className="relative">
          <div className="absolute -top-4 -right-4 bg-yellow-400 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2 rotate-12 hidden md:block">
            <span className="font-black text-black text-xs uppercase">Error!</span>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-pink-400 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2 -rotate-12 hidden md:block">
            <span className="font-black text-black text-xs uppercase">404</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;