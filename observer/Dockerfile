# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json a la imagen
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación a la imagen
COPY . .

# Expón el puerto en el que se ejecutará la aplicación
EXPOSE 3003

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "run", "start"]
