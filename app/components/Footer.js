import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../StateContext';

function Footer() {
  const appState = useContext(StateContext);

  return (
    <div className="footer">
      <div className="footer__main">
        <div className="column">
          <ul id="footer__menu">
            <li>
              <Link
                id="home"
                to="/"
                className={appState.currentURL == 'home' ? 'current' : ''}
              >
                Acceuil
              </Link>
            </li>
            <li>
              <Link
                id="portefolio"
                to="/portefolio"
                className={appState.currentURL == 'portefolio' ? 'current' : ''}
              >
                Portefolio
              </Link>
            </li>
            <li>
              <Link
                id="contact"
                to="/contact"
                className={appState.currentURL == 'contact' ? 'current' : ''}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                id="cgu"
                to="/cgu"
                className={appState.currentURL == 'cgu' ? 'current' : ''}
              >
                CGU
              </Link>
            </li>
          </ul>
          <a
            href="https://www.linkedin.com/in/benjamin-pardo-84163b135/"
            target="_blank"
          >
            <img src="../assets/linkedin.svg" alt="LinkedIn logo" />
          </a>
        </div>
        <div className="column">
          <Link to="/">
            <img src="../assets/navbar-logo.svg" alt="Intemporalis logo" />
          </Link>
          <Link className="main-button" to="/contact">
            Commençons à travailler ensemble
          </Link>
        </div>
      </div>
      <div className="footer__footer">
        <small>Copyright &copy;{new Date().getFullYear()} INTEMPORALIS</small>
      </div>
    </div>
  );
}

export default Footer;
