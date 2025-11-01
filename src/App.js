import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/api/notes')
      .then(r => r.json())
      .then(setNotes);
  }, []);

  const addNote = async () => {
    await fetch(process.env.REACT_APP_API + '/api/notes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, content })
    });
    // reload
    const r = await fetch(process.env.REACT_APP_API + '/api/notes');
    setNotes(await r.json());
    setTitle(''); setContent('');
  };

  return (
    <div className="container">
      <h1>Notes App</h1>
      <div className="editor">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your note..."></textarea>
        <button onClick={addNote}>Save</button>
      </div>
      <div className="notes">
        {notes.map(n => (
          <div key={n.Id} className="note">
            <h3>{n.Title}</h3>
            <p>{n.Content}</p>
            <small>{new Date(n.CreatedAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
