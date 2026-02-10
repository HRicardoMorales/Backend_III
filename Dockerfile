# Imagen base
FROM node:20-bullseye-slim

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json primero (mejora cache)
COPY package*.json ./

# Instalamos dependencias (solo producción)
RUN npm ci --omit=dev

# Copiamos el resto del proyecto
COPY . .

# Variables
ENV NODE_ENV=production
ENV PORT=8080

# Exponemos el puerto
EXPOSE 8080

# Comando de arranque
CMD ["npm","start"]
