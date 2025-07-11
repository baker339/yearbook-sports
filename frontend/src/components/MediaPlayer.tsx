import React from 'react';

export function MediaPlayer() {
  return (
    <div className="media-player">
      <div className="media-player-content flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded shadow-soft flex items-center justify-center">
            {/* Album art or podcast cover */}
            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M9 9h6v6H9z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-sm">Podcast Title</div>
            <div className="text-xs text-gray-500">Episode Name</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-secondary px-2 py-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="btn btn-primary px-4 py-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21 5,3" fill="currentColor" />
            </svg>
          </button>
          <button className="btn btn-secondary px-2 py-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
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