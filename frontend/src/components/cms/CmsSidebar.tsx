'use client';
import * as React from 'react';
import Link from 'next/link';
import { useCmsNav } from './CmsNavContext';

export default function CmsSidebar() {
  const { sports } = useCmsNav();
  const [hoveredSport, setHoveredSport] = React.useState<string | null>(null);
  const [hoveredLeague, setHoveredLeague] = React.useState<string | null>(null);
  const [entitiesOpen, setEntitiesOpen] = React.useState(false);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-4 relative z-10">
      <div className="text-2xl font-bold mb-8">CMS Dashboard</div>
      <nav className="space-y-2">
        <Link href="/cms" className="block px-3 py-2 rounded hover:bg-primary-50 text-gray-700 font-medium">Dashboard</Link>
        <div>
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-primary-50 text-gray-700 font-medium focus:outline-none"
            onClick={() => setEntitiesOpen((open) => !open)}
            aria-expanded={entitiesOpen}
            aria-controls="entities-menu"
            type="button"
          >
            <span>Entities</span>
            <svg className={`w-4 h-4 ml-2 transition-transform ${entitiesOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          {entitiesOpen && (
            <div id="entities-menu" className="ml-4 mt-1 space-y-1">
              <Link href="/cms/sports" className="block px-3 py-2 rounded hover:bg-primary-50 text-gray-700">All Sports</Link>
              <Link href="/cms/leagues" className="block px-3 py-2 rounded hover:bg-primary-50 text-gray-700">All Leagues</Link>
              <Link href="/cms/teams" className="block px-3 py-2 rounded hover:bg-primary-50 text-gray-700">All Teams</Link>
              <Link href="/cms/players" className="block px-3 py-2 rounded hover:bg-primary-50 text-gray-700">All Players</Link>
            </div>
          )}
        </div>
        <div className="relative group">
          <div className="block px-3 py-2 rounded hover:bg-primary-50 text-gray-700 font-medium cursor-pointer">
            Sports
          </div>
          <div className="absolute left-full top-0 mt-0 hidden group-hover:block bg-white border border-gray-200 rounded shadow-lg min-w-[180px]">
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
                  <div className="absolute left-full top-0 mt-0 bg-white border border-gray-200 rounded shadow-lg min-w-[180px]">
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
                          <div className="absolute left-full top-0 mt-0 bg-white border border-gray-200 rounded shadow-lg min-w-[180px]">
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
        </div>
        <Link href="/cms/podcasts" className="block px-3 py-2 rounded hover:bg-primary-50 text-gray-700 font-medium">Podcasts</Link>
      </nav>
    </aside>
  );
} 