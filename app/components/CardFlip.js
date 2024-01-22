import React, { useState } from 'react';

function CardFlip(props) {
  const [cardFlipped, setcardFlipped] = useState(false);

  const toggleFlip = () => {
    setcardFlipped(!cardFlipped);
  };

  return (
    <div className="card-flip__wrapper">
      <button
        onClick={toggleFlip}
        className={'card-flip__front' + (cardFlipped ? '--active' : '')}
      >
        <h3 className="text-center">{props.title}</h3>
      </button>
      <button
        onClick={toggleFlip}
        className={'card-flip__back' + (cardFlipped ? '--active' : '')}
      >
        {props.children}
      </button>
    </div>
  );
}

export default CardFlip;
