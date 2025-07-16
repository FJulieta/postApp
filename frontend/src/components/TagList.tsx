'use client';
import { useState } from 'react';
import { createNote } from '@/services/NotesService';

export default function NewNoteCard({ onRefresh }: { onRefresh: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    await createNote({ title, content });
    setTitle('');
    setContent('');
    onRefresh();
  };

  return (
    <div className="h-48 bg-postit-yellow rounded-lg shadow p-4 flex flex-col">
      <input
        className="font-semibold bg-transparent mb-1 outline-none"
        placeholder="Title…"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="flex-1 bg-transparent text-sm outline-none resize-none"
        placeholder="Content…"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="self-end text-xs mt-1 hover:underline">
        Save
      </button>
    </div>
  );
}
