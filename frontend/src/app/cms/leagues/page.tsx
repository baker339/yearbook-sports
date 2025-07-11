"use client";
import * as React from "react";

interface League {
  id: number;
  name: string;
  sportId: number;
}

interface Sport { id: number; name: string; }

export default function LeaguesListPage() {
  const [leagues, setLeagues] = React.useState<League[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [newLeagueName, setNewLeagueName] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [editLeague, setEditLeague] = React.useState<League | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editLoading, setEditLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [sports, setSports] = React.useState<Sport[]>([]);
  const [selectedSportId, setSelectedSportId] = React.useState<number | null>(null);
  const [editSportId, setEditSportId] = React.useState<number | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002";

  React.useEffect(() => {
    async function fetchLeagues() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/leagues`);
        if (!res.ok) throw new Error("Failed to fetch leagues");
        const data = await res.json();
        setLeagues(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    async function fetchSports() {
      try {
        const res = await fetch(`${API_BASE}/api/sports`);
        if (!res.ok) throw new Error("Failed to fetch sports");
        const data = await res.json();
        setSports(data);
        if (data.length && selectedSportId === null) setSelectedSportId(data[0].id);
      } catch {}
    }
    fetchLeagues();
    fetchSports();
  }, []);

  async function handleAddLeague(e: React.FormEvent) {
    e.preventDefault();
    if (!newLeagueName.trim() || !selectedSportId) return;
    setAdding(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/leagues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newLeagueName, sportId: selectedSportId }),
      });
      if (!res.ok) throw new Error("Failed to add league");
      const created = await res.json();
      setLeagues((prev) => [
        ...prev,
        {
          id: Number(created.id),
          name: String(created.name),
          sportId:
            typeof created.sportId === 'number' && !isNaN(created.sportId)
              ? created.sportId
              : typeof selectedSportId === 'number' && !isNaN(selectedSportId)
                ? selectedSportId
                : 0,
        },
      ]);
      setNewLeagueName("");
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
        <h1 className="text-2xl font-bold">Leagues</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          + Add League
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {leagues.map((league) => (
            <li key={league.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <span>{league.name} <span className="text-gray-400 text-sm">({sports.find(s => s.id === league.sportId)?.name || 'Unknown Sport'})</span></span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={() => { setEditLeague(league); setEditName(league.name); setEditSportId(league.sportId); }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setDeleteId(league.id)}
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
            onSubmit={handleAddLeague}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Add New League</h2>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={selectedSportId ?? ''}
              onChange={e => setSelectedSportId(Number(e.target.value))}
              disabled={adding || !sports.length}
            >
              {sports.map(sport => (
                <option key={sport.id} value={sport.id}>{sport.name}</option>
              ))}
            </select>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="League name"
              value={newLeagueName}
              onChange={(e) => setNewLeagueName(e.target.value)}
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
                disabled={adding || !newLeagueName.trim() || !selectedSportId}
              >
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        </div>
      )}
      {/* Edit Modal */}
      {editLeague && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setEditLoading(true);
              setError(null);
              try {
                const res = await fetch(`${API_BASE}/api/leagues/${editLeague.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...editLeague, name: editName, sportId: editSportId }),
                });
                if (!res.ok) throw new Error("Failed to update league");
                setLeagues((prev) => prev.map(l => l.id === editLeague.id ? { ...l, name: editName, sportId: editSportId } : l));
                setEditLeague(null);
              } catch (err: any) {
                setError(err.message || "Unknown error");
              } finally {
                setEditLoading(false);
              }
            }}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Edit League</h2>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={editSportId ?? ''}
              onChange={e => setEditSportId(Number(e.target.value))}
              disabled={editLoading || !sports.length}
            >
              {sports.map(sport => (
                <option key={sport.id} value={sport.id}>{sport.name}</option>
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
                onClick={() => setEditLeague(null)}
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={editLoading || !editName.trim() || !editSportId}
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
            <h2 className="text-lg font-bold mb-2">Delete League</h2>
            <p>Are you sure you want to delete this league?</p>
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
                    const res = await fetch(`${API_BASE}/api/leagues/${deleteId}`, { method: "DELETE" });
                    if (!res.ok) throw new Error("Failed to delete league");
                    setLeagues((prev) => prev.filter(l => l.id !== deleteId));
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
  