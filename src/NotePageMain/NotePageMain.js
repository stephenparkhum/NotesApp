import React, { Component } from 'react';
import FoldersContext from '../FoldersContext';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import './NotePageMain.css';
import PropTypes from 'prop-types';

class NotePageMain extends Component {
    static defaultProps = {
        onDeleteNote: () => {},
        match: {
            params: {}
        }
    }

    static contextType = FoldersContext

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.match.params.noteId
    
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(() => {
            this.context.deleteNote(noteId)
            this.handleDeleteNote(noteId)
          })
          .catch(error => {
            console.error({ error })
          })
      }

      handleDeleteNote = noteId => {
        this.props.history.push(`/`)
      }

    render() { 
        const displayActiveNote = (notes) => {
            const noteId = this.props.note;
            if (notes.notes !== undefined) {
               for (let i = 0; i < notes.notes.length; i++) {
                   if (notes.notes[i].id === noteId) {
                       return (
                           <div className="NotePageMain__display">
                            <h1>{notes.notes[i].name}</h1>
                           <p>{notes.notes[i].content}</p>
                           <p className="NotePageMain__mod_date"><small>{format(notes.notes[i].modified, 'Do MMM YYYY')}</small></p>
                           <Link to='/'><button className="back_button">{`< Back`}</button></Link>                       
                           <button className="NotePageMain__delete-btn" onClick={this.handleClickDelete}><i className="fas fa-trash"></i></button>
                           </div>
                           
                       )
                   }
               }
            }
        }

        return ( 
            <FoldersContext.Consumer>
                {(value) => {
                    return (
                        displayActiveNote(value)
                    )
                    
                }}
            </FoldersContext.Consumer>
         );
    }
}

NotePageMain.propTypes = {
  note: PropTypes.string,
  noteId: PropTypes.string,
  notes: PropTypes.array,
}
 
export default NotePageMain;