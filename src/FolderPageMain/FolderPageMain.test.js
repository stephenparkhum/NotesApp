import React from 'react';
import ReactDOM from 'react-dom';
import FolderPageMain from './FolderPageMain';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FolderPageMain />, div);
  ReactDOM.unmountComponentAtNode(div);
});
