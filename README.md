# EcoCloset — Backend

API REST para calcular, almacenar y gestionar la huella ambiental en el consumo de moda.

## Descripción

Backend desarrollado con Node.js y Express que permite:

- Autenticación de usuarios mediante JWT
- Cálculo de huella ambiental (carbono y agua) a partir de un cuestionario
- Persistencia de resultados en MongoDB
- Consulta, actualización y eliminación de resultados (CRUD completo)

Incluye además un endpoint público que permite calcular la huella sin necesidad de registro.

## Demo

Backend desplegado en Render:
https://ecocloset-backend-zm86.onrender.com

## Tecnologías

- Node.js
- Express
- MongoDB Atlas + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors
- nodemon

## Instalación y ejecución en local

1. Clonar repositorio:

```bash
git clone https://github.com/carlabs3/ecocloset-backend.git
cd ecocloset-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz:

```env
PORT=4000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/ecocloset
JWT_SECRET=tu_secreto
```

4. Ejecutar servidor:

```bash
npm run dev
```

Servidor disponible en:
http://localhost:4000

## Scripts

| Script        | Descripción                        |
| ------------- | ---------------------------------- |
| `npm run dev` | Servidor en desarrollo con nodemon |
| `npm start`   | Servidor en producción             |

## Endpoints de la API

### Autenticación

| Método | Endpoint             | Descripción       | Auth |
| ------ | -------------------- | ----------------- | ---- |
| POST   | `/api/auth/register` | Registrar usuario | No   |
| POST   | `/api/auth/login`    | Iniciar sesión    | No   |

### Resultados (CRUD completo)

| Método | Endpoint                 | Descripción                   | Auth |
| ------ | ------------------------ | ----------------------------- | ---- |
| POST   | `/api/results/calculate` | Calcular huella sin guardar   | No   |
| POST   | `/api/results`           | Crear resultado               | Sí   |
| GET    | `/api/results`           | Obtener historial del usuario | Sí   |
| GET    | `/api/results/:id`       | Obtener resultado concreto    | Sí   |
| PUT    | `/api/results/:id`       | Actualizar resultado          | Sí   |
| DELETE | `/api/results/:id`       | Eliminar resultado            | Sí   |
| GET    | `/api/results/stats`     | Media global de usuarios      | No   |

Las rutas protegidas requieren:

```http
Authorization: Bearer <token>
```

## Variables de entorno

| Variable     | Descripción         |
| ------------ | ------------------- |
| `PORT`       | Puerto del servidor |
| `MONGO_URI`  | URI de MongoDB      |
| `JWT_SECRET` | Secreto para JWT    |

## Estructura del proyecto

```
ecocloset-backend/
├── src/
│   ├── config/
│   │   └── db.js → Conexión a MongoDB
│   ├── models/
│   │   ├── user.js → Modelo de usuario
│   │   └── result.js → Modelo de resultado
│   ├── routes/
│   │   ├── auth.routes.js → Rutas de autenticación
│   │   └── results.js → Rutas de autenticación
│   ├── controllers/
│   │   ├── auth.controller.js → Lógica de registro y login
│   │   └── results.controller.js → Lógica CRUD + cálculo + stats
│   ├── middlewares/
│   │   └── auth.middleware.js → Verificación del token JWT
│   └── utils/
│       └── calculator.js → Algoritmo de la huella ambiental
├── server.js
├── .env
└── package.json
```

## Algoritmo de cálculo

El algoritmo de calculator.js sigue la metodología del análisis de ciclo de vida de la industria textil:

1. Valor base según tamaño del armario (kg CO₂ y litros de agua)
2. Multiplicadores por tipo de fibra, frecuencia de compra, segunda mano, tejidos sostenibles, duración de prendas, lavado y reciclaje
3. Asignación de categoría según umbrales: bajo / medio / alto / muy alto

## Autor

Carla Barceló
https://github.com/carlabs3
