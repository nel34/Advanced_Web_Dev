import React from 'react'
import './index.sass' // Correction de l'import

const HelpPage = () => {
  return (
    <div className="help-page">
      <h1>Foire aux questions (FAQ)</h1>

      <section>
        <h2>👤 Clients</h2>
        <div>
          <h3>Comment passer une commande ?</h3>
          <p>Pour passer une commande, ajoutez des articles à votre panier et suivez les étapes de validation.</p>
        </div>
        <div>
          <h3>Comment annuler une commande ?</h3>
          <p>Vous pouvez annuler une commande depuis votre historique, tant qu'elle n'a pas été confirmée.</p>
        </div>
        <div>
          <h3>Comment modifier mes informations personnelles ?</h3>
          <p>Accédez à votre profil pour mettre à jour vos informations personnelles.</p>
        </div>
        <div>
          <h3>Comment consulter mes commandes passées ?</h3>
          <p>Rendez-vous dans la section "Historique des commandes" pour consulter vos commandes passées.</p>
        </div>
        <div>
          <h3>Que faire si ma commande est incorrecte ?</h3>
          <p>Contactez notre service client pour signaler un problème avec votre commande.</p>
        </div>
        <div>
          <h3>Comment utiliser un code promo ?</h3>
          <p>Ajoutez un code promo lors de la validation de votre commande pour bénéficier d'une réduction.</p>
        </div>
      </section>

      <section>
        <h2>🍽️ Restaurateurs</h2>
        <div>
          <h3>Comment ajouter mon restaurant ?</h3>
          <p>Inscrivez-vous sur notre plateforme et suivez les étapes pour enregistrer votre restaurant.</p>
        </div>
        <div>
          <h3>Comment mettre à jour mon menu ?</h3>
          <p>Connectez-vous à votre tableau de bord pour modifier ou ajouter des éléments à votre menu.</p>
        </div>
        <div>
          <h3>Comment consulter les statistiques de mes ventes ?</h3>
          <p>Les statistiques de vos ventes sont disponibles dans la section "Statistiques" de votre tableau de bord.</p>
        </div>
        <div>
          <h3>Comment gérer les avis clients ?</h3>
          <p>Accédez à la section "Avis" pour consulter et répondre aux commentaires de vos clients.</p>
        </div>
        <div>
          <h3>Comment configurer les horaires d'ouverture ?</h3>
          <p>Modifiez vos horaires d'ouverture dans la section "Paramètres" de votre tableau de bord.</p>
        </div>
        <div>
          <h3>Comment proposer des offres spéciales ?</h3>
          <p>Créez des offres spéciales dans la section "Promotions" pour attirer plus de clients.</p>
        </div>
      </section>

      <section>
        <h2>🚲 Livreurs</h2>
        <div>
          <h3>Comment devenir livreur ?</h3>
          <p>Remplissez le formulaire d'inscription pour devenir livreur sur notre plateforme.</p>
        </div>
        <div>
          <h3>Quelles sont les zones desservies ?</h3>
          <p>Consultez la carte des zones desservies dans la section "Zones de livraison".</p>
        </div>
        <div>
          <h3>Comment suivre mes livraisons ?</h3>
          <p>Utilisez l'application pour suivre vos livraisons en temps réel.</p>
        </div>
        <div>
          <h3>Comment signaler un problème avec une livraison ?</h3>
          <p>Utilisez la section "Support" de l'application pour signaler tout problème.</p>
        </div>
        <div>
          <h3>Comment consulter mes gains ?</h3>
          <p>Vos gains sont disponibles dans la section "Revenus" de votre tableau de bord.</p>
        </div>
        <div>
          <h3>Comment planifier mes horaires de travail ?</h3>
          <p>Utilisez la section "Planning" pour définir vos disponibilités et horaires de travail.</p>
        </div>
      </section>

      <section>
        <h2>📞 Contact</h2>
        <p>Si vous avez d'autres questions ou besoin d'assistance, notre service client est à votre disposition.</p>
        <p>Vous pouvez nous contacter par :</p>
        <ul>
          <li>Email : support@cesieats.com</li>
          <li>Téléphone : +33 1 23 45 67 89</li>
          <li>Chat en ligne : disponible sur notre site web</li>
        </ul>
        <p>Nous sommes là pour vous aider !</p>
      </section>
    </div>
  )
}

export default HelpPage