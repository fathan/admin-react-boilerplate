# Stage 1: Build React App
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json + lockfile
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy semua source
COPY . .

# Build app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy build hasil stage sebelumnya
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]