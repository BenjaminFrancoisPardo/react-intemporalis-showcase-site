import React from 'react';
import Page from './Page';
import Container from './Container';

function NotFound() {
  return (
    <Page title="Erreur 404">
      <Container>
        <p className="text-center">La page que vous cherchez n'existe pas.</p>
      </Container>
    </Page>
  );
}

export default NotFound;
