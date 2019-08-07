import React, { Component } from 'react';
import './AddFolder.css';
import FoldersContext from '../FoldersContext';
import FolderValidation from './FolderValidation';

class AddFolder extends Component {
    static contextType = FoldersContext; 

    state = {
        newFolderName: '',
        touched: false, 
        submitted: false,
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
        this.setState({submitted: true});
        this.confirmSubmit();
        return ({name: newFolderName});
    }

    validateFolderName() {
        const name = this.state.newFolderName.trim();
        if (name.length === 0) {
            return 'Folder Name is required';
        } else if (name.length < 6 || name.length > 100) {
            return 'Folder name must be between 6 and 100 characters';
    }}

    confirmSubmit() {
        const name = this.state.newFolderName.trim();
        return (`${name} has been created!`);
    }

    cancelButton() {
        return (this.props.history.push('/'));
    }

    render() { 
        const {newFolderName} = this.state;

        return ( 
            <FoldersContext.Consumer>
            {(value) => {
                return (
                    <>
                    <form 
                        className="AddFolder_form"
                        onSubmit={(e) => 
                            {if (this.state.touched) 
                                {value.addFolder(this.handleFolderSubmit(e, newFolderName))} this.props.history.push('/')}}
                            >
                        <label htmlFor="folderTitle">Folder Name</label>
                        <input 
                            type="text" 
                            name="folderTitle" 
                            id="folderTitle" 
                            placeholder="Folder Title"
                            onChange={e => this.updateFolderName(e.target.value)}
                            required
                            />
                        {this.state.touched && (
                            <FolderValidation message={this.validateFolderName()}/>
                        )}
                        <input type="submit" value="Save Folder"/>
                        {this.state.submitted && (
                            <FolderValidation message={this.confirmSubmit()}/>
                        )}
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
 
export default AddFolder;