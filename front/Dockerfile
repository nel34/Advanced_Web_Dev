# Utilise une image Node stable basée sur Debian (pas Alpine)
FROM node:20-slim

WORKDIR /app

# Copie des fichiers package
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Expose le port (le même que dans vite.config.js ou 80 par défaut)
EXPOSE 80

# Démarre Vite en mode dev
CMD ["npm", "run", "dev"]
