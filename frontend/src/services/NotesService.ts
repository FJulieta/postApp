const API_URL = 'http://localhost:3000/notes';

export const getActiveNotes = async () => {
  const res = await fetch(`${API_URL}/active`);
  return res.json();
};

export const createNote = async (note: { title: string; content: string }) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return res.json();
};

export const deleteNote = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const updateNote = async (
  id: number,
  note: { title: string; content: string }
) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
};
