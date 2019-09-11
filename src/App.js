import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import './App.css';
import Header from './/Header/Header';
import NoteListNav from './/NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NoteListMain from './NoteListMain/NoteListMain';
import FolderPageMain from './FolderPageMain/FolderPageMain';
import FoldersContext from './FoldersContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import {format} from 'date-fns'

class App extends Component {
  static contextType = FoldersContext;

  constructor(props) {
    super(props);
    this.state = {
      folderPaths: ['/', 'folder/:folderId'],
      message: 'Here is a test message',
      showMessage: false,
      folderAddSuccess: false,
      noteAddSuccess: false,
      noteDeleteSuccess: false,
      folders: [],
      notes: []
    };
  }

  getNotesAndFolder() {
    fetch('https://murmuring-taiga-90020.herokuapp.com/api/folders', {
      method: 'GET'
    })
    .then(response => response.json())
    .then((data) => this.setState({folders: data}));
    
    fetch('https://murmuring-taiga-90020.herokuapp.com/api/notes', {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data) => {this.setState({notes: data});});
  }

  componentDidMount() {
    this.getNotesAndFolder();
    this.setState({noteAddSuccess: false, folderAddSuccess: false, noteDeleteSuccess: false});
  }

  // removeDeletedNote(noteId) {
  //   const newNoteList = this.state.notes.filter(note => note.id === noteId);
  //   this.setState({notes: newNoteList});
  // }
  
  displayNavigation() {
    const {folderPaths} = this.state;
    const {folders} = this.context;
    return (
      <>
        {
          folderPaths.map(path => (
            <Route 
              key={path}
              path={path}
              component={NoteListNav}
            />
          ))}
          <Route 
            path="/note/:noteId"
            render={routeProps => {
              const folder = folders;
              return <NotePageNav {...routeProps} folder={folder} />
            }}
          />
      </>
    )
  }

  displayMain() {
    const {folderPaths} = this.state;
    const {notes, folders} = this.context;
    return (
      <>
        {folderPaths.map(path => (
          <Route 
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            return (<NotePageMain {...routeProps} 
            note={routeProps.match.params.noteId} 
            noteId={noteId} 
            notes={notes}/>)
          }}
          />
        <Route 
          path={'/folder/:folderId'}
          render={routeProps => {
            const {folderId} = routeProps.match.params;
            return (<FolderPageMain {...routeProps} 
            folders={folders} 
            notes={notes} 
            noteId={folderId.noteId} 
            folderId={folderId}/>)
        }}
        />
        <Route 
          path='/add-folder' 
          render={({history}) => {
            return <AddFolder history={history}/>
          }} />
        <Route 
          path='/add-note' 
          render={({history}) => {
            return <AddNote history={history}/>
          }} />


      </>
    )
  }

  handleDeleteNote = (noteId, props) => {
    let newNoteArr = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNoteArr,
      folderAddSuccess: false,
      noteAddSuccess: false,
      noteDeleteSuccess: true
    })
    props.history.go('/');
  } 

  addFolder = (folderName) => {
    const newData = [];
    newData.push({title: folderName})
    const url = 'https://murmuring-taiga-90020.herokuapp.com/api/folders'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData[0]),
    })
    .then(response => response.json())
    .then(data => {this.getNotesAndFolder()})
    .then(this.setState({folderAddSuccess: true}))
  }

  addNote = (noteName, noteContent, noteFolder) => {
    const newData = [];
    newData.push({title: noteName, content: noteContent, folderId: noteFolder})
    const url = 'https://murmuring-taiga-90020.herokuapp.com/api/notes'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newData[0].title.title,
        content: newData[0].title.content,
        modified: format(Date.now(), 'YYYY/MM/DD HH:mm:ss'),
        folder_id: newData[0].title.folder_id,
      }),
    })
    .then(response => response.json())
    .then(data => {this.getNotesAndFolder()})
    .then(this.setState({noteAddSuccess: true}))
  }

  render() { 

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote, 
      addFolder: this.addFolder,
      addNote: this.addNote,
      folderAddSuccess: this.state.folderAddSuccess,
      noteAddSuccess: this.state.noteAddSuccess,
      getNotesAndFolder: this.getNotesAndFolder,
      removeDeletedNote: this.removeDeletedNote
      
    }

    return ( 
      <FoldersContext.Provider value={contextValue}>
      <div className="App">
        <Header />
          <main>
              {this.displayMain()}
          </main>
          <nav>{this.displayNavigation()}</nav>
          </div>
      </FoldersContext.Provider>
        
     
     );
  }
}
 
export default App;
