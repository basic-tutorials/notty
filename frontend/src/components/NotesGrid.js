import React from 'react';
import './NotesGrid.css';

const notes = [
  { id: 1, title: 'This is Docket note.', color: '#ffb866' },
  { id: 2, title: 'The beginning of screenless design', date: 'May 21, 2020', color: '#f7dd65' },
  { id: 3, title: '13 Things You Should Give Up...', date: 'May 25, 2020', color: '#ff8a66' },
  { id: 4, title: '10 UI & UX Lessons', color: '#b89cff' },
  { id: 5, title: '52 Research Terms...', color: '#b8f38b' },
  { id: 6, title: 'Text fields & Forms design', color: '#60d4f7' },
];

const NotesGrid = () => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-card" key={note.id} style={{ backgroundColor: note.color }}>
          <h2>{note.title}</h2>
          {note.date && <p>{note.date}</p>}
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
