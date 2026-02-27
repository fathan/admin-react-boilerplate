# React.js Boilerplate

![screenshot](https://raw.githubusercontent.com/fathan/admin-react-boilerplate/refs/heads/master/screenshot.png)

## Setup Manual

### 1. Clone repository

```
$ git clone https://github.com/fathan/admin-react-boilerplate.git
$ cd admin-react-boilerplate
```

### 2. Install dependencies

```
$ npm install
```

### 3. Jalankan Development server

```
$ npm run dev
```

### 4. Open Web browser:

```
http://localhost:5175
```

## Build Production

### 1. Build project:

```
$ npm run build
```

### 2. Preview result build:

```
$ npm run preview
```

## Run with Docker

### 1. Build & Run Docker Image
```
$ docker build -t react-admin-boilerplate .
$ docker run -p 3000:80 react-admin-boilerplate
```

### 2. Docker Compose (React + Backend API)

Create file docker-compose.yml:

```
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:80"
    restart: always
    depends_on:
      - backend

  backend:
    image: your-backend-image
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=development
```

Running:

```
$ docker-compose up -d --build
```

