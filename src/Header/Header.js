import React, { Component } from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() { 
        return ( 
            <BrowserRouter>
            <header>
                <Link to="/">
                <h1>Noteful</h1>
                </Link>
            </header>
            </BrowserRouter>
         );
    }
}
 
export default Header;