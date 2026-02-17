import React, { useState, useEffect } from 'react'
import './App.css'
import SongList from './components/SongList'
import SongForm from './components/SongForm'
import Header from './components/Header'

function App() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const API_BASE = 'http://localhost:8000/api'

  // Fetch songs from backend
  const fetchSongs = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/songs/`)
      const data = await response.json()
      setSongs(data.results || [])
    } catch (error) {
      console.error('Error fetching songs:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSongs()
  }, [])

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
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showForm ? 'Cancel' : 'Add New Song'}
          </button>
        </div>

        {showForm && <SongForm onSongAdded={handleSongAdded} />}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading songs...</p>
          </div>
        ) : (
          <SongList songs={songs} />
        )}
      </div>
    </div>
  )
}

export default App
