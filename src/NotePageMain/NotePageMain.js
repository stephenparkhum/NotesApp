import React, { Component } from 'react';
import FoldersContext from '../FoldersContext';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import './NotePageMain.css';
import PropTypes from 'prop-types';

class NotePageMain extends Component {
    static defaultProps ={
        onDeleteNote: () => {},
        match: {
            params: {}
        }
    }

    static contextType = FoldersContext

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.match.params.noteId
    
        fetch(`https://murmuring-taiga-90020.herokuapp.com/api/notes/${noteId}`, {
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
            const currentNote = notes.notes.filter(note => note.id == noteId);
            if (notes.notes !== undefined) {
              return (
                <div className="NotePageMain__display">
                   <h1>{currentNote[0].title}</h1>
                   <p>{currentNote[0].content}</p>
                   <p className="NotePageMain__mod_date"><small>{format(currentNote[0].modified, 'Do MMM YYYY')}</small></p>
                   <Link to='/'><button className="back_button">{`< Back`}</button></Link>                       
                   <button className="NotePageMain__delete-btn" onClick={this.handleClickDelete}><i className="fas fa-trash"></i></button>
                </div>
              )
             

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