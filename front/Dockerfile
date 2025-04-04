FROM node:latest

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

EXPOSE 80

# Lancer le serveur front
CMD ["npm", "run", "dev"]