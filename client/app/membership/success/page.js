"use client";
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-black uppercase italic text-white mb-4">Access Granted</h1>
        <p className="text-zinc-400 mb-10 italic">Your membership is now active. Welcome to the IronCore Arsenal.</p>
        <Link 
          href="/" 
          className="block w-full bg-white text-black py-4 font-black uppercase italic tracking-widest hover:bg-red-600 hover:text-white transition-all"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}