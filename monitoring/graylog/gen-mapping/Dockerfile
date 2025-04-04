FROM node:18-alpine

WORKDIR /app

# Copie les scripts Node
COPY script-gen-mapping.js .
COPY enrich-logs.js .
COPY setup-gelf.js .

# Copie le fichier .env
COPY .env .

# Installe les dépendances nécessaires
RUN npm install axios qs dotenv chokidar

# Installe utilitaires si nécessaires
RUN apk add --no-cache netcat-openbsd

# Commande au démarrage
CMD sh -c "\
  node script-gen-mapping.js && \
  echo '⌛ Waiting...' && \
  until nc -z graylog 9000; do echo '⌛ Waiting...'; sleep 2; done && \
  echo '✅ Graylog is ready. Configuring GELF...' && \
  node setup-gelf.js && \
  node enrich-logs.js"