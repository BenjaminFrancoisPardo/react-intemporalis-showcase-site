import React from 'react';

function Container(props) {
  return (
    <div
      className={
        'container' +
        (props.noPaddingVertical ? ' noPaddingVertical' : '') +
        (props.noPaddingTop ? ' noPaddingTop' : '') +
        (props.overflowHidden ? ' noScroll' : '')
      }
    >
      {props.children}
    </div>
  );
}

export default Container;
