# CESI Eats - Frontend Microservice

## Description

Ce projet est le client web de **CESI Eats**, une application de commande de repas. Il est construit avec **React** et utilise **Sass** pour le style. Le bundler **Vite** est utilisé pour un développement rapide, et **React Router** gère la navigation entre les pages.

## Fonctionnalités principales

- **Composants réutilisables** : Header, Footer, Layout, Button, SearchBar, CategorySelector, RestaurantCard, MenuCard.
- **Pages dynamiques** : Navigation entre les pages comme Home, avec des appels aux microservices backend.
- **Intégration backend** : Communication avec des endpoints situés sur `localhost:8080` ou d'autres ports selon les services.

---

## Composants

### Header
Affiche le titre de l'application et les liens de navigation.

### Footer
Contient des informations de copyright et des liens utiles.

### Layout
Composant de mise en page qui englobe le Header et le Footer.

### Button
Bouton réutilisable avec des styles personnalisables.

### SearchBar
Barre de recherche pour filtrer les restaurants ou les menus.

### CategorySelector
Permet de sélectionner une catégorie de restaurants ou de plats.

### RestaurantCard
Carte affichant les informations d'un restaurant.

### MenuCard
Carte affichant les informations d'un menu.

---

## Pages

### Home
- **Description** : Page d'accueil affichant une liste de restaurants.
- **Backend** : Appelle l'endpoint `GET /restaurants` sur `localhost:8080`.

### Autres pages (exemples)
- **Restaurant Details** : Affiche les détails d'un restaurant et ses menus. Appelle `GET /restaurants/:id`.
- **Search Results** : Affiche les résultats de recherche. Appelle `GET /search`.

---

## Lancer le projet

### En local
1. Installez les dépendances :
    ```bash
    npm install
    ```
2. Lancez le projet en mode développement :
    ```bash
    npm run dev
    ```
3. Accédez à l'application sur [http://localhost:80](http://localhost:80).

### Avec Docker
1. Construisez l'image Docker :
    ```bash
    docker build -t cesi-eats-front .
    ```
2. Lancez le conteneur :
    ```bash
    docker run -p 80:80 cesi-eats-front
    ```
3. Accédez à l'application sur [http://localhost](http://localhost).

---

## Structure du projet

```
/front
├── public/          # Fichiers statiques
├── src/
│   ├── components/  # Composants React (Header, Footer, etc.)
│   ├── pages/       # Pages (Home, Restaurant Details, etc.)
│   ├── styles/      # Fichiers Sass
│   ├── router/      # Configuration de React Router
│   ├── services/    # Fonctions pour appeler les endpoints backend
│   └── main.jsx     # Point d'entrée principal
├── package.json     # Dépendances et scripts
└── vite.config.js   # Configuration de Vite
```

---

## Intégration avec le backend

Le frontend communique avec plusieurs microservices backend via des appels API. Voici quelques exemples d'endpoints utilisés :

- **Restaurants** : `GET http://localhost:8080/restaurants`
- **Menus** : `GET http://localhost:8081/menus`

Assurez-vous que les microservices backend sont en cours d'exécution avant de lancer le frontend.

---
