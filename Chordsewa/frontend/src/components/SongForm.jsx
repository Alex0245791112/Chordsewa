import React, { useState } from 'react'

export default function SongForm({ onSongAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    original_key: '',
    section: 'bhajan',
    slot: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_BASE = 'http://localhost:8000/api'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = {
        title: formData.title,
        original_key: formData.original_key || null,
        section: formData.section,
        slot: formData.slot ? parseInt(formData.slot) : null,
      }

      const response = await fetch(`${API_BASE}/songs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to create song')
      }

      setFormData({
        title: '',
        original_key: '',
        section: 'bhajan',
        slot: '',
      })
      onSongAdded()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Song</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Song Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g., Sukh Shanti Pamai"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="original_key" className="block text-sm font-medium text-gray-700 mb-1">
              Original Key
            </label>
            <input
              type="text"
              id="original_key"
              name="original_key"
              value={formData.original_key}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g., C, Em, G"
              maxLength="5"
            />
          </div>

          <div>
            <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
              Section *
            </label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="bhajan">Bhajan</option>
              <option value="chorus">Chorus</option>
              <option value="baal_chorus">Baal Chorus</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="slot" className="block text-sm font-medium text-gray-700 mb-1">
            Slot Number (Optional)
          </label>
          <input
            type="number"
            id="slot"
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g., 1, 2, 3"
            min="1"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Creating...' : 'Create Song'}
        </button>
      </div>
    </form>
  )
}
