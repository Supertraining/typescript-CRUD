# TypeScript CRUD API 🚀

A scalable and modular CRUD API built with **TypeScript**, **Express.js**, and **Supabase**. Features user management, authentication, PDF generation, and cancelable async operations.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [PDF & Async Operations](#pdf--async-operations)
- [Available Scripts](#available-scripts)
- [Author](#author)
- [License](#license)

## ✨ Features

- 👥 **User Management**: CRUD operations for users
- 🔐 **Authentication**: JWT-based with role-based access control
- 📄 **PDF Generation**: Generate and upload PDFs to Supabase
- ⚡ **Async Operations**: Cancelable long-running requests
- 🧵 **Worker Threads**: Optimized task handling
- 📦 **Redis Caching**: Performance-optimized data access
- ✅ **Request Validation**: Centralized data validation
- 🔄 **Cluster Support**: Multi-threaded Node.js server

## 🏗️ Project Structure

```
src/
├── config/                # Configuration files
├── constants/            # Application constants
├── core/                 # Core utilities and base classes
├── db/                   # Database clients
├── dependencies/         # Dependency injection
├── middlewares/         # Express middlewares
├── modules/             # Feature modules
├── routes/              # Application routes
└── server.ts            # Server setup
```

## 🚀 Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/typescript-crud.git
cd typescript-crud
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file:

```env
MY_APP_SUPABASE_URL=<your_supabase_url>
MY_APP_SUPABASE_SECRET_API_KEY=<your_key>
MY_APP_SUPABASE_USERS_TABLE=<table_name>
MY_APP_SUPABASE_BUCKET_NAME=<bucket_name>
MY_APP_JWT_SECRET=<jwt_secret>
MY_APP_API_KEY=<api_key>
MY_APP_REDIS_USERNAME=<redis_username>
MY_APP_REDIS_PASSWORD=<redis_password>
MY_APP_REDIS_HOST=<redis_host>
MY_APP_REDIS_PORT=<redis_port>
```

4. **Start development server**

```bash
npm run dev
```

## 🛣️ API Endpoints

### Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/login`    | Login user        |
| POST   | `/api/auth/register` | Register new user |

### Users

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| GET    | `/api/users`             | Get all users       |
| GET    | `/api/users/batched`     | Get users (batched) |
| GET    | `/api/users/cached`      | Get users (cached)  |
| GET    | `/api/users/all/workers` | Get users (worker)  |
| GET    | `/api/users/:id`         | Get user by ID      |
| PUT    | `/api/users/:id`         | Update user         |
| DELETE | `/api/users/:id`         | Delete user         |

### PDF & Async Operations

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/pdf`              | Generate PDF          |
| GET    | `/api/async-operations` | Cancelable operations |

## 🛠️ Available Scripts

```bash
npm run build   # Build project
npm run watch   # Watch mode
npm run dev     # Development
```

## 👨‍💻 Author

Developed with ❤️ by Maranga Matías

## 📝 License

MIT License - feel free to use and modify!
