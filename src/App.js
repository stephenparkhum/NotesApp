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

class App extends Component {
  static contextType = FoldersContext;

  constructor(props) {
    super(props);
    this.state = {
      folderPaths: ['/', 'folder/:folderId'],
    };
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders', {
      method: 'GET'
    })
    .then(response => response.json())
    .then((data) => this.setState({folders: data}));
    
    fetch('http://localhost:9090/notes', {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data) => {this.setState({notes: data})});
  } 
  
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
          component={AddFolder}
        />
        <Route 
          path='/add-note' 
          component={AddNote} />


      </>
    )
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  } 

  routeAddFolder = (props) => {
    props.history.push('/')
  }

  addFolder = (folderName) => {
    const newData = [];
    newData.push({name: folderName})
    const url = 'http://localhost:9090/folders'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData[0].name),
    })
    .then(response => (response.json()))

  }

  addNote = (noteName, noteContent, noteFolder) => {
    const newData = [];
    newData.push({name: noteName, content: noteContent, folderId: noteFolder})
    const url = 'http://localhost:9090/notes'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData[0].name, newData[0].noteContent, newData[0].folderId),
    })
    .then(response => response.json())
  }

  render() { 

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote, 
      addFolder: this.addFolder,
      addNote: this.addNote,
      addFolderRoute: this.routeAddFolder,
      addNoteRoute: this.routeAddFolder,
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
