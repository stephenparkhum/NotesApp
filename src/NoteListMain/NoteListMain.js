import React from 'react';
import {format} from 'date-fns';
import {Link} from 'react-router-dom';
import './NoteListMain.css';
import {FoldersContext, FoldersContextClass} from '../FoldersContext';

export default function NoteListMain(props) {
    const displayNotes = (props) => {
        if (props.notes !== undefined) {
            return (
                props.notes.map((item) => (
                    <div className="NoteList__note" key={item.id + '_div'}>
                        <Link to={`/note/${item.id}`}>
                            <h2 key={item.id + '_h2'}>{item.name}</h2>
                        </Link>
                        <p key={item.id + '_p'}><small>{format(item.modified,' Do MMM YYYY')}</small></p>
                    </div>
                    
                ))
            )
        }
    } 

    return (
        <>
        <div className="NoteList__main">
            {displayNotes(props)}
        </div>
            
        </>
    )
}
