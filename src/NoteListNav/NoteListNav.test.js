import React from 'react';
import ReactDOM from 'react-dom';
import NoteListNav from './NoteListNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoteListNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});
