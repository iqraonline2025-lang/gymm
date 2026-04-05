"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'; // 1. Added useSearchParams

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams(); // 2. Initialize searchParams
  const { data: session } = useSession();

  // 3. Get the callbackUrl from the URL, or default to home
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (session) router.push(callbackUrl);
  }, [session, router, callbackUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        console.error("Auth Denied:", res.error);
        setError("ACCESS_DENIED: INVALID_CIPHER_OR_IDENTITY");
        setLoading(false);
      } else {
        // 4. Force refresh and push to the specific callbackUrl
        router.refresh();
        router.push(callbackUrl); 
      }
    } catch (err) {
      setError("SYSTEM_FAILURE: UPLINK_UNSTABLE");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            System <span className="text-red-600">Login</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">
            Identity_Verification_Required
          </p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-600/10 border border-red-600 p-3 text-[10px] text-red-600 font-black uppercase text-center animate-pulse">
                {error}
              </div>
            )}

            <div>
              <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Email_Uplink</label>
              <input 
                type="email" required
                className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all font-mono"
                placeholder="USER@IRONCORE.COM"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest ml-1">Access_Cipher</label>
              <input 
                type="password" required
                className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 uppercase italic tracking-[0.2em] text-xs transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "Authorize Access"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <hr className="border-zinc-800" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-[8px] text-zinc-600 font-black uppercase">OR</span>
          </div>

          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full bg-transparent border border-zinc-700 hover:border-white text-white font-black py-4 uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3"
          >
            Google Authenticator
          </button>

          <p className="mt-8 text-center text-[10px] text-zinc-500 uppercase tracking-widest">
            Unregistered? <Link href="/register" className="text-red-600 font-black hover:underline ml-1">Request_Access</Link>
          </p>
        </div>
      </div>
    </main>
  );
}