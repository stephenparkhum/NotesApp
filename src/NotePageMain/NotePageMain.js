import React from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import './NotePageMain.css';

export default function NotePageMain(props) {
    const displayActiveNote = (props) => {
        if (props.notes !== undefined) {
           for (let i = 0; i < props.notes.length; i++) {
               if (props.notes[i].id === props.noteId) {
                   return (
                       <div className="NotePageMain__display">
                        <h1>{props.notes[i].name}</h1>
                       <p>{props.notes[i].content}</p>
                       <p className="NotePageMain__mod_date"><small>{format(props.notes[i].modified, 'Do MMM YYYY')}</small></p>
                       <Link to='/'><button className="back_button">{`< Back`}</button></Link>                       
                       <button className="NotePageMain__delete-btn">DELETE</button>
                       </div>
                       
                   )
               }
           }
        }
    }

    return (
        <>
        {displayActiveNote(props)}
        </>
    )
}