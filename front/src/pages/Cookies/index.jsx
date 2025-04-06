import React from 'react'
import './index.sass'

const CookiesPage = () => {
  return (
    <div className="cookies">
      <h1>Gestion des cookies</h1>

      <section>
        <h2>Pourquoi on utilise des cookies</h2>
        <p>
                    Les cookies nous permettent d'améliorer votre expérience utilisateur,
                    de personnaliser le contenu et d'analyser notre trafic.
        </p>
      </section>

      <section>
        <h2>Quels types de cookies on utilise</h2>
        <p>
                    Nous utilisons des cookies essentiels pour le fonctionnement du site,
                    des cookies analytiques pour comprendre l'utilisation de notre site,
                    et des cookies de personnalisation pour adapter le contenu à vos préférences.
        </p>
      </section>

      <section>
        <h2>Comment les utilisateurs peuvent les gérer</h2>
        <p>
                    Vous pouvez gérer vos préférences en matière de cookies via les paramètres
                    de votre navigateur ou en utilisant notre outil de gestion des cookies.
        </p>
      </section>
    </div>
  )
}

export default CookiesPage