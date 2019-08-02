import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import './FolderPageMain.css';
import FoldersContext from '../FoldersContext';    

class FolderPageMain extends Component {
    static contextType = FoldersContext
    render() { 
        const displayFolderNotes = (value) => {
            const folderId = this.props.folderId;
            if (value.notes && value.folders !== undefined) {
                return (
                    <div>
                        {value.notes.map((note) => {
                            if (note.folderId === folderId) {
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
        return ( 
            <FoldersContext.Consumer>
                {(value) => {
                    return (
                        <div className="NoteList__main">
                            {displayFolderNotes(value)}
                        </div>
                    )
                }}
            </FoldersContext.Consumer>
            );
    }
}
    
export default FolderPageMain;