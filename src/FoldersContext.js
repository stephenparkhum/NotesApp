import React from 'react';

const FoldersContext = React.createContext({
    folders: [],
    notes: [],
    routeProps: {},
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {}
});

export default FoldersContext;

// export default FoldersContextClass FoldersContext;