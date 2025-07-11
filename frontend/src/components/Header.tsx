'use client';

import React from 'react';
import Link from 'next/link';
import { CmsNavProvider, useCmsNav } from './cms/CmsNavContext';

function DynamicSportsDropdown() {
  const { sports } = useCmsNav();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [hoveredSport, setHoveredSport] = React.useState<string | null>(null);
  const [hoveredLeague, setHoveredLeague] = React.useState<string | null>(null);
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setHoveredSport(null);
      setHoveredLeague(null);
    }, 200); // 200ms delay
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer px-2 py-1 rounded">
        Sports
      </div>
      {isDropdownOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[180px] z-50">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="relative group/sport"
              onMouseEnter={() => setHoveredSport(sport.id)}
              onMouseLeave={() => setHoveredSport(null)}
            >
              <Link href={`/cms/sports/${sport.id}`} className="block px-4 py-2 hover:bg-primary-50 text-gray-700">
                {sport.name}
              </Link>
              {hoveredSport === sport.id && sport.leagues.length > 0 && (
                <div className="absolute left-full top-0 mt-0 bg-white border border-gray-200 rounded shadow-lg min-w-[180px] z-50">
                  {sport.leagues.map((league) => (
                    <div
                      key={league.id}
                      className="relative group/league"
                      onMouseEnter={() => setHoveredLeague(league.id)}
                      onMouseLeave={() => setHoveredLeague(null)}
                    >
                      <Link href={`/cms/leagues/${league.id}`} className="block px-4 py-2 hover:bg-primary-50 text-gray-700">
                        {league.name}
                      </Link>
                      {hoveredLeague === league.id && league.teams.length > 0 && (
                        <div className="absolute left-full top-0 mt-0 bg-white border border-gray-200 rounded shadow-lg min-w-[180px] z-50">
                          {league.teams.map((team) => (
                            <Link key={team.id} href={`/cms/teams/${team.id}`} className="block px-4 py-2 hover:bg-primary-50 text-gray-700">
                              {team.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  return (
    <CmsNavProvider>
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
              <nav className="hidden lg:flex space-x-6 items-center">
                <Link href="/cms" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Dashboard</Link>
                <DynamicSportsDropdown />
                <Link href="/cms/podcasts" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Podcasts</Link>
                {/* Removed Articles, Teams, and Stats links */}
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
        {/* Remove old static sports nav */}
      </header>
    </CmsNavProvider>
  );
} 