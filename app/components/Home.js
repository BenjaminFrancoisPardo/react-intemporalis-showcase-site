import React, { useContext, useEffect } from 'react';

//Components
import Hero from './Hero';
import Page from './Page';
import Container from './Container';
import CardFlip from './CardFlip';
import ButtonService from './ButtonService';
import DropdownSection from './DropdownSection';
import DispatchContext from '../DispatchContext';

function Home() {
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const url = window.location.pathname;
    appDispatch({ type: 'updateURL', url });
  }, []);

  return (
    <Page title="Home" isHomePage={true}>
      <Container noPaddingVertical={true}>
        <Hero />
      </Container>
      <DropdownSection title="Pourquoi" question={true} id="section-why">
        <div className="section-why__wrapper">
          <ul>
            <li>Un unique interlocuteur pour le design et le développement,</li>
            <li>
              La possibilité de se faire conseiller à toutes les étapes du
              projet,
            </li>
            <li>
              Un produit fini irréprochable et qui répond aux exigences
              industrielles en termes de vitesse et de sécurité,
            </li>
            <li>
              Une communication régulière tout au long du projet et tout
              particulièrement lors de la phase de design.
            </li>
          </ul>
        </div>
      </DropdownSection>
      <DropdownSection
        title="Votre prestataire"
        question={false}
        id="section-provider"
      >
        <div className="section-provider__wrapper">
          <div className="picture">
            <img
              src="../assets/photo-ben.JPG"
              alt="Photographie du prestataire."
            />
          </div>
          <p>
            Rapidement après avoir obtenu le diplôme d'ingénieur du génie
            Physique de l'Institut National des Sciences Appliquées de Toulouse,
            Benjamin PARDO se reconvertit dans le développement et le design web
            afin d'accorder une part plus importante à la créativité dans son
            activité professionnelle.
          </p>
          <p>
            Avide de nouveaux projets, Benjamin est toujours prêt à se surpasser
            pour concrétiser vos idées digitales tout en vous apportant les
            conseils nécessaires pour répondre du mieux possible à vos besoins.
          </p>
        </div>
      </DropdownSection>
      <DropdownSection
        title="Les compétences"
        question={false}
        id="section-skills"
      >
        <div className="section-skills__wrapper">
          <CardFlip title="Langages de programmation">
            <ul className="text-center">
              <li>HTML</li>
              <li>CSS + Sass</li>
              <li>Javascript + React</li>
              <li>PHP</li>
            </ul>
          </CardFlip>
          <CardFlip title="Workflow">
            <ul className="text-center">
              <li>Git</li>
              <li>Webpack</li>
            </ul>
          </CardFlip>
          <CardFlip title="Systèmes de gestion de contenu">
            <ul>
              <li>
                <span className="secondary-clr">Wordpress</span>
                <small>(création de thèmes et plugins)</small>
              </li>
              <li>
                <span className="secondary-clr">Woocommerce</span>
                <small>(ecommerce)</small>
              </li>
              <li>
                <span className="secondary-clr">Webflow</span>
              </li>
            </ul>
          </CardFlip>
          <CardFlip title="Langues">
            <p className="text-center">
              Nous travaillons en anglais ou en français selon les besoins du
              client.
            </p>
          </CardFlip>
        </div>
      </DropdownSection>
      <DropdownSection
        title="Ce que propose"
        question={false}
        id="section-services"
        overflowHidden={true}
      >
        <div className="section-services__wrapper">
          <div className="row">
            <ButtonService title="Conseil" id="conseil">
              <ul>
                <li>Définition de la stratégie digitale</li>
                <li>Aide à la rédaction du cahier des charges</li>
                <li>Choix technologiques</li>
              </ul>
            </ButtonService>
          </div>
          <div className="row">
            <ButtonService title="Design" id="design" slideFromLeft={true}>
              <ul>
                <li>Création logos</li>
                <li>Refonte / création identité graphique</li>
                <li>Design sites et applications web sur-mesure</li>
                <li>Design thèmes Wordpress</li>
              </ul>
            </ButtonService>
            <ButtonService title="Développement" id="developpement">
              <ul>
                <li>
                  Développement sites vitrines, blog, ecommerce, applications
                  web
                </li>
                <li>
                  Développement de nouvelles fonctionnalités pour un produit
                  existant
                </li>
                <li>Dévelopemment de thèmes et plugins Wordpress</li>
              </ul>
            </ButtonService>
          </div>
        </div>
      </DropdownSection>
    </Page>
  );
}

export default Home;
