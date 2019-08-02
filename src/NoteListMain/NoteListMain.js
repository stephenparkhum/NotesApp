import React, { Component } from 'react'
import {format} from 'date-fns';
import {Link} from 'react-router-dom';
import './NoteListMain.css';
import FoldersContext from '../FoldersContext';


class NoteListMain extends Component {
    static contextType = FoldersContext
    render() {
        const displayNotes = (notes) => {
            if (notes.notes !== undefined) {
                return (
                    notes.notes.map((item) => (
                        <div className="NoteList__note" key={item.id + '_div'}>
                            <Link to={`/note/${item.id}`}>
                                <h2 key={item.id + '_h2'}>{item.name}</h2>
                            </Link>
                            <p key={item.id + '_p'}><small>{format(item.modified,' Do MMM YYYY')}</small></p>
                        </div>
                        
                    ))
                )
            }
        }  
        return ( 
            <FoldersContext.Consumer>
                {(value) => {
                    return (
                        <>
                            <div className="NoteList__main">
                                {displayNotes(value)}
                            </div>
                        
                        </>
                    )
                }}
            </FoldersContext.Consumer>
            

        );
    }
}
 
export default NoteListMain;

// export default function NoteListMain(this.context) {
    

//     return (
        
//     )
// }
