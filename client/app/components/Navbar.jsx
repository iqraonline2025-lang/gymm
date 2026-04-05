"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  // Helper to get the first letter of the name or email
  const getUserInitial = () => {
    if (session?.user?.name) {
      return session.user.name.charAt(0).toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email.charAt(0).toUpperCase();
    }
    return "M";
  };

  return (
    <nav className="bg-black border-b border-red-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold tracking-tighter uppercase text-white">
              IRON<span className="text-red-600">CORE</span>
            </Link>
          </div>

          {/* Desktop Main Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-red-500 transition">About</Link>
            <Link href="/services" className="text-sm font-medium text-gray-300 hover:text-red-500 transition">Programs</Link>
            <Link href="/schedule" className="text-sm font-medium text-gray-300 hover:text-red-500 transition">Schedule</Link>
            <Link href="/membership" className="text-sm font-medium text-gray-300 hover:text-red-500 transition">Membership</Link>
            <Link href="/trainers" className="text-sm font-medium text-gray-300 hover:text-red-500 transition">Trainers</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-red-500 transition">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-4">
                {/* User Initial Avatar */}
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center border border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  <span className="text-white font-black text-lg italic">
                    {getUserInitial()}
                  </span>
                </div>

                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-red-600 transition border-l border-zinc-800 pl-4"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-white hover:text-gray-400 transition">
                  Log in
                </Link>
                <Link 
                  href="/register"
                  className="bg-red-600 text-white px-5 py-2.5 rounded-md text-sm font-bold hover:bg-red-700 transition transform hover:scale-105"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-red-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-red-900 pb-4">
          <div className="px-2 pt-2 space-y-1">
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-white hover:bg-red-600 rounded-md">About</Link>
            <Link href="/services" className="block px-3 py-2 text-base font-medium text-white hover:bg-red-600 rounded-md">Programs</Link>
            <Link href="/schedule" className="block px-3 py-2 text-base font-medium text-white hover:bg-red-600 rounded-md">Schedule</Link>
            
            <div className="border-t border-zinc-800 my-2"></div>
            
            {status === "authenticated" ? (
              <div className="px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white font-black">{getUserInitial()}</span>
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Active Member</span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="text-xs font-bold text-red-600 uppercase"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-400">Log in</Link>
                <Link href="/register" className="block px-3 py-2 text-base font-bold text-red-600">Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;