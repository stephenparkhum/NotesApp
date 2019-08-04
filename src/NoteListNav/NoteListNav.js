import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './NoteListNav.css';
import FoldersContext from '../FoldersContext';

class NoteListNav extends Component {
    static contextType = FoldersContext
    render() { 
        const displayFolders = (folders) => {
            if (folders !== undefined) {
                return (
                    folders.map((folder) => (
                        <NavLink to={`/folder/${folder.id}`} key={folder.id + 1} activeClassName="NoteListNav__active">
                        <button key={folder.id}>{folder.name}</button>
                        </NavLink>
                        
                    ))
                )
            }
        };
        return ( 
            <FoldersContext.Consumer>
                {(value) => {
                    return (
                        <div className="NoteList__nav">
                            <h2>FOLDERS</h2>
                            <div className="NoteList__nav-btn">
                            {displayFolders(value.folders)}
                            <NavLink to='/add-folder'>
                            <button className="add-folder-btn">ADD FOLDER +</button>
                            </NavLink>
                            <NavLink to='/add-note'>
                            <button className="add-note-btn">ADD NOTE +</button>
                            </NavLink>
                            </div>
                        </div>
                    )
                }}
        
        </FoldersContext.Consumer>
         );
    }
}
 
export default NoteListNav;