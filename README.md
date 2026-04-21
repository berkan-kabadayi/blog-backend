🚀 Blog Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" />
</p>
---
📌 Overview
A RESTful Blog API built with TypeScript, Express, and Prisma ORM.
This project was intentionally built and evolved in two distinct phases to simulate a real-world migration scenario — a common requirement in production environments.
---
🔄 Project Evolution: Knex → Prisma
> **⚠️ Note for visitors coming from GitHub:** The repository's commit history includes an earlier version of this project built with **Knex.js**. This was not a mistake — it was intentional.
Why the migration?
This project started with Knex.js as the query builder. After completing a working version, I deliberately migrated it to Prisma ORM to simulate the kind of database layer migration that happens in real production projects.
The goal was to experience firsthand:
How to transition an existing codebase from a query builder to a full ORM
How Prisma's type-safe client differs from raw SQL-style queries in Knex
What challenges arise during schema and model layer rewrites
How to manage migration tooling differences (`knex migrate` vs `prisma migrate`)
What changed?
Area	Knex.js (v1)	Prisma (v2)
Query style	Raw SQL builder	Type-safe ORM client
Schema definition	Migration files	`schema.prisma`
Migrations	`knex migrate:latest`	`prisma migrate dev`
Type safety	Manual typing	Auto-generated types
Client setup	`knex({ client: 'pg', ... })`	`PrismaClient` with adapter
Soft delete filter	Manual `whereNull`	`whereClause` object pattern
Commit history
The repository preserves both phases:
Early commits → Knex.js implementation
Later commits → Prisma migration, model rewrites, schema changes
This is intentional. If you're reading the code at different points in the history, the tech stack will look different — that's the point.
---
✨ Features
🧱 Modular architecture (Controller + Model + Routes)
🗄️ PostgreSQL with Prisma ORM
🔄 Migration-based database management
🗑️ Soft delete support (`deleted_at` field)
🔍 Query filtering (show all / active only / deleted only)
🔗 Relational structure (Posts, Categories, Comments, Tags)
⚡ RESTful API design
🩺 Healthcheck endpoint
---
🛠️ Tech Stack
```bash
Node.js
TypeScript
Express.js
Prisma ORM
PostgreSQL
dotenv
```
---
📂 Project Structure
```bash
src/
  config/
    database.ts          # Prisma client setup
  controller/
    categoryController.ts
    postController.ts
    commentController.ts
    tagController.ts
  models/
    categoryModel.ts
    postModel.ts
    commentModel.ts
    tagModel.ts
  routes/
    categoryRoutes.ts
    postRoutes.ts
    commentRoutes.ts
    tagRoutes.ts
  utils/
    constants.ts
  app.ts

prisma/
schema.prisma # Database schema definition
migrations/ # Auto-generated migration files

````
---
🗃️ Database Schema
```sql
Categories
  └── id
  └── name
  └── deleted_at (soft delete)

Posts
  └── id
  └── title
  └── content
  └── category_id → Categories.id
  └── deleted_at (soft delete)

Comments
  └── id
  └── content
  └── post_id → Posts.id
  └── deleted_at (soft delete)

Tags
  └── id
  └── name
  └── deleted_at (soft delete)
````

✔ Foreign keys  
✔ Soft delete support via `deleted_at`  
✔ Type-safe queries via Prisma Client

---

⚙️ Installation

```bash
git clone https://github.com/berkan-kabadayi/blog-backend.git
cd blog-backend
npm install
```

---

🔑 Environment Variables

```env
PORT=3000
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/blog
```

---

🧬 Run Migrations

```bash
npx prisma migrate dev
```

---

▶️ Run the Project

```bash
npm run dev
```

---

📡 API Endpoints
📁 Categories

```http
GET    /api/v1/categories
GET    /api/v1/categories/:id
POST   /api/v1/categories
PUT    /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

> Supports `?showDeleted=true` or `?showDeleted=only` query param for soft delete filtering.
> 📝 Posts

```http
GET    /api/v1/posts
GET    /api/v1/posts/:id
POST   /api/v1/posts
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id
```

💬 Comments

```http
GET    /api/v1/comments
GET    /api/v1/comments/:id
POST   /api/v1/comments
PUT    /api/v1/comments/:id
DELETE /api/v1/comments/:id
```

🏷️ Tags

```http
GET    /api/v1/tags
GET    /api/v1/tags/:id
POST   /api/v1/tags
PUT    /api/v1/tags/:id
DELETE /api/v1/tags/:id
```

---

🧠 Design Decisions
Prisma ORM provides full type safety and auto-completion for all database queries
Soft deletes implemented via `deleted_at` timestamp — data is never hard-deleted by default
`showDeleted` query param gives API consumers control over which records they see
Modular layer structure (Controller → Model → Prisma Client) keeps concerns separated
`PrismaPg` adapter used for a clean PostgreSQL connection setup via connection string

---

🚧 Future Improvements

```diff
+ Add validation (Zod / Joi)
+ Implement global error handling middleware
+ Add service layer for business logic
+ JWT authentication & authorization
+ Pagination, sorting, search
+ Swagger / OpenAPI documentation
```

---

🩺 Health Check

```http
GET /healthcheck
```

```json
{
  "message": "OK"
}
```

---

📄 License
MIT License

---

👨‍💻 Author
Berkan Kabadayi
