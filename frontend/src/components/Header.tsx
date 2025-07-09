import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="espn-header">
      {/* Top bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="espn-content">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Today's Top Stories</span>
              <span className="text-accent-400">Live Scores</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link href="/signup" className="bg-accent-600 hover:bg-accent-700 px-3 py-1 rounded text-sm font-medium transition-colors">Subscribe</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="espn-content py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-3xl font-bold text-primary-700 tracking-tight">
              Yearbook Sports
            </Link>
            <nav className="hidden lg:flex space-x-6">
              <Link href="/articles" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Articles</Link>
              <Link href="/podcasts" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Podcasts</Link>
              <Link href="/teams" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Teams</Link>
              <Link href="/stats" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Stats</Link>
              <Link href="/admin" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Admin</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Sports navigation */}
      <div className="espn-nav">
        <div className="espn-content">
          <nav className="flex space-x-8 py-3 overflow-x-auto">
            <Link href="/sport/football" className="text-white hover:text-accent-300 font-medium transition-colors whitespace-nowrap">NFL</Link>
            <Link href="/sport/basketball" className="text-white hover:text-accent-300 font-medium transition-colors whitespace-nowrap">NBA</Link>
            <Link href="/sport/baseball" className="text-white hover:text-accent-300 font-medium transition-colors whitespace-nowrap">MLB</Link>
            <Link href="/sport/hockey" className="text-white hover:text-accent-300 font-medium transition-colors whitespace-nowrap">NHL</Link>
            <Link href="/sport/soccer" className="text-white hover:text-accent-300 font-medium transition-colors whitespace-nowrap">Soccer</Link>
            <Link href="/sport/college" className="text-white hover:text-accent-300 font-medium transition-colors whitespace-nowrap">College</Link>
            <Link href="/sport/olympics" className="text-white hover:text-accent-300 font-medium transition-colors whitespace-nowrap">Olympics</Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 