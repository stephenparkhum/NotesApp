import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Header from './/Header/Header';
import NoteListNav from './/NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NoteListMain from './NoteListMain/NoteListMain';
// import dummyStore from './dummy-store';
import FolderPageMain from './FolderPageMain/FolderPageMain';
import FoldersContext from './FoldersContext';

class App extends Component {
  static contextType = FoldersContext;

  constructor(props) {
    super(props);
    this.state = {
      folderPaths: ['/', 'folder/:folderId'],
    };
  }

  // componentDidMount() {
  //   setTimeout(() => this.setState({folders: dummyStore.folders, notes: dummyStore.notes}), 500);
  // }

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
    const {notes, folders, folderPaths} = this.state;
    return (
      <>
        {
          folderPaths.map(path => (
            <Route 
              key={path}
              path={path}
              render={routeProps => (
                <NoteListNav 
                  folders={folders}
                  notes={notes}
                  {...routeProps}
                />
              )}
            />
          ))}
          <Route 
            path="/note/:noteId"
            render={routeProps => {
              const {noteId} = routeProps.match.params;
              const note = notes;
              const folder = folders;
              return <NotePageNav {...routeProps} folder={folder} />
            }}
          />
          <Route path='/add-folder' component={NotePageNav} />
          <Route path='/add-note' component={NotePageNav} />
      </>
    )
  }

  displayMain() {
    const {notes, folders, folderPaths} = this.state;
    return (
      <>
        {folderPaths.map(path => (
          <Route 
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = notes;
              return (
                <NoteListMain 
                    {...routeProps}
                    notes={notes}
                />
              )
            }}

          />
        ))}
        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            return <NotePageMain {...routeProps} note={routeProps.match.params.noteId} noteId={noteId} notes={notes}/>;
          }}
          />
        <Route 
          path={'/folder/:folderId'}
          render={routeProps => {
            const {folderId} = routeProps.match.params;
            return <FolderPageMain {...routeProps} folders={folders} notes={notes} folderId={folderId}/>
        }}
        />


      </>
    )
  }

  render() { 


    return ( 
      <div className="App">
        <Header />
        <main>
            {this.displayMain()}
        </main>
        <nav>{this.displayNavigation()}</nav>
      </div>
     );
  }
}
 
export default App;
