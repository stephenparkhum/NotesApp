import React, { Component } from 'react';
import './AddFolder.css';
import FoldersContext from '../FoldersContext';

class AddFolder extends Component {
    static contextType = FoldersContext; 

    render() { 
        return ( 
            <FoldersContext.Consumer>
            {(value) => {
                return (
                    <>
                    <h1>ADD NEW FOLDER</h1>
                    <form className="AddFolder_form">
                        <label for="folder-title">Folder Name</label>
                        <input type="text" name="folder-title" id="folder-title" placeholder="Note Title"/>
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