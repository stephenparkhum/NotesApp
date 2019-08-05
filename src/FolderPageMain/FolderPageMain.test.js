import React from 'react';
import ReactDOM from 'react-dom';
import FolderPageMain from './FolderPageMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FolderPageMain />, div);
  ReactDOM.unmountComponentAtNode(div);
});
