import React, { Component } from 'react';

const FoldersContext = React.createContext({
    folders: [],
    notes: []
});

class FoldersContextClass extends Component {
    render() { 
        return ( 
            <FoldersContext.Provider value={{
                
            }}>
            {this.props.children}
            </FoldersContext.Provider>
         );
    }
}
 
export default {FoldersContextClass, FoldersContext};