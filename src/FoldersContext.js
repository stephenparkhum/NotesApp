import React from 'react';

const FoldersContext = React.createContext({
    folders: [],
    notes: [],
    routeProps: {},
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
    addFolderRoute: () => {},
    addNoteRoute: () => {}
});

export default FoldersContext;

// export default FoldersContextClass FoldersContext;