# 🚀 Blog Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/Knex.js-Query%20Builder-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" />
</p>

---

## 📌 Overview

A RESTful Blog API built with **TypeScript**, **Express**, and **Knex.js**.

This project focuses on building a **clean, modular backend architecture** with relational data modeling and database migrations.

---

## ✨ Features

- 🧱 Modular architecture (Controller + Model)
- 🗄️ PostgreSQL with Knex.js
- 🔄 Migration-based database management
- 🔗 Relational structure (Posts, Categories, Comments)
- 🔍 Query filtering support
- ⚡ RESTful API design
- 🩺 Healthcheck endpoint

---

## 🛠️ Tech Stack

```bash
Node.js
TypeScript
Express.js
Knex.js
PostgreSQL
dotenv
```

---

## 📂 Project Structure

```bash
src/
  config/
    database.ts
  controller/
    categoryController.ts
    postController.ts
    commentController.ts
  models/
    categoryModel.ts
    postModel.ts
    commentModel.ts
  routes/
    categoryRoutes.ts
    postRoutes.ts
    commentRoutes.ts
  app.ts
```

---

## 🗃️ Database Schema

```sql
Categories
  └── id
  └── name

Posts
  └── id
  └── title
  └── content
  └── category_id → Categories.id

Comments
  └── id
  └── content
  └── post_id → Posts.id
```

✔ Foreign keys
✔ Cascade delete rules

---

## ⚙️ Installation

```bash
git clone https://github.com/berkan-kabadayi/blog-backend.git
cd blog-backend
npm install
```

---

## 🔑 Environment Variables

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog
DB_USER=your_username
DB_PASSWORD=your_password
```

---

## 🧬 Run Migrations

```bash
npx knex migrate:latest
```

---

## ▶️ Run the Project

```bash
npm run dev
```

---

## 📡 API Endpoints

### 📁 Categories

```http
GET    /api/v1/categories
GET    /api/v1/categories/:id
POST   /api/v1/categories
PUT    /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

### 📝 Posts

```http
GET    /api/v1/posts
GET    /api/v1/posts/:id
POST   /api/v1/posts
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id
```

### 💬 Comments

```http
GET    /api/v1/comments?post=1&commenter=John
GET    /api/v1/comments/:id
POST   /api/v1/comments
PUT    /api/v1/comments/:id
DELETE /api/v1/comments/:id
```

---

## 🧠 Design Decisions

- **Knex.js** provides flexible and readable SQL query building
- **Migrations** ensure consistent database versioning
- Layered structure improves maintainability
- Query filtering adds flexibility to API usage

---

## 🚧 Future Improvements

```diff
+ Add validation (Zod / Joi)
+ Implement global error handling middleware
+ Add service layer for business logic
+ JWT authentication & authorization
+ Pagination, sorting, search
```

---

## 🩺 Health Check

```http
GET /healthcheck
```

```json
{
  "message": "OK"
}
```

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Berkan Kabadayi**
