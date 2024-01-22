import './styles/main.scss';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';

Axios.defaults.baseURL =
  process.env.BACKEND_URL || 'https://www.intemporalis.fr';

//Components
import Header from './components/Header';
import Footer from './components/Footer';
const Home = React.lazy(() => import('./components/Home'));
const Contact = React.lazy(() => import('./components/Contact'));
const Portefolio = React.lazy(() => import('./components/Portefolio'));
const Cgu = React.lazy(() => import('./components/Cgu'));
import LoadingDotsIcon from './components/LoadingDotsIcon';

//Contexts
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import NotFound from './components/NotFound';

function Main() {
  const initialState = {
    menuOpen: false,
    buttonDisabled: false,
    currentURL: '',
    servicesRevealed: false,
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'toggleMenu':
        draft.menuOpen = !draft.menuOpen;
        return;
      case 'closeMenu':
        draft.menuOpen = false;
        return;
      case 'disableButton':
        draft.buttonDisabled = true;
        return;
      case 'enableButton':
        draft.buttonDisabled = false;
        return;
      case 'updateURL':
        const stripedURL = action.url.replace(/\//, '');
        const modifiedURL = stripedURL == '' ? 'home' : stripedURL;
        draft.currentURL = modifiedURL;
        return;
      case 'modifyServicesDisplay':
        draft.servicesRevealed = action.value;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <Suspense fallback={<LoadingDotsIcon />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portefolio" element={<Portefolio />} />
              <Route path="/cgu" element={<Cgu />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
