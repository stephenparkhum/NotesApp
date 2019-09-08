import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import './FolderPageMain.css';
import FoldersContext from '../FoldersContext';    
import PropTypes from 'prop-types';

class FolderPageMain extends Component {
    static defaultProps ={
        onDeleteNote: () => {},
        match: {
            params: {}
        }
    }

    static contextType = FoldersContext

    render() { 
        const displayFolderNotes = (value) => {
            const folderId = this.props.folderId;
            if (value.notes && value.folders !== undefined) {
                return (
                    <div>
                        {value.notes.map((note) => {
                            if (note.folder_Id === folderId) {
                                return (
                                    <div className="NoteList__note" key={note.id + '_div'}>
                                    <Link to={`/note/${note.id}`}>
                                        <h2 key={note.id + '_h2'}>{note.title}</h2>
                                    </Link>
                                        <p key={note.id + '_p'}><small>{format(note.modified,' Do MMM YYYY')}</small></p>
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

FolderPageMain.propTypes = {
    folders: PropTypes.array,
    notes: PropTypes.array,
    noteId: PropTypes.string,
    folderId: PropTypes.string
}
    
export default FolderPageMain;