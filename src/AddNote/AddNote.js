import React, { Component } from 'react';
import './AddNote.css';
import FoldersContext from '../FoldersContext';

class AddNote extends Component {
    static contextType = FoldersContext; 

    state = {
        newNoteName: '',
        newNoteContent: '',
        newNoteFolder: '',
    }

    updateNoteName(value) {
        this.setState({newNoteName: value});
    }

    updateNoteContent(content) {
        this.setState({newNoteContent: content});
    }

    updateNoteFolder(folder) {
        this.setState({newNoteFolder: folder});
    }

    render() { 
        const displayFolderOptions = (value) => {
            if (value.folders !== undefined) {
                return (
                    value.folders.map((option, key) => (
                        <>  
                            <option key={key}>{option.name}</option>
    
                        </>
                    ))
                )
                
            }
            
        };

        return ( 
            <FoldersContext.Consumer>
            {(value) => {
                return (
                    <>
                    <h1>ADD NEW NOTE</h1>
                    <form className="AddFolder_form">
                        <label htmlFor="note-title">Note Title</label>
                        <input type="text" name="note-title" id="note-title" placeholder="Note Title"/>
                        <label htmlFor="note-title">Note Content</label>
                        <textarea rows="4" cols="50" name="note-content" id="note-content"></textarea>
                        <label htmlFor="folder-select">Select Folder</label>
                        <select id="folder-select">
                            {displayFolderOptions(value)}
                        </select>
                    </form>
                    </>
                )
            }}
                 
            </FoldersContext.Consumer>
           
         );
    }
}
 
export default AddNote;