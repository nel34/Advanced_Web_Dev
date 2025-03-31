FROM node:latest

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code (routes, src, etc.)
COPY . .

# Générer la documentation
RUN npm run doc

EXPOSE 3010

CMD ["npm", "run", "dev"]pos