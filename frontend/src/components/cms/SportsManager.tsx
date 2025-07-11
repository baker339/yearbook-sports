import * as React from 'react';

export default function SportsManager({ role }: { role: 'admin' | 'creator' }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Sports</h1>
      <p className="mb-4">
        {role === 'admin'
          ? 'Admins can create, edit, and delete sports.'
          : 'Content creators can create, edit, and delete sports.'}
      </p>
      <div className="card p-6">[Sports management table and forms will go here]</div>
    </div>
  );
} 