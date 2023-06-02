import React from 'react';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';

function Topbar(): JSX.Element {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <div className=""></div>
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Logo Sabka Bazar"></img>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
            <div className="header-social">
              <ul>
                <li>
                  <Link to="/cart">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Topbar;
