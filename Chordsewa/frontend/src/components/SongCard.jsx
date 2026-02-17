import React from 'react'

export default function SongCard({ song }) {
  const sectionColors = {
    bhajan: 'bg-purple-100 text-purple-800',
    chorus: 'bg-green-100 text-green-800',
    baal_chorus: 'bg-blue-100 text-blue-800',
    other: 'bg-gray-100 text-gray-800',
  }

  const backgroundColor = sectionColors[song.section] || sectionColors.other

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{song.title}</h2>
          {song.original_key && (
            <p className="text-gray-600 text-sm mb-2">🎼 Key: <span className="font-mono font-bold">{song.original_key}</span></p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${backgroundColor}`}>
          {song.section === 'baal_chorus' ? 'Baal Chorus' : song.section.charAt(0).toUpperCase() + song.section.slice(1)}
        </span>
        {song.slot && (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-800">
            Slot {song.slot}
          </span>
        )}
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3">
          📝 Versions: <span className="font-bold">{song.versions?.length || 0}</span>
        </p>
        
        {song.versions && song.versions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-700 uppercase">Latest Version:</p>
            {song.versions.slice(0, 1).map((version) => (
              <div key={version.id} className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-600">by <span className="font-semibold">{version.user}</span></p>
                <p className="text-xs text-gray-600">Key: <span className="font-mono">{version.key || 'Original'}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
        Added: {new Date(song.created_at).toLocaleDateString()}
      </div>

      <button className="mt-4 w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded transition-colors">
        View Details
      </button>
    </div>
  )
}
