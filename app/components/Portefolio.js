import React, { useEffect } from 'react';
import { useContext } from 'react';

//Components
import Page from './Page';
import Container from './Container';
import DispatchContext from '../DispatchContext';

const pageName = 'Portefolio';

function Portefolio() {
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const url = window.location.pathname;
    appDispatch({ type: 'updateURL', url });
  }, []);

  return (
    <>
      <Page title={pageName}>
        <Container noMarginTop={true}>
          <p className="portefolio__info">
            Voici un aperçu de nos réalisations :
          </p>
          <div className="portefolio__grid">
            <div className="child">
              <a
                target="_blank"
                href="https://marques-luc-ferronnerie-metallerie.fr/"
              >
                <img
                  className="portefolio__logo"
                  src="../assets/logo-marques-luc.svg"
                  alt="Logo Marquès Luc - Ferronnerie - Métallerie"
                />
              </a>
              <p>
                Design de l'identité graphique de l'entreprise (logo et site
                web) et développement du site web.
              </p>
            </div>
          </div>
        </Container>
      </Page>
    </>
  );
}

export default Portefolio;
