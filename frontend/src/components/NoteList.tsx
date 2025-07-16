import { Note } from '../types/note';
import styles from '../styles/NoteList.module.scss';

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
};

export default function NoteList({ notes, onDelete, onEdit }: Props) {
  return (
    <div className={styles.noteList}>
      {notes.map((note) => (
        <div
          key={note.id}
          className={styles.noteCard}
          style={{ backgroundColor: note.color }} 
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className={styles.actions}>
            <button onClick={() => onEdit(note)}>Edit</button>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
