import React, { useState } from 'react';

const NoteDetail = ({ note, onClose, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onUpdate(note.id, {
      title: title.trim(),
      content: content.trim()
    });
    setIsEditing(false);
  };

  return (
    <div className="note-detail-overlay">
      <div className="note-detail">
        <button className="close-icon" onClick={onClose}>×</button>
        <div className="note-detail-content">
          {!isEditing ? (
            <>
              <div className="note-detail-header">
                <h2>{note.title}</h2>
                <div>
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                  <button onClick={() => onDelete(note.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
              <p className="date">
                Created: {new Date(note.created_at).toLocaleDateString()}
                <br />
                Last updated: {new Date(note.updated_at).toLocaleDateString()}
              </p>
              <div className="content">
                <p>{note.content}</p>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="note-detail-header">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="title-input"
                />
                <div>
                  <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button type="submit" className="save-btn">Save</button>
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="content-input"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetail; 