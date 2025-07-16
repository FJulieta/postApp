'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/NoteForm.module.scss';

type Props = {
  onSubmit: (note: { title: string; content: string }) => void;
  editingNote?: { title: string; content: string } | null;
};

export default function NoteForm({ onSubmit, editingNote }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">
        {editingNote ? 'Update Note' : 'Save Note'}
      </button>
    </form>
  );
}
