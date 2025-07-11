"use client";
import * as React from "react";

interface Team {
  id: number;
  name: string;
  leagueId: number | null;
}

interface League { id: number; name: string; }

export default function TeamsListPage() {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [newTeamName, setNewTeamName] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [editTeam, setEditTeam] = React.useState<Team | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editLoading, setEditLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [leagues, setLeagues] = React.useState<League[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = React.useState<number | null>(null);
  const [editLeagueId, setEditLeagueId] = React.useState<number | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002";

  React.useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/teams`);
        if (!res.ok) throw new Error("Failed to fetch teams");
        const data = await res.json();
        setTeams(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    async function fetchLeagues() {
      try {
        const res = await fetch(`${API_BASE}/api/leagues`);
        if (!res.ok) throw new Error("Failed to fetch leagues");
        const data = await res.json();
        setLeagues(data);
        if (data.length && selectedLeagueId === null) setSelectedLeagueId(data[0].id);
      } catch {}
    }
    fetchTeams();
    fetchLeagues();
  }, []);

  async function handleAddTeam(e: React.FormEvent) {
    e.preventDefault();
    if (!newTeamName.trim() || !selectedLeagueId) return;
    setAdding(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTeamName, leagueId: selectedLeagueId }),
      });
      if (!res.ok) throw new Error("Failed to add team");
      const created = await res.json();
      setTeams((prev) => [
        ...prev,
        {
          id: Number(created.id),
          name: String(created.name),
          leagueId: Number(created.leagueId ?? selectedLeagueId ?? 0),
        },
      ]);
      setNewTeamName("");
      setShowModal(false);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Teams</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          + Add Team
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {teams.map((team) => (
            <li key={team.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <span>{team.name} <span className="text-gray-400 text-sm">({leagues.find(l => l.id === team.leagueId)?.name || 'Unknown League'})</span></span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={() => { setEditTeam(team); setEditName(team.name); setEditLeagueId(team.leagueId); }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setDeleteId(team.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddTeam}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Add New Team</h2>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={selectedLeagueId ?? ''}
              onChange={e => setSelectedLeagueId(Number(e.target.value))}
              disabled={adding || !leagues.length}
            >
              {leagues.map(league => (
                <option key={league.id} value={league.id}>{league.name}</option>
              ))}
            </select>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Team name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              autoFocus
              disabled={adding}
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowModal(false)}
                disabled={adding}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={adding || !newTeamName.trim() || !selectedLeagueId}
              >
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        </div>
      )}
      {/* Edit Modal */}
      {editTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setEditLoading(true);
              setError(null);
              try {
                const res = await fetch(`${API_BASE}/api/teams/${editTeam.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...editTeam, name: editName, leagueId: editLeagueId }),
                });
                if (!res.ok) throw new Error("Failed to update team");
                setTeams((prev) => prev.map(t => t.id === editTeam.id ? { ...t, name: editName, leagueId: editLeagueId } : t));
                setEditTeam(null);
              } catch (err: any) {
                setError(err.message || "Unknown error");
              } finally {
                setEditLoading(false);
              }
            }}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Edit Team</h2>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={editLeagueId ?? ''}
              onChange={e => setEditLeagueId(Number(e.target.value))}
              disabled={editLoading || !leagues.length}
            >
              {leagues.map(league => (
                <option key={league.id} value={league.id}>{league.name}</option>
              ))}
            </select>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
              disabled={editLoading}
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setEditTeam(null)}
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={editLoading || !editName.trim() || !editLeagueId}
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4">
            <h2 className="text-lg font-bold mb-2">Delete Team</h2>
            <p>Are you sure you want to delete this team?</p>
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={async () => {
                  setDeleteLoading(true);
                  setError(null);
                  try {
                    const res = await fetch(`${API_BASE}/api/teams/${deleteId}`, { method: "DELETE" });
                    if (!res.ok) throw new Error("Failed to delete team");
                    setTeams((prev) => prev.filter(t => t.id !== deleteId));
                    setDeleteId(null);
                  } catch (err: any) {
                    setError(err.message || "Unknown error");
                  } finally {
                    setDeleteLoading(false);
                  }
                }}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
} 