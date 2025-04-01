import Blabberings from "./components/Blabberings.jsx";
import Note from "./components/Note.jsx";

import { v4 as uuidv4 } from 'uuid';
import { saveNotes, getNotes } from "./indexedDbUtils.js";
import { useEffect, useRef, useState } from "react";


function App() {
  const [notes, setNotes] = useState([]);
  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);

  // save notes to database anytime a change occurs
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // load notes from database on refresh or open
  useEffect(() => {
    const loadData = async () => {
      const savedNotes = await getNotes();
      if (savedNotes) {
        const sortedNotes = savedNotes.sort((a, b) => (a.createdAt - b.createdAt));
        setNotes(sortedNotes);
      }
    }
    loadData();
  }, [])

  const noteElements = notes.map(note => {
    return (
      <Note key={note.id} id={note.id} title={note.title} text={note.text} setNotes={setNotes} notes={notes} updateNote={updateNote}/>
    )
  })

  function createNote(e) {
    e.preventDefault();

    const title = titleInputRef.current.value;
    const text = textInputRef.current.value;
    const id = uuidv4();
    const createdAt = Date.now();
    
    const newNote = {title: title, text: text, id: id, createdAt: createdAt};
    
    setNotes(prevNotes => [...prevNotes, newNote]);

    textInputRef.current.value = '';
    titleInputRef.current.value = '';
  }

  function updateNote(id, newText) {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        const {title, text} = newText;
        return {...note, title: title, text: text};
      } else {
        return note;
      }
    })

    setNotes(updatedNotes);

  }

  return (
    <> 
      <main>

      <div className="notes-app">
        <h1>notes</h1>

        <form className="create-note-form" onSubmit={createNote}>
          <input type="text" name="note-title-input" id="note-title-input" ref={titleInputRef} placeholder="enter note title" />
          <textarea name="note-text-input" id="notes-text-input" ref={textInputRef} placeholder="enter note"></textarea>
          <button>create note</button>
        </form>

        <div className="notes">
           {noteElements}
        </div>
      </div>

      
      <Blabberings />
      </main>
      
    </>
  )
}

export default App
