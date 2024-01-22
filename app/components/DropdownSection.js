import React, { useContext, useEffect, useState } from 'react';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import Container from './Container';
import { CSSTransition } from 'react-transition-group';

function DropdownSection(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [revealContent, setRevealContent] = useState(false);

  useEffect(() => {
    if (props.id == 'section-services') {
      if (appState.servicesRevealed) {
        setRevealContent(true);
      }
    }
  }, [appState.servicesRevealed]);

  function toggleSectionSlide() {
    appDispatch({ type: 'disableButton' });
    setRevealContent(!revealContent);

    if (props.id == 'section-services') {
      if (appState.servicesRevealed) {
        appDispatch({ type: 'modifyServicesDisplay', value: false });
      }
    }
    setTimeout(() => {
      appDispatch({ type: 'enableButton' });
    }, 200);
  }

  return (
    <section id={props.id}>
      <div className="dropdown-section__title-wrapper">
        <h2>
          <span>{props.title}</span>INTEMPORALIS{props.question ? ' ?' : ''}
        </h2>
        <button
          onClick={toggleSectionSlide}
          disabled={appState.buttonDisabled}
          className={'dropdown-btn' + (revealContent ? ' active' : '')}
        >
          <i className="dropdown-icon"></i>
        </button>
      </div>
      <CSSTransition
        classNames="dropdown"
        mountOnEnter
        in={revealContent}
        timeout={800}
        unmountOnExit
      >
        <div id={'dropdown-' + props.id}>
          <Container noPaddingTop={true} overflowHidden={props.overflowHidden}>
            {props.children}
          </Container>
        </div>
      </CSSTransition>
    </section>
  );
}

export default DropdownSection;
