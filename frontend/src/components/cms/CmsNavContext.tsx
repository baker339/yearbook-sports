'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Team = { id: string; name: string };
export type League = { id: string; name: string; teams: Team[] };
export type Sport = { id: string; name: string; leagues: League[] };

interface CmsNavContextType {
  sports: Sport[];
}

const CmsNavContext = createContext<CmsNavContextType>({ sports: [] });

export function useCmsNav() {
  return useContext(CmsNavContext);
}

export function CmsNavProvider({ children }: { children: ReactNode }) {
  const [sports, setSports] = useState<Sport[]>([]);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002";

  useEffect(() => {
    async function fetchData() {
      // Fetch all sports
      const sportsRes = await fetch(`${API_BASE}/api/sports`);
      const sportsData = await sportsRes.json();
      // Fetch all leagues
      const leaguesRes = await fetch(`${API_BASE}/api/leagues`);
      const leaguesData = await leaguesRes.json();
      // Fetch all teams
      const teamsRes = await fetch(`${API_BASE}/api/teams`);
      const teamsData = await teamsRes.json();

      // Build nested structure
      const sportsWithLeagues = sportsData.map((sport: any) => ({
        id: String(sport.id),
        name: sport.name,
        leagues: leaguesData
          .filter((league: any) => league.sportId === sport.id)
          .map((league: any) => ({
            id: String(league.id),
            name: league.name,
            teams: teamsData
              .filter((team: any) => team.leagueId === league.id)
              .map((team: any) => ({ id: String(team.id), name: team.name })),
          })),
      }));
      setSports(sportsWithLeagues);
    }
    fetchData();
  }, [API_BASE]);

  return (
    <CmsNavContext.Provider value={{ sports }}>
      {children}
    </CmsNavContext.Provider>
  );
} 