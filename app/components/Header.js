import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

function Header() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function toggleMenu() {
    appDispatch({ type: 'disableButton' });
    appDispatch({ type: 'toggleMenu' });
    setTimeout(() => {
      appDispatch({ type: 'enableButton' });
    }, 200);
    document.body.classList.toggle('noScroll');
  }

  function closeMenu() {
    appDispatch({ type: 'closeMenu' });
    document.body.classList.remove('noScroll');
  }

  return (
    <>
      <div className="navbar">
        {/* <button className="navbar__language-selector">FR</button> */}
        <div className="navbar__wrapper">
          <Link onClick={closeMenu} to="/">
            <img
              className="navbar__logo"
              src="../assets/navbar-logo.svg"
              alt="INTEMPORALIS Logo"
            />
          </Link>
          <button
            onClick={toggleMenu}
            disabled={appState.buttonDisabled}
            className={
              'navbar__hamburger' + (appState.menuOpen ? ' active' : '')
            }
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
        <nav
          className={
            'navbar__menu' +
            (appState.menuOpen ? ' navbar__menu--is-visible' : '')
          }
        >
          <ul>
            <li>
              <Link
                onClick={closeMenu}
                to="/portefolio"
                className={appState.currentURL == 'portefolio' ? 'current' : ''}
              >
                Portefolio
              </Link>
            </li>
            <img src="../assets/infinity.svg" alt="Infinity symbol" />
            <li>
              <Link
                onClick={closeMenu}
                to="/contact"
                className={appState.currentURL == 'contact' ? 'current' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
