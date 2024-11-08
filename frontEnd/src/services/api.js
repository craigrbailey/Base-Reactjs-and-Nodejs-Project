const API_URL = 'http://localhost:5000/api';

export const api = {
  async getAllNotes() {
    const response = await fetch(`${API_URL}/notes`);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  },

  async createNote(note) {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  },

  async updateNote(id, note) {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  },

  async deleteNote(id) {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');
    return response.json();
  },
}; 