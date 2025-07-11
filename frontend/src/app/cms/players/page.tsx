"use client";
import * as React from "react";

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  teamId: number;
}

interface Team { id: number; name: string; }

export default function PlayersListPage() {
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [newFirstName, setNewFirstName] = React.useState("");
  const [newLastName, setNewLastName] = React.useState("");
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [editPlayer, setEditPlayer] = React.useState<Player | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editLoading, setEditLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(null);
  const [editTeamId, setEditTeamId] = React.useState<number | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002";

  React.useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/players`);
        if (!res.ok) throw new Error("Failed to fetch players");
        const data = await res.json();
        setPlayers(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    async function fetchTeams() {
      try {
        const res = await fetch(`${API_BASE}/api/teams`);
        if (!res.ok) throw new Error("Failed to fetch teams");
        const data = await res.json();
        setTeams(data);
        if (data.length && selectedTeamId === null) setSelectedTeamId(data[0].id);
      } catch {}
    }
    fetchPlayers();
    fetchTeams();
  }, []);

  async function handleAddPlayer(e: React.FormEvent) {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim() || !selectedTeamId) return;
    setAdding(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: newFirstName, lastName: newLastName, teamId: selectedTeamId }),
      });
      if (!res.ok) throw new Error("Failed to add player");
      const created = await res.json();
      setPlayers((prev) => [
        ...prev,
        {
          id: Number(created.id),
          firstName: String(created.firstName),
          lastName: String(created.lastName),
          teamId: Number(created.teamId ?? selectedTeamId ?? 0) || 0,
        },
      ]);
      setNewFirstName("");
      setNewLastName("");
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
        <h1 className="text-2xl font-bold">Players</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          + Add Player
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {players.map((player) => (
            <li key={player.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <span>{player.firstName} {player.lastName} <span className="text-gray-400 text-sm">({teams.find(t => t.id === player.teamId)?.name || 'Unknown Team'})</span></span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={() => { setEditPlayer(player); setEditFirstName(player.firstName); setEditLastName(player.lastName); setEditTeamId(player.teamId); }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setDeleteId(player.id)}
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
            onSubmit={handleAddPlayer}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Add New Player</h2>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={selectedTeamId ?? ''}
              onChange={e => setSelectedTeamId(Number(e.target.value))}
              disabled={adding || !teams.length}
            >
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="First name"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              autoFocus
              disabled={adding}
            />
            <input
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Last name"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
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
                disabled={adding || !newFirstName.trim() || !newLastName.trim() || !selectedTeamId}
              >
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        </div>
      )}
      {/* Edit Modal */}
      {editPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setEditLoading(true);
              setError(null);
              try {
                const res = await fetch(`${API_BASE}/api/players/${editPlayer.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...editPlayer, firstName: editFirstName, lastName: editLastName, teamId: editTeamId }),
                });
                if (!res.ok) throw new Error("Failed to update player");
                setPlayers((prev) => prev.map(p => p.id === editPlayer.id ? { ...p, firstName: editFirstName, lastName: editLastName, teamId: editTeamId } : p));
                setEditPlayer(null);
              } catch (err: any) {
                setError(err.message || "Unknown error");
              } finally {
                setEditLoading(false);
              }
            }}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Edit Player</h2>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={editTeamId ?? ''}
              onChange={e => setEditTeamId(Number(e.target.value))}
              disabled={editLoading || !teams.length}
            >
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
              autoFocus
              disabled={editLoading}
            />
            <input
              className="border border-gray-300 rounded px-3 py-2"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
              disabled={editLoading}
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setEditPlayer(null)}
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={editLoading || !editFirstName.trim() || !editLastName.trim() || !editTeamId}
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
            <h2 className="text-lg font-bold mb-2">Delete Player</h2>
            <p>Are you sure you want to delete this player?</p>
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
                    const res = await fetch(`${API_BASE}/api/players/${deleteId}`, { method: "DELETE" });
                    if (!res.ok) throw new Error("Failed to delete player");
                    setPlayers((prev) => prev.filter(p => p.id !== deleteId));
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
  