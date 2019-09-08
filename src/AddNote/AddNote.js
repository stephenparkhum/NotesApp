import React, { Component } from 'react';
import './AddNote.css';
import FoldersContext from '../FoldersContext';
import NoteValidation from './NoteValidation';
import {format} from 'date-fns'

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
        noteFolderTouched: false,
        newNoteFull: {}
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
            if (value.folders[i].title === newNoteFolder) {
                return (value.folders[i].id);
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
        const postDate = format(Date.now(), 'YYYY/mm/dd HH:mm:ss');
        const folderId = this.folderId(contextValue, newNoteFolder);
        const newNote = {title: newNoteName, content: newNoteContent, folder_id: folderId, modified: postDate};
        return (newNote);
    }

    cancelButton() {
        return (this.props.history.push('/'));
    }

    render() { 
        const {newNoteContent, newNoteName, newNoteFolder} = this.state;
        const displayFolderOptions = (value) => {
            if (value.folders !== undefined) {
                return (
                    value.folders.map((option) => (
                        <>  
                            <option key={option.folder_id}>{option.title}</option>
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
                        onSubmit={(e) => {value.addNote(this.handleNoteSubmit(e, newNoteName, newNoteContent, newNoteFolder, value)); this.props.history.push('/')}}>
                        <label htmlFor="title">Note Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            placeholder="Note Title"
                            onChange={e => this.updateNoteName(e.target.value)}
                            required
                            />
                        {this.state.noteNameTouched && (
                            <NoteValidation message={this.validateNoteName()}/>
                        )}               
                        <label htmlFor="content">Note Content</label>
                        <textarea 
                            rows="4" 
                            cols="50" 
                            name="content" 
                            id="content"
                            required
                            onChange={e => this.updateNoteContent(e.target.value)}></textarea>
                
                        {this.state.noteContentTouched && (
                            <NoteValidation message={this.validateNoteContent()}/>
                        )}    
                        <label htmlFor="folder-select">Select Folder</label>
                        <select 
                            id="folder-select"
                            required
                            onChange={e => this.updateNoteFolder(e.target.value)}>
                            {displayFolderOptions(value)}
                        </select>
                        <input type="submit" value="Save Note" />
                        <input 
                            type="button" 
                            value="Cancel" 
                            className="Nav_Cancel_Btn"
                            onClick={() => this.cancelButton()}
                            />
                    </form>
                    </>
                )
            }}
                 
            </FoldersContext.Consumer>
           
         );
    }
}
 
export default AddNote;