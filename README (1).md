# Adoptme API — Entrega Final (Backend III)

Proyecto backend desarrollado para la **Entrega Final** del curso.  
Incluye **documentación con Swagger**, **tests funcionales** y **dockerización** para ejecutar el servidor de forma reproducible.

---

## 📌 Links del proyecto
- **Repositorio GitHub:** https://github.com/HRicardoMorales/Backend_III  
- **Imagen en DockerHub:** https://hub.docker.com/r/rickkkx/adoptme

---

## ✅ Requisitos

### Opción A — Con Docker (recomendado)
- Docker Desktop instalado y funcionando (Windows/Mac/Linux).

### Opción B — Sin Docker (local)
- Node.js (LTS recomendado)
- MongoDB local o MongoDB Atlas

---

## 📚 Documentación Swagger
Una vez levantado el servidor, la documentación está disponible en:

- **Swagger UI:** http://localhost:8080/api/docs

> Swagger documenta el módulo **Users**.

---

## 🐳 Ejecutar con Docker (usando MongoDB local)

> **Importante:** antes de correr el contenedor, asegurate de que **MongoDB esté corriendo** en tu PC (puerto 27017).  
> En Windows/Mac, el contenedor se conecta al Mongo local usando:  
> `mongodb://host.docker.internal:27017/adoptme`

### PowerShell (Windows)
```powershell
docker pull rickkkx/adoptme:latest

docker run --rm -p 8080:8080 `
  -e MONGO_URL="mongodb://host.docker.internal:27017/adoptme" `
  rickkkx/adoptme:latest
```

### CMD (Windows)
```bat
docker pull rickkkx/adoptme:latest
docker run --rm -p 8080:8080 -e MONGO_URL="mongodb://host.docker.internal:27017/adoptme" rickkkx/adoptme:latest
```

### Verificación rápida
- **Swagger:** http://localhost:8080/api/docs  
- **Users (GET):** http://localhost:8080/api/users  

---

## 🐳 Ejecutar con Docker (usando MongoDB Atlas)

1) En Atlas, copiás el connection string (Drivers → Node.js) y lo usás como `MONGO_URL`.  
Ejemplo (reemplazar user/pass y cluster):  
`mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/adoptme?retryWrites=true&w=majority`

2) Ejecutar:
```bash
docker run --rm -p 8080:8080   -e MONGO_URL="TU_STRING_DE_ATLAS"   rickkkx/adoptme:latest
```

---

## 🚀 Ejecutar sin Docker (modo local)

1) Instalar dependencias:
```bash
npm install
```

2) Crear `.env` en la raíz (recomendado):
```env
MONGO_URL=mongodb://127.0.0.1:27017/adoptme
PORT=8080
```

3) Levantar el servidor:
```bash
npm run dev
```
o
```bash
node src/server.js
```

---

## 🧪 Tests funcionales

Se desarrollaron **tests funcionales** para **todos los endpoints** del router `adoption.router.js`, incluyendo casos de **éxito** y **error**.

Ejecutar:
```bash
npm test
```

---

## 🔎 Endpoints útiles para probar

### Swagger
- `GET http://localhost:8080/api/docs`

### Users
- `GET http://localhost:8080/api/users`
- `GET http://localhost:8080/api/users/{uid}`
- `PUT http://localhost:8080/api/users/{uid}`
- `DELETE http://localhost:8080/api/users/{uid}`

### Adoptions
- `GET http://localhost:8080/api/adoptions`
- `GET http://localhost:8080/api/adoptions/{aid}`
- `POST http://localhost:8080/api/adoptions/{uid}/{pid}`

---

## 🧰 Docker (build local)

Si querés construir la imagen localmente desde el repo:

```bash
docker build -t adoptme:1.0.0 .
```

Correr con Mongo local:
```bash
docker run --rm -p 8080:8080   -e MONGO_URL="mongodb://host.docker.internal:27017/adoptme"   adoptme:1.0.0
```

---

## 📦 Publicación en DockerHub (referencia)

Comandos usados para publicar la imagen:

```bash
docker login
docker tag adoptme:1.0.0 rickkkx/adoptme:1.0.0
docker tag adoptme:1.0.0 rickkkx/adoptme:latest
docker push rickkkx/adoptme:1.0.0
docker push rickkkx/adoptme:latest
```

---

## 📝 Notas para la corrección
- La imagen de Docker está publicada en DockerHub y es pública: https://hub.docker.com/r/rickkkx/adoptme  
- Swagger documenta el módulo **Users**.  
- Los tests cubren todos los endpoints del router **adoption.router.js**.

---

## Autor
**Ricardo Morales**  
Entrega Final — Backend III
