import React from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import './FolderPageMain.css';

export default function FolderPageMain(props) {
    const displayFolderNotes = (props) => {
        if (props.notes && props.folders !== undefined) {
            return (
                <div>
                    {props.notes.map((note) => {
                        if (note.folderId === props.folderId) {
                            return (
                                <div className="NoteList__note">
                                <Link to={`/note/${note.id}`}>
                                    <h2 key={note.id + '_h2'}>{note.name}</h2>
                                </Link>
                                    <p key={note.id + '_p'}><small>{format(note.modified,' Do MMM YYYY')}</small></p>
                                    <button className="FolderPageMain__delete-btn">DELETE</button>    
                                </div>
                                )
                        }
                    })}
                </div>
            )
            
        }
    };


    // const displayFolderNotes = (props) => {
    //     let activeFolder = [];
    //     if (props.folders && props.notes !== undefined) {
    //         for (let i = 0; i < props.notes.length; i++) {
    //             if (note.folderId === props.folderId) {
    //                 activeFolder.push(note);
    //             }
    //         }
    //         activeFolder.map((note) => (
    //             <h1>{note.name}</h1>
    //         ))
    //     }
    // }

/* <div className="NoteList__note" key={note.id + '_div'}>
                    <Link to={`/note/${note.id}`}>
                        <h2 key={note.id + '_h2'}>{note.name}</h2>
                    </Link>
                    <p key={note.id + '_p'}><small>{format(note.modified,' Do MMM YYYY')}</small></p>
                </div> */




    
  

    return (
        <>
            <div className="NoteList__main">
                {displayFolderNotes(props)}
            </div>
        </>
    )
}