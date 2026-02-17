import React from 'react'
import SongCard from './SongCard'

export default function SongList({ songs }) {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No songs yet. Create your first one!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  )
}
