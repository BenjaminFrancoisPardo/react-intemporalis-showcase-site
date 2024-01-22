import React, { useEffect } from 'react';

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | INTEMPORALIS`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!props.isHomePage ? <h1>{props.title}</h1> : ''}
      {props.children}
    </>
  );
}

export default Page;
