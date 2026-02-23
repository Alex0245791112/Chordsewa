import React, { useState, useEffect, useCallback } from "react"
import "./App.css"
import SongList from "./components/SongList"
import SongForm from "./components/SongForm"
import Header from "./components/Header"

function App() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState("")

  // ✅ Use Vite proxy: frontend calls /api/... and Vite forwards to Django
  const API_BASE = "/api"

  const fetchSongs = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${API_BASE}/songs/`, {
        method: "GET",
        headers: { Accept: "application/json" },
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // ✅ Works for DRF pagination ({results: []}) AND plain lists ([])
      const list = Array.isArray(data) ? data : (data.results ?? [])
      setSongs(list)
    } catch (err) {
      console.error("Error fetching songs:", err)
      setError(err?.message || "Failed to fetch songs")
      setSongs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  const handleSongAdded = () => {
    setShowForm(false)
    fetchSongs()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bhajans & Chorus</h1>

          <button
            onClick={() => setShowForm((v) => !v)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showForm ? "Cancel" : "Add New Song"}
          </button>
        </div>

        {showForm && <SongForm onSongAdded={handleSongAdded} />}

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading songs...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Couldn’t load songs</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && <SongList songs={songs} />}
      </div>
    </div>
  )
}

export default App
