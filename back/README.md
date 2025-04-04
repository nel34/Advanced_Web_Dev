# Microservices - CESI Eats (Backend)

## Microservices présents

### 1. authentication
- 📌 Rôle : Gérer les utilisateurs (register, login, token)
- ⚙️ Techno : Node.js, Express, Sequelize, MySQL, JWT, bcrypt
- 🔐 Authentification JWT + refresh token
- 📁 Fichiers clés : `routes/auth.routes.js`, `models/user.model.js`
- 🔌 Variables `.env` : 
    - `MYSQL_USER`
    - `MYSQL_PASSWORD`
    - `JWT_SECRET`
    - `JWT_REFRESH_SECRET`
- 📄 Routes :
    - `POST /register` – Créer un utilisateur
    - `POST /login` – Se connecter
    - `POST /refreshToken` – Rafraîchir le token

### 2. deliveries
- 📌 Rôle : Gérer les livraisons
- ⚙️ Techno : Node.js, Express, Mongoose, MongoDB
- 📁 Fichiers clés : `routes/delivery.routes.js`, `models/delivery.model.js`
- 🔌 Variables `.env` : 
    - `MONGO_URI`
- 📄 Routes :
    - `GET /deliveries` – Liste des livraisons
    - `POST /deliveries` – Créer une livraison
    - `PUT /deliveries/:id` – Mettre à jour une livraison
    - `DELETE /deliveries/:id` – Supprimer une livraison

### 3. menus
- 📌 Rôle : Gérer les menus des restaurants
- ⚙️ Techno : Node.js, Express, Mongoose, MongoDB
- 📁 Fichiers clés : `routes/menu.routes.js`, `models/menu.model.js`
- 🔌 Variables `.env` : 
    - `MONGO_URI`
- 📄 Routes :
    - `GET /menus` – Liste des menus
    - `POST /menus` – Créer un menu
    - `PUT /menus/:id` – Mettre à jour un menu
    - `DELETE /menus/:id` – Supprimer un menu

### 4. orders
- 📌 Rôle : Gérer les commandes passées
- ⚙️ Techno : Node.js, Express, Mongoose, MongoDB
- 📁 Fichiers clés : `routes/order.routes.js`, `models/order.model.js`
- 🔌 Variables `.env` : 
    - `MONGO_URI`
- 📄 Routes :
    - `GET /orders` – Liste des commandes
    - `POST /orders` – Créer une commande
    - `PUT /orders/:id` – Mettre à jour une commande
    - `DELETE /orders/:id` – Supprimer une commande

### 5. products
- 📌 Rôle : Gérer les produits associés aux menus
- ⚙️ Techno : Node.js, Express, Mongoose, MongoDB
- 📁 Fichiers clés : `routes/product.routes.js`, `models/product.model.js`
- 🔌 Variables `.env` : 
    - `MONGO_URI`
- 📄 Routes :
    - `GET /products` – Liste des produits
    - `POST /products` – Créer un produit
    - `PUT /products/:id` – Mettre à jour un produit
    - `DELETE /products/:id` – Supprimer un produit

### 6. restaurants
- 📌 Rôle : Gérer les restaurants et restaurateurs
- ⚙️ Techno : Node.js, Express, Mongoose, MongoDB
- 📁 Fichiers clés : `routes/restaurant.routes.js`, `models/restaurant.model.js`
- 🔌 Variables `.env` : 
    - `MONGO_URI`
- 📄 Routes :
    - `GET /restaurants` – Liste des restaurants
    - `POST /restaurants` – Créer un restaurant
    - `PUT /restaurants/:id` – Mettre à jour un restaurant
    - `DELETE /restaurants/:id` – Supprimer un restaurant

## Lancement via Docker Compose
Tous les services peuvent être lancés ensemble via Docker Compose. Un fichier `docker-compose.yml` est présent à la racine du projet pour orchestrer les conteneurs. Chaque service est configuré pour se connecter à la base de données appropriée (MongoDB ou MySQL).

## Technologies utilisées
- **Backend** : Node.js, Express
- **Base de données** : MongoDB (pour la majorité des services), MySQL (pour `authentication`)
- **ORM/ODM** : Sequelize (MySQL), Mongoose (MongoDB)
- **Sécurité** : JWT pour l'authentification, bcrypt pour le hachage des mots de passe
- **Conteneurisation** : Docker, Docker Compose
- **Documentation API** : apidoc 

## Sécurité
L'authentification est sécurisée avec des tokens JWT. Les mots de passe sont hachés avec bcrypt avant d'être stockés. Les variables sensibles sont gérées via des fichiers `.env`.

## Documentation
apidoc est utilisé, la documentation des API est auto-générée et accessible via une route dédiée (ex. `/api/auth/docs`).