"use client";
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// 1. Move logic into a sub-component
function RegisterContent() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.message || "REGISTRATION_FAILED");
        setLoading(false);
      }
    } catch (err) {
      setError("SYSTEM_OFFLINE: CHECK BACKEND CONNECTION");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            New <span className="text-red-600">Recruit</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">
            Establish_Security_Credentials
          </p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 p-8 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-600/10 border border-red-600 p-3 text-[10px] text-red-600 font-black uppercase text-center animate-pulse">
                {error}
              </div>
            )}

            <div>
              <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Codename</label>
              <input 
                type="text" required
                className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all"
                placeholder="FULL NAME"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Email_Uplink</label>
              <input 
                type="email" required
                className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all font-mono"
                placeholder="EMAIL@DOMAIN.COM"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Access_Cipher</label>
              <input 
                type="password" required
                className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all"
                placeholder="PASSWORD"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 uppercase italic tracking-[0.2em] text-xs transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "ENROLLING..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <hr className="border-zinc-800" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-4 text-[8px] text-zinc-600 font-black uppercase">OR</span>
          </div>

          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full bg-transparent border border-zinc-700 hover:border-white text-white font-black py-4 uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
               <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
               <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
               <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
               <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-[10px] text-zinc-500 uppercase tracking-widest">
            Already registered? <Link href="/login" className="text-red-600 font-black hover:underline ml-1">Login_Here</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

// 2. Wrap in Suspense for Export
export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-600 font-mono text-xs animate-pulse uppercase tracking-[0.5em]">
          Initializing_Enrollment_Protocol...
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
