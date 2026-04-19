'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f5f3f0]/90 backdrop-blur-md border-b border-[#e5e1db]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#collection" className="nav-link">Men</Link>
          <Link href="#collection" className="nav-link">Women</Link>
          <Link href="#collection" className="nav-link">Trending</Link>
        </nav>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-2xl font-black tracking-tighter text-[#0d0d0d]">VRYON</span>
        </Link>

        {/* Right Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#collection" className="nav-link">Seasonal</Link>
          <Link href="#collection" className="nav-link">Accessories</Link>
          <button className="btn-primary text-xs py-2 px-5 ml-2">
            Sign Up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-[#0d0d0d] mb-1"></span>
          <span className="block w-5 h-0.5 bg-[#0d0d0d] mb-1"></span>
          <span className="block w-4 h-0.5 bg-[#0d0d0d]"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f3f0] border-t border-[#e5e1db] px-6 py-6 flex flex-col gap-4">
          {['Men', 'Women', 'Trending', 'Seasonal', 'Accessories'].map(l => (
            <Link key={l} href="#collection" className="nav-link text-base" onClick={() => setMenuOpen(false)}>{l}</Link>
          ))}
          <button className="btn-primary w-fit mt-2">Sign Up</button>
        </div>
      )}
    </header>
  );
}
