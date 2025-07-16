'use client';
import { useEffect, useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { Note } from '../types/note';
import styles from '../styles/Page.module.scss';

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) setNotes(JSON.parse(storedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteData: Omit<Note, 'id' | 'archived' | 'color'>) => {
    const pastelColors = [
      '#ff85d5', '#e79eff', '#b8e4ff', '#ff94a2', '#ffe180', '#d3f8e2', '#fbe7c6', '#fcd5ce',
    ];
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    const newNote: Note = {
      id: Date.now(),
      archived: false,
      color: randomColor,
      ...noteData,
    };
    setNotes(prev => [...prev, newNote]);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(prev =>
      prev.map(note => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditingNote(null);
  };

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const archiveNote = (id: number) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Sticky Notes</h1>
      <NoteForm
        onSubmit={(noteData) => {
          if (editingNote) {
            updateNote({ ...editingNote, ...noteData });
          } else {
            addNote(noteData);
          }
        }}
        editingNote={editingNote}
      />
      <NoteList
        notes={notes.filter(note => !note.archived)}
        onDelete={deleteNote}
        onEdit={setEditingNote}
      />
    </main>
  );
}
