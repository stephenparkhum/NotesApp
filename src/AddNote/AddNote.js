import React, { Component } from 'react';
import './AddNote.css';
import FoldersContext from '../FoldersContext';
import NoteValidation from './NoteValidation';

class AddNote extends Component {
    static contextType = FoldersContext; 

    static defaultProps = {
        match: {
            params: {}
        }
    }

    state = {
        newNoteName: '',
        noteNameTouched: false,
        newNoteContent: '',
        noteContentTouched: false,
        newNoteFolder: '',
        noteFolderTouched: false
    }

    updateNoteName(name) {
        this.setState({newNoteName: name, noteNameTouched: true});
    }

    updateNoteContent(content) {
        this.setState({newNoteContent: content, noteContentTouched: true});
    }

    updateNoteFolder(folder) {
        this.setState({newNoteFolder: folder, noteFolderTouched: true});
    }

    folderId(value, newNoteFolder) {
        for (let i = 0; i < value.folders.length; i++) {
            if (value.folders[i].name === newNoteFolder) {
                return value.folders[i].id;
            }
        }
    }

    validateNoteName() {
        const name = this.state.newNoteName.trim();
        if (name.length === 0) {
            return 'Note Title is required';
        } else if (name.length < 6 || name.length > 72) {
            return 'Note Title must be between 6 and 72 characters';
    }}

    validateNoteContent() {
        const name = this.state.newNoteContent.trim();
        if (name.length === 0) {
            return 'A note cannot be blank! Write out your thoughts!';
        } else if (name.length < 3 || name.length > 500) {
            return 'Your note must must be between 3 and 500 characters';
    }}

    handleNoteSubmit(event, newNoteName, newNoteContent, newNoteFolder, contextValue) {
        event.preventDefault();
        const postDate = Date.now();
        const folderId = this.folderId(contextValue, newNoteFolder);
        return {name: newNoteName, content: newNoteContent, folderId: folderId, modified: postDate};
    }

    render() { 
        const {newNoteContent, newNoteName, newNoteFolder} = this.state;
        const displayFolderOptions = (value) => {
            if (value.folders !== undefined) {
                return (
                    value.folders.map((option) => (
                        <>  
                            <option key={option.id}>{option.name}</option>
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
                    <form 
                        className="AddFolder_form"
                        onSubmit={(e) => value.addNote(this.handleNoteSubmit(e, newNoteName, newNoteContent, newNoteFolder, value))}>
                        <label htmlFor="note-title">Note Title</label>
                        <input 
                            type="text" 
                            name="note-title" 
                            id="note-title" 
                            placeholder="Note Title"
                            aria-label="New Note Title"
                            aria-required="true"
                            onChange={e => this.updateNoteName(e.target.value)}
                            />
                        {this.state.noteNameTouched && (
                            <NoteValidation message={this.validateNoteName()}/>
                        )}               
                        <label htmlFor="note-title">Note Content</label>
                        <textarea 
                            rows="4" 
                            cols="50" 
                            name="note-content" 
                            id="note-content"
                            aria-label="New Note Content"
                            aria-required="true"
                            onChange={e => this.updateNoteContent(e.target.value)}></textarea>
                        {this.state.noteContentTouched && (
                            <NoteValidation message={this.validateNoteContent()}/>
                        )}    
                        <label htmlFor="folder-select">Select Folder</label>
                        <select 
                            id="folder-select"
                            onChange={e => this.updateNoteFolder(e.target.value)}>
                            {displayFolderOptions(value)}
                        </select>
                        <input type="submit" value="Save Note" />
                    </form>
                    </>
                )
            }}
                 
            </FoldersContext.Consumer>
           
         );
    }
}
 
export default AddNote;