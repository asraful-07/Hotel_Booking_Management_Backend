<div align="center">

# 🏨 Hotel Booking Management — Backend

REST API powering the Hotel Booking Management System — built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** on **PostgreSQL**.

[![Live](https://img.shields.io/badge/API-Live-brightgreen)](https://hotel-booking-management-backend-blush.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)

</div>

---

## 📖 Overview

This is the backend service for the Hotel Booking Management System. It handles authentication, room management, bookings, and file uploads, exposing a versioned REST API consumed by the [frontend](https://hotel-booking-managemet-frontend.vercel.app).

---

## 🚀 Live API

[https://hotel-booking-management-backend-blush.vercel.app](https://hotel-booking-management-backend-blush.vercel.app)

---

## 🧱 Tech Stack

| Category     | Technology                 |
| ------------ | -------------------------- |
| Runtime      | Node.js                    |
| Framework    | Express.js                 |
| Language     | TypeScript                 |
| ORM          | Prisma                     |
| Database     | PostgreSQL                 |
| File Uploads | Multer                     |
| Auth         | JWT-based session handling |

---

## 📂 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/          # Environment & app configuration
│   ├── modules/          # Feature modules (auth, rooms, bookings, users)
│   │   └── <module>/
│   │       ├── *.controller.ts
│   │       ├── *.service.ts
│   │       ├── *.route.ts
│   │       └── *.validation.ts
│   ├── middlewares/      # Auth guards, error handling, role checks
│   ├── uploads/           # Multer upload destination (local/dev)
│   ├── utils/             # Helpers (JWT, error classes, response formatter)
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@host:5432/dbname
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://hotel-booking-managemet-frontend.vercel.app
```

> ⚠️ Never commit `.env` to version control. Add a `.env.example` with placeholder values for contributors.

---

## 🛠 Setup & Installation

### Prerequisites

- Node.js v18+
- PostgreSQL database (local or hosted, e.g. Neon, Supabase, Railway)

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# then fill in DATABASE_URL, JWT_SECRET, etc.

# 4. Generate Prisma client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev

# 6. Start the development server
npm run dev
```

The server runs on `http://localhost:5000` by default.

---

## 📜 Available Scripts

| Script                      | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `npm run dev`               | Start server in development mode (with hot reload) |
| `npm run build`             | Compile TypeScript to JavaScript                   |
| `npm start`                 | Run the compiled production build                  |
| `npx prisma studio`         | Open Prisma Studio to view/edit database records   |
| `npx prisma migrate dev`    | Run database migrations in development             |
| `npx prisma migrate deploy` | Apply migrations in production                     |

---

## 🗄️ Database & Prisma

- Schema defined in `prisma/schema.prisma`
- Migrations tracked in `prisma/migrations/`
- Run `npx prisma studio` to inspect data visually
- Run `npx prisma generate` after every schema change

---

## 📤 File Uploads

File uploads (e.g. room images, profile pictures) are handled with **Multer**.

- Uploaded files are validated by type and size before being stored
- Files are served statically or forwarded to cloud storage, depending on configuration
- Configure the upload directory and size limits in `src/middlewares/upload.middleware.ts` (or equivalent)

---

## 🔐 Authentication & Roles

- JWT-based authentication with access tokens issued on sign-in
- Role-based access control: `ADMIN`, `MANAGER`, `CUSTOMER`
- Protected routes use middleware to verify tokens and check role permissions

---

## 📡 API Reference

Base URL: `https://hotel-booking-management-backend-blush.vercel.app`

### Auth

| Method | Endpoint            | Access        | Description                |
| ------ | ------------------- | ------------- | -------------------------- |
| POST   | `/api/auth/sign-up` | Public        | Register a new user        |
| POST   | `/api/auth/sign-in` | Public        | Log in and receive a token |
| GET    | `/api/auth/me`      | Authenticated | Get current user profile   |

### Rooms

| Method | Endpoint            | Access        | Description                               |
| ------ | ------------------- | ------------- | ----------------------------------------- |
| GET    | `/api/v1/rooms`     | Public        | List all rooms                            |
| GET    | `/api/v1/rooms/:id` | Public        | Get a single room by ID                   |
| POST   | `/api/v1/rooms`     | Admin/Manager | Create a new room (supports image upload) |
| PUT    | `/api/v1/rooms/:id` | Admin/Manager | Update a room                             |
| DELETE | `/api/v1/rooms/:id` | Admin/Manager | Delete a room                             |

### Bookings

| Method | Endpoint               | Access         | Description                               |
| ------ | ---------------------- | -------------- | ----------------------------------------- |
| GET    | `/api/v1/bookings`     | Authenticated  | List bookings (own or all, based on role) |
| POST   | `/api/v1/bookings`     | Customer       | Create a new booking                      |
| DELETE | `/api/v1/bookings/:id` | Customer/Admin | Cancel a booking                          |

### Users

| Method | Endpoint            | Access     | Description         |
| ------ | ------------------- | ---------- | ------------------- |
| GET    | `/api/v1/users`     | Admin      | List all users      |
| PUT    | `/api/v1/users/:id` | Admin/Self | Update user details |
| DELETE | `/api/v1/users/:id` | Admin      | Delete a user       |

---

## ✅ Error Handling

The API returns consistent JSON error responses:

```json
{
  "success": false,
  "message": "Room not found",
  "statusCode": 404
}
```

---

## 🚢 Deployment

Deployed on **Vercel**. For production:

```bash
npm run build
npx prisma migrate deploy
npm start
```

Ensure `DATABASE_URL`, `JWT_SECRET`, and `CLIENT_URL` are set in your hosting provider's environment settings.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

## 👨‍💻 Author

**Rahat**
Full Stack Developer

---

## 📄 License

Licensed under the **MIT License**.
