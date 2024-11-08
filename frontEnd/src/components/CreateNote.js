import React, { useState } from 'react';

const CreateNote = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onSave({
      title: title.trim(),
      content: content.trim()
    });
  };

  return (
    <div className="note-detail-overlay">
      <div className="note-detail">
        <form onSubmit={handleSubmit}>
          <div className="note-detail-header">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
            <div>
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </div>
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="content-input"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateNote; 