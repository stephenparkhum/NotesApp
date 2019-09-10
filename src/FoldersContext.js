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
    getNotesAndFolder: () => {},
    folderAddSuccess: false,
    folderSuccessMessage: 'Your new folder has been added!',
    noteAddSuccess: false,
    noteSuccessMessage: 'Your note has been added!',
    noteDeleteSuccess: false,
    noteDeleteMessage: `Your note has been deleted!`
});

export default FoldersContext;