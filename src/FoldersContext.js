import React, { Component } from 'react';

const FoldersContext = React.createContext({
    folders: [],
    notes: [],
    deteleFolder: () => {},
    deleteNote: () => {}
});

export default FoldersContext;

// export default FoldersContextClass FoldersContext;