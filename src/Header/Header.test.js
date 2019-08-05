import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import renderer from 'react-test-renderer';
import { exportAllDeclaration } from '@babel/types';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});