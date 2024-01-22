import React, { useEffect, useContext } from 'react';
import DispatchContext from '../DispatchContext';
import Page from './Page';
import Container from './Container';

function Cgu() {
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const url = window.location.pathname;
    appDispatch({ type: 'updateURL', url });
  }, []);

  return (
    <Page title="Conditions Générales d'Utilisation">
      <Container>
        <p className="text-center">En vigueur au 03/05/2022</p>
        <p>
          Les présentes conditions générales d'utilisation (dites «<b>CGU</b>»)
          ont pour objet l'encadrement juridique des modalités de mise à
          disposition du site et des services par <b>INTEMPORALIS</b> et de
          définir les conditions d’accès et d’utilisation des services par «
          <b>l'Utilisateur</b>
          ».
          <br />
          Les présentes CGU sont accessibles sur le site à la rubrique «
          <b>CGU</b>».
        </p>
        <h2 className="cgu__title">
          Article 1 : <span>Les mentions légales</span>
        </h2>
        <p>
          L’édition et la direction de la publication du site{' '}
          <a href="/">intemporalis.fr</a> est assurée par Pardo Benjamin,
          domicilié 51 rue Maurice Bécanne, joignable au{' '}
          <a href="tel:+33671842273">06 71 84 22 73</a> ou à{' '}
          <a href="mailto:bpardo@intemporalis.fr">bpardo@intemporalis.fr</a>.
        </p>
        <p>
          L'hébergeur du site <a href="/">intemporalis.fr</a> est la société{' '}
          <b>Salesforce, Inc.</b>, dont le siège social est situé à Salesforce,
          Inc. Salesforce Tower, 415 Mission Street, 3rd Floor, San Francisco,
          CA 94105, United States, avec le numéro de téléphone :{' '}
          <a href="tel:+18006649073">+1-800-664-9073</a>.
        </p>
        <h2 className="cgu__title">
          Article 2 : <span>Accès au site</span>
        </h2>
        <p>
          Le site <a href="/">intemporalis.fr</a> permet à <b>l'Utilisateur</b>{' '}
          un accès gratuit aux services suivants : présentation d'
          <b>INTEMPORALIS</b> et de ses services, contacter <b>INTEMPORALIS</b>.
          <br />
          Le site est accessible gratuitement en tout lieu à tout{' '}
          <b>Utilisateur</b> ayant un accès à Internet. Tous les frais supportés
          par <b>l'Utilisateur</b> pour accéder au service (matériel
          informatique, logiciels, connexion Internet, etc.) sont à sa charge.
        </p>
        <h2 className="cgu__title">
          Article 3 : <span>Collecte des données</span>
        </h2>
        <p>
          Le site est exempté de déclaration à la Commission Nationale
          Informatique et Libertés (CNIL) dans la mesure où il ne collecte
          aucune donnée concernant les <b>Utilisateurs</b>.
        </p>
        <h2 className="cgu__title">
          Article 4 : <span>Propriété intellectuelle</span>
        </h2>
        <p>
          Les marques, logos, signes ainsi que tous les contenus du site
          (textes, images, son…) font l'objet d'une protection par le Code de la
          propriété intellectuelle et plus particulièrement par le droit
          d'auteur.
        </p>
        <p>
          <b>L'Utilisateur</b> doit solliciter l'autorisation préalable du site
          pour toute reproduction, publication, copie des différents contenus.
          Il s'engage à une utilisation des contenus du site dans un cadre
          strictement privé, toute utilisation à des fins commerciales et
          publicitaires est strictement interdite.
        </p>
        <p>
          Toute représentation totale ou partielle de ce site par quelque
          procédé que ce soit, sans l’autorisation expresse de l’exploitant du
          site Internet constituerait une contrefaçon sanctionnée par l’article
          L 335-2 et suivants du Code de la propriété intellectuelle.
          <br />
          Il est rappelé conformément à l’article L122-5 du Code de propriété
          intellectuelle que <b>l'Utilisateur</b> qui reproduit, copie ou publie
          le contenu protégé doit citer l’auteur et sa source.
        </p>
        <h2 className="cgu__title">
          Article 5 : <span>Responsabilité</span>
        </h2>
        <p>
          Les sources des informations diffusées sur le site{' '}
          <a href="/">intemporalis.fr</a> sont réputées fiables mais le site ne
          garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
          <br />
          Les informations communiquées sont présentées à titre indicatif et
          sans valeur contractuelle. Malgré des mises à jour régulières, le site{' '}
          <a href="/">intemporalis.fr</a> ne peut être tenu responsable de la
          modification des dispositions administratives et juridiques survenant
          après la publication. De même, le site ne peut être tenue responsable
          de l’utilisation et de l’interprétation de l’information contenue dans
          ce site.
          <br />
          Le site <a href="/">intemporalis.fr</a> ne peut être tenu pour
          responsable d’éventuels virus qui pourraient infecter l’ordinateur ou
          tout matériel informatique de l’Internaute, suite à une utilisation, à
          l’accès, ou au téléchargement provenant de ce site.
          <br />
          La responsabilité du site ne peut être engagée en cas de force majeure
          ou du fait imprévisible et insurmontable d'un tiers.
        </p>
        <h2 className="cgu__title">
          Article 6 : <span>Liens hypertextes</span>
        </h2>
        <p>
          Des liens hypertextes peuvent être présents sur le site.{' '}
          <b>L'Utilisateur</b> est informé qu’en cliquant sur ces liens, il
          sortira du site <a href="/">intemporalis.fr</a>. Ce dernier n’a pas de
          contrôle sur les pages web sur lesquelles aboutissent ces liens et ne
          saurait, en aucun cas, être responsable de leur contenu.
        </p>
        <h2 className="cgu__title">
          Article 7 : <span>Cookies</span>
        </h2>
        <p>
          <b>L'Utilisateur</b> est informé que lors de ses visites sur le site,
          un cookie peut s’installer automatiquement sur son logiciel de
          navigation.
          <br />
          Les cookies sont de petits fichiers stockés temporairement sur le
          disque dur de l’ordinateur de <b>l'Utilisateur</b> par votre
          navigateur et qui sont nécessaires à l’utilisation du site{' '}
          <a href="/">intemporalis.fr</a>. Les cookies ne contiennent pas
          d’information personnelle et ne peuvent pas être utilisés pour
          identifier quelqu’un. Un cookie contient un identifiant unique, généré
          aléatoirement et donc anonyme. Certains cookies expirent à la fin de
          la visite de <b>l'Utilisateur</b>, d’autres restent.
          <br />
          L’information contenue dans les cookies est utilisée pour améliorer le
          site <a href="/">intemporalis.fr</a>. En naviguant sur le site,{' '}
          <b>l'Utilisateur</b> les accepte.
          <br />
          <b>L'Utilisateur</b> pourra désactiver ces cookies par l’intermédiaire
          des paramètres figurant au sein de son logiciel de navigation.
        </p>
        <h2 className="cgu__title">
          Article 8 : <span>Droit applicable et juridiction compétente</span>
        </h2>
        <p>
          La législation française s'applique au présent contrat. En cas
          d'absence de résolution amiable d'un litige né entre les parties, les
          tribunaux français seront seuls compétents pour en connaître. Pour
          toute question relative à l’application des présentes CGU, vous pouvez
          joindre l’éditeur aux coordonnées inscrites à l’ARTICLE 1.
        </p>
        <p>
          <i>
            CGU réalisées sur{' '}
            <a target="_blank" href="http://legalplace.fr/">
              legalplace.fr
            </a>
          </i>
        </p>
      </Container>
    </Page>
  );
}

export default Cgu;
