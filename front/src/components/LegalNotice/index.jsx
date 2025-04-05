import React from 'react';
import './index.sass';

const LegalNoticePage = () => {
    return (
        <div className="legal-notice">
            <h1>Mentions légales</h1>

            <h2>Responsable de publication</h2>
            <p>
                Le responsable de la publication est John Doe, en qualité de directeur de la société CESI Eats. Vous pouvez le contacter à l'adresse email suivante : contact@cesieats.com.
            </p>

            <h2>Hébergement</h2>
            <p>
                Ce site est hébergé par la société HostingPro, située au 123 Rue de l'Hébergement, 75000 Paris, France. Téléphone : +33 1 23 45 67 89.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
                Tous les contenus présents sur ce site (textes, images, logos, vidéos, etc.) sont la propriété exclusive de la société CESI Eats, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est strictement interdite.
            </p>

            <h2>Limitation de responsabilité</h2>
            <p>
                La société CESI Eats ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder. Les informations fournies sur ce site sont données à titre indicatif et peuvent être modifiées sans préavis.
            </p>

            <h2>Droit applicable</h2>
            <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux compétents seront ceux du ressort de Paris, France.
            </p>
        </div>
    );
};

export default LegalNoticePage;