import React from 'react';

const Note = ({ title, content, date, onClick }) => {
  // Truncate content if it's too long
  const truncatedContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <div className="note-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{truncatedContent}</p>
    </div>
  );
};

export default Note; 