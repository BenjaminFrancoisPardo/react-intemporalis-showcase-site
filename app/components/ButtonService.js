import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function ButtonService(props) {
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
    console.log('reveal');
  };

  const hideModal = () => {
    setModalActive(false);
    console.log('hide');
  };

  return (
    <div className="column">
      <button onClick={toggleModal}>
        <h3>{props.title}</h3>
      </button>
      <CSSTransition
        classNames="button-service__modal"
        mountOnEnter
        in={modalActive}
        timeout={600}
        unmountOnExit
      >
        <div>
          <div className="button-service__modal">
            <button onClick={hideModal}>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
            {props.children}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default ButtonService;
