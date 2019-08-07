import React from 'react';

const FoldersContext = React.createContext({
    folders: [],
    notes: [],
    routeProps: {},
    messsage: '',
    showMessage: false,
    displayMessage: () => {},
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
    folderAddSuccess: false,
    folderSuccessMessage: 'Your new folder has been added!',
    noteAddSuccess: false,
    noteSuccessMessage: 'Your note has been added!',
});

export default FoldersContext;