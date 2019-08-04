import React, { Component } from 'react';
import './AddFolder.css';
import FoldersContext from '../FoldersContext';
import FolderValidation from './FolderValidation';

class AddFolder extends Component {
    static contextType = FoldersContext; 

    state = {
        newFolderName: '',
        touched: false
    }

    updateFolderName(name) {
        this.setState({newFolderName: name, touched: true});
    }

    getNewFolderId(event, value) {
        for (let i = 0; i < value.folders.length; i++) {
            if (value.folders[i].name === event.tartget.value) {
                return (
                   value.folders[i].id
                );
            }
        }
    }

    handleFolderSubmit(event, newFolderName) {
        event.preventDefault();
        return {name: newFolderName, };
    }

    validateFolderName() {
        const name = this.state.newFolderName.trim();
        if (name.length === 0) {
            return 'Folder Name is required';
        } else if (name.length < 6 || name.length > 100) {
            return 'Folder name must be between 6 and 100 characters';
    }}

    render() { 

        const {newFolderName} = this.state;

        return ( 
            <FoldersContext.Consumer>
            {(value) => {
                return (
                    <>
                    <form 
                        className="AddFolder_form"
                        onSubmit={(e) => value.addFolder(this.handleFolderSubmit(e, newFolderName))}>
                        <label htmlFor="folderTitle">Folder Name</label>
                        <input 
                            type="text" 
                            name="folderTitle" 
                            id="folderTitle" 
                            placeholder="Note Title"
                            onChange={e => this.updateFolderName(e.target.value)}
                            />
                        {this.state.touched && (
                            <FolderValidation message={this.validateFolderName()}/>
                        )}
                        <input type="submit" value="Save Folder"/>
                    </form>
                    </>
                )
            }}
                 
            </FoldersContext.Consumer>
           
         );
    }
}
 
export default AddFolder;