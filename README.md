# ⚙️ Hotel Booking Management Backend

This is the backend API for the Hotel Booking Management System built with **Node.js, Express.js, TypeScript, Prisma ORM, and SQL database**.

---

## 🚀 Live API

https://hotel-booking-management-backend-blush.vercel.app  

---

## 🧱 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQL Database (PostgreSQL / MySQL)
- Better Auth (Authentication)
- CORS
- dotenv

---

## 📌 Features

### 🔐 Authentication
- User sign up / login
- Session-based authentication
- Protected routes
- Role-based access control

### 🏨 Room Management
- Create rooms
- Update rooms
- Delete rooms
- Fetch rooms with filters

### 📅 Booking System
- Create booking
- View bookings
- Cancel booking
- User-specific booking history

### 👤 User Management
- Get user profile
- Role-based permissions (Admin, Manager, Customer)

---

## 🗄️ Database

- ORM: Prisma
- Database: SQL (PostgreSQL / MySQL)
- Schema-driven development
- Migrations handled via Prisma

---

## 📁 Project Structure

```
backend/
│
├── prisma/
│   ├── schema.prisma
│
├── src/
│   ├── modules/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── config/
│   └── app.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
CLIENT_URL=https://hotel-booking-managemet-frontend.vercel.app
```

---

## 🛠 Installation & Setup

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Prisma setup

```
npx prisma generate
npx prisma migrate dev
```

### 3️⃣ Run development server

```
npm run dev
```

---

## 📡 API Routes

### Auth Routes
```
POST /api/auth/sign-up
POST /api/auth/sign-in
GET  /api/auth/me
```

### Room Routes
```
GET    /api/v1/rooms
POST   /api/v1/rooms
PUT    /api/v1/rooms/:id
DELETE /api/v1/rooms/:id
```

### Booking Routes
```
GET    /api/v1/bookings
POST   /api/v1/bookings
DELETE /api/v1/bookings/:id
```

---

## 🔐 Middleware

- Authentication middleware
- Authorization middleware (role-based)
- Error handling middleware
- CORS configuration

---

## 🧪 Testing

- Postman
- Thunder Client

---

## 🚀 Deployment

- Hosted on Vercel / similar serverless platform
- Prisma connected with cloud SQL database
- Environment variables configured in production

---

## 👨‍💻 Author

Rahat  
Full Stack Developer

---

## 📄 License

MIT License
