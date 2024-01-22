import React, { useContext } from 'react';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

function Hero() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const revealServicesSection = () => {
    if (!appState.servicesRevealed) {
      appDispatch({ type: 'modifyServicesDisplay', value: true });
    }
  };

  return (
    <section className="hero">
      <h1 className="hero__title">
        <span className="hero__line-text">
          <span>Développons </span>ensemble
        </span>
        <span className="hero__line-text">
          votre <span>projet digital</span>
        </span>
      </h1>
      <div className="hero__banner">
        <span className="hero__banner-text">Conseil - Design</span>
        <span className="hero__banner-text">Développement</span>
      </div>
      <img src="../assets/infinity.svg" alt="Symbole infini" />
      <a
        className="main-button hero__button"
        href="#section-services"
        onClick={revealServicesSection}
      >
        Découvrez nos services
      </a>
      <a className="hero__content-link" href="#section-why">
        <small>&#8811; Accès direct au contenu</small>
      </a>
    </section>
  );
}

export default Hero;
