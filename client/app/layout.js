import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AuthProvider from "./components/AuthProvider"; // 1. Import the Provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IronCore Gym | Push Your Limits",
  description: "Join the ultimate fitness community. View schedules, book trainers, and manage your membership.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {/* 2. Wrap everything inside AuthProvider */}
        <AuthProvider>
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>
        </AuthProvider>

        {/* Optional: Footer goes here later */}
      </body>
    </html>
  );
}