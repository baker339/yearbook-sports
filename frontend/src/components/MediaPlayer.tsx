import React from 'react';

export function MediaPlayer() {
  return (
    <div className="media-player">
      <div className="media-player-content flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded shadow-soft flex items-center justify-center">
            {/* Album art or podcast cover */}
            <span className="text-gray-400">🎧</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Podcast Title</div>
            <div className="text-xs text-gray-500">Episode Name</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-secondary px-2 py-1">⏮️</button>
          <button className="btn btn-primary px-4 py-2">▶️</button>
          <button className="btn btn-secondary px-2 py-1">⏭️</button>
        </div>
        <div className="w-1/3 flex items-center gap-2">
          <span className="text-xs text-gray-500">0:00</span>
          <div className="flex-1 h-1 bg-gray-200 rounded-full">
            <div className="h-1 bg-primary-500 rounded-full" style={{ width: '30%' }} />
          </div>
          <span className="text-xs text-gray-500">30:00</span>
        </div>
      </div>
    </div>
  );
} 