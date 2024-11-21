# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Definir los argumentos de construcción que se pueden pasar desde el archivo .env
ARG dominio_personal
ENV dominio_personal=$dominio_personal

# Verificar si la variable de entorno está definida y luego inyectarla en el archivo environment.ts
RUN if [ -z "$dominio_personal" ]; then echo "Error: La variable dominio_personal no está definida" && exit 1; fi

# Inyectar la variable de entorno en el archivo environment.ts
RUN echo "export const environment = { production: true, dominioPersonal: '$dominio_personal' };" > src/environments/environment.ts

# Construir la aplicación Angular
RUN npm run build --prod

# Etapa 2: Configuración del servidor para servir la aplicación
FROM nginx:stable-alpine

# Copiar la aplicación Angular construida en la etapa anterior
COPY --from=build /app/dist/mecate-frontend /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configurar el puerto
EXPOSE 8089

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
