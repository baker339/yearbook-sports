"use client";
import * as React from "react";

interface Sport {
  id: number;
  name: string;
}

export default function SportsListPage() {
  const [sports, setSports] = React.useState<Sport[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [newSportName, setNewSportName] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [editSport, setEditSport] = React.useState<Sport | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editLoading, setEditLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002";

  React.useEffect(() => {
    async function fetchSports() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/sports`);
        if (!res.ok) throw new Error("Failed to fetch sports");
        const data = await res.json();
        setSports(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchSports();
  }, []);

  async function handleAddSport(e: React.FormEvent) {
    e.preventDefault();
    if (!newSportName.trim()) return;
    setAdding(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/sports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSportName }),
      });
      if (!res.ok) throw new Error("Failed to add sport");
      const created = await res.json();
      setSports((prev) => [...prev, created]);
      setNewSportName("");
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
        <h1 className="text-2xl font-bold">Sports</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          + Add Sport
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {sports.map((sport) => (
            <li key={sport.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <span>{sport.name}</span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={() => { setEditSport(sport); setEditName(sport.name); }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setDeleteId(sport.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddSport}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Add New Sport</h2>
            <input
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Sport name"
              value={newSportName}
              onChange={(e) => setNewSportName(e.target.value)}
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
                disabled={adding || !newSportName.trim()}
              >
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        </div>
      )}
      {/* Edit Modal */}
      {editSport && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setEditLoading(true);
              setError(null);
              try {
                const res = await fetch(`${API_BASE}/api/sports/${editSport.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...editSport, name: editName }),
                });
                if (!res.ok) throw new Error("Failed to update sport");
                setSports((prev) => prev.map(s => s.id === editSport.id ? { ...s, name: editName } : s));
                setEditSport(null);
              } catch (err: any) {
                setError(err.message || "Unknown error");
              } finally {
                setEditLoading(false);
              }
            }}
            className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold mb-2">Edit Sport</h2>
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
                onClick={() => setEditSport(null)}
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={editLoading || !editName.trim()}
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
            <h2 className="text-lg font-bold mb-2">Delete Sport</h2>
            <p>Are you sure you want to delete this sport?</p>
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
                    const res = await fetch(`${API_BASE}/api/sports/${deleteId}`, { method: "DELETE" });
                    if (!res.ok) throw new Error("Failed to delete sport");
                    setSports((prev) => prev.filter(s => s.id !== deleteId));
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