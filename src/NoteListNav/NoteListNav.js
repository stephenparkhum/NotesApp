import React from 'react';
import {format} from 'date-fns';
import {Link, NavLink} from 'react-router-dom';
import './NoteListNav.css';

export default function NoteListNav(props) {
    const displayFolders = (props) => {
        if (props.folders !== undefined) {
            return (
                props.folders.map((folder) => (
                    <NavLink to={`/folder/${folder.id}`} key={folder.id + 1} activeClassName="NoteListNav__active">
                    <button key={folder.id}>{folder.name}</button>
                    </NavLink>
                    
                ))
            )
        }
    };

    


    return (
        <>
        <div className="NoteList__nav">
            <h2>FOLDERS</h2>
            <div className="NoteList__nav-btn">
            {displayFolders(props)}
            </div>
        </div>
            
        </>
    )
}