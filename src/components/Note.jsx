import { deleteNoteFromDatabase} from "../indexedDbUtils.js";
import { useState } from "react";

export default function Note(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState({title: props.title, text: props.text});

    async function deleteNote(id) {
        // delete from dtabase
        await deleteNoteFromDatabase(id); 

        // delete from notes array
        const updatedNotes = props.notes.filter(note => note.id !== id);
        props.setNotes(updatedNotes);
    }

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleChange(e, input) {
        const value = e.target.value;
        if (input === 'title') {{
            setEditedText(prevText => {
                return {
                    ...prevText,
                    title: value,
                }
            })
        }} else if (input === 'text') {
            
            setEditedText(prevText => {
                return {
                    ...prevText,
                    text: value,
                }
            });
        }
    }

    function saveNote() {
        props.updateNote(props.id, editedText);
        setIsEditing(false);
    }

    return (
        <div className="note">
            <div className="content">
            {isEditing ? (
                <input className="edit-title" type="text" name={`editing-title-${props.id}`} id={`editing-title-${props.id}`} value={editedText.title} onChange={(e) => handleChange(e, 'title')}/>
            ) : <h1 className="note-title">{props.title}</h1>}

            {isEditing ? (
                <textarea className="edit-text" name={`editing-text-${props.id}`} id={`editing-text-${props.id}`} value={editedText.text} onChange={(e) => handleChange(e, 'text')}></textarea>
            ) : <p className="note-text">{props.text}</p>}
            </div>
            
            <div className="buttons">
              <button className="delete-btn" onClick={() => deleteNote(props.id)}></button>
              {isEditing ? (
                <button className="save-btn" onClick={saveNote}>save</button>
              ) : (
                <button className="edit-btn" onClick={handleEditClick}></button>
              )}
            </div>
        </div>
    )
}