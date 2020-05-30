import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">lab4</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Ships</Link>
          </li>
          <li className="navbar-item">
            <Link to="/pier" className="nav-link">Pier</Link>
          </li> 
          <li className="navbar-item">
            <Link to="/port" className="nav-link">Ports</Link>
          </li> 
        </ul>
        </div>
      </nav>
    );
  }
}