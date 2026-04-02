
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";

// src/app/routes/index.ts
import { Router as Router12 } from "express";

// src/app/modules/auth/auth.routes.ts
import { Router } from "express";

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data, meta } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
    meta
  });
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      decoded
    };
  } catch (err) {
    return {
      success: false,
      message: "Invalid token"
    };
  }
};

// src/app/config/env.ts
import dotenv from "dotenv";

// src/app/errorHelper/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/app/config/env.ts
import status from "http-status";
dotenv.config();
var loadEnvVariables = () => {
  const requireEnvVariable = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "BACKEND_URL",
    "FRONTEND_URL",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE",
    // "EMAIL_SENDER_SMTP_USER",
    // "EMAIL_SENDER_SMTP_PASS",
    // "EMAIL_SENDER_SMTP_HOST",
    // "EMAIL_SENDER_SMTP_PORT",
    // "EMAIL_SENDER_SMTP_FROM",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "SSL_STORE_ID",
    "SSL_STORE_PASS"
    // "CLOUDINARY_CLOUD_NAME",
    // "CLOUDINARY_API_KEY",
    // "CLOUDINARY_API_SECRET",
    // "STRIPE_SECRET_KEY",
    // "STRIPE_WEBHOOK_SECRET",
    // "SUPER_ADMIN_EMAIL",
    // "SUPER_ADMIN_PASSWORD",
  ];
  requireEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new AppError_default(
        status.INTERNAL_SERVER_ERROR,
        `Environment variable ${variable} is required but not set in .env file.`
      );
    }
  });
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
    // EMAIL_SENDER: {
    //   SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER as string,
    //   SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS as string,
    //   SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST as string,
    //   SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT as string,
    //   SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM as string,
    // },
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    SSL_STORE_ID: process.env.SSL_STORE_ID,
    SSL_STORE_PASS: process.env.SSL_STORE_PASS
    // CLOUDINARY: {
    //   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    //   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    //   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    // },
    // STRIPE: {
    //   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
    //   STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET as string,
    // },
    // SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    // SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};
var envVars = loadEnvVariables();

// src/app/utils/cookie.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};

// src/app/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = createToken(payload, envVars.ACCESS_TOKEN_SECRET, {
    expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN
  });
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = createToken(payload, envVars.REFRESH_TOKEN_SECRET, {
    expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN
  });
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24 * 1e3
    //* 1 day
  });
};
var setRefreshTokenCookie = (res, token) => {
  setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1e3 * 7
    //* 7 day
  });
};
var setBetterAuthSessionCookie = (res, token) => {
  setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24 * 1e3
  });
};

// src/app/modules/auth/auth.service.ts
import status2 from "http-status";

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String   @id @default(uuid())\n  name          String\n  email         String   @unique\n  phone         String?\n  role          UserRole @default(CUSTOMER)\n  emailVerified Boolean  @default(false)\n  tokenVersion  Int      @default(0) @map("token_version")\n  image         String?\n  createdAt     DateTime @default(now()) @map("created_at") @db.Timestamp(6)\n  updatedAt     DateTime @updatedAt @map("updated_at") @db.Timestamp(6)\n\n  sessions     Session[]\n  accounts     Account[]\n  reviews      Review[]\n  wishlists    Wishlist[]\n  reservations Reservation[]\n\n  @@map("users")\n}\n\nmodel Session {\n  id        String   @id @default(cuid())\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String   @map("user_id")\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("sessions")\n}\n\nmodel Account {\n  id                    String    @id @default(cuid())\n  accountId             String    @map("account_id")\n  providerId            String    @map("provider_id")\n  userId                String    @map("user_id")\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?   @map("access_token")\n  refreshToken          String?   @map("refresh_token")\n  idToken               String?   @map("id_token")\n  accessTokenExpiresAt  DateTime? @map("access_token_expires_at")\n  refreshTokenExpiresAt DateTime? @map("refresh_token_expires_at")\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@unique([providerId, accountId])\n  @@index([userId])\n  @@map("accounts")\n}\n\nmodel Verification {\n  id         String   @id @default(cuid())\n  identifier String\n  value      String\n  expiresAt  DateTime @map("expires_at")\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verifications")\n}\n\nmodel Checkin {\n  id            String        @id @default(uuid())\n  reservationId String        @unique @map("reservation_id")\n  roomId        String        @map("room_id")\n  checkinTime   DateTime      @map("checkin_time") @db.Timestamp(6)\n  checkoutTime  DateTime?     @map("checkout_time") @db.Timestamp(6)\n  status        CheckinStatus @default(PENDING)\n  notes         String?\n  createdAt     DateTime      @default(now()) @map("created_at") @db.Timestamp(6)\n  updatedAt     DateTime      @updatedAt @map("updated_at") @db.Timestamp(6)\n\n  reservation Reservation @relation(fields: [reservationId], references: [id], onDelete: Cascade, name: "checkin_reservation")\n  room        Room        @relation(fields: [roomId], references: [id], onDelete: Cascade)\n\n  @@map("checkins")\n}\n\nenum UserRole {\n  CUSTOMER\n  MANAGER\n  ADMIN\n}\n\nenum ReservationStatus {\n  HOLD\n  CONFIRMED\n  CANCELLED\n  EXPIRED\n  COMPLETED\n}\n\nenum PaymentStatus {\n  PENDING\n  SUCCESS\n  FAILED\n}\n\nenum RefundStatus {\n  NONE\n  PENDING\n  COMPLETED\n}\n\nenum CheckinStatus {\n  PENDING\n  CHECKED_IN\n  CHECKED_OUT\n}\n\nenum PaymentMethod {\n  STRIPE\n  SSLCOMMERZ\n}\n\nmodel Payment {\n  id            String        @id @default(uuid())\n  reservationId String        @unique @map("reservation_id")\n  amount        Decimal       @db.Decimal(10, 2)\n  currency      String        @default("USD")\n  paymentMethod PaymentMethod\n  status        PaymentStatus @default(PENDING)\n  refundStatus  RefundStatus  @default(NONE) @map("refund_status")\n  refundAmount  Decimal?      @map("refund_amount") @db.Decimal(10, 2)\n  transactionId String?       @unique @map("transaction_id")\n  createdAt     DateTime      @default(now()) @map("created_at") @db.Timestamp(6)\n  updatedAt     DateTime      @updatedAt @map("updated_at") @db.Timestamp(6)\n\n  reservation Reservation @relation(fields: [reservationId], references: [id], onDelete: Cascade, name: "payment_reservation")\n\n  @@map("payments")\n}\n\nmodel Reservation {\n  id     String @id @default(uuid())\n  userId String @map("user_id")\n  roomId String @map("room_id")\n\n  checkInDate  DateTime\n  checkOutDate DateTime\n\n  adults      Int @default(1) // \u{1F448} NEW\n  children    Int @default(0) // \u{1F448} NEW\n  roomsBooked Int @default(1) // \u{1F448} NEW (multiple room)\n  extraBed    Int @default(0) // \u{1F448} NEW\n\n  totalPrice Decimal @db.Decimal(10, 2)\n\n  status ReservationStatus @default(HOLD)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user      User                  @relation(fields: [userId], references: [id], onDelete: Cascade)\n  room      Room                  @relation(fields: [roomId], references: [id], onDelete: Cascade)\n  payment   Payment?              @relation("payment_reservation")\n  checkin   Checkin?              @relation("checkin_reservation")\n  documents ReservationDocument[] @relation("reservation_documents")\n  services  ReservationService[] // \u{1F448} NEW\n}\n\nmodel ReservationService {\n  id            String @id @default(uuid())\n  reservationId String\n  serviceId     String\n\n  quantity Int @default(1)\n\n  reservation Reservation @relation(fields: [reservationId], references: [id])\n  service     Service     @relation(fields: [serviceId], references: [id])\n}\n\nmodel ReservationDocument {\n  id            String   @id @default(uuid())\n  reservationId String   @map("reservation_id")\n  documentType  String   @map("document_type")\n  documentUrl   String   @map("document_url")\n  createdAt     DateTime @default(now()) @map("created_at") @db.Timestamp(6)\n\n  reservation Reservation @relation("reservation_documents", fields: [reservationId], references: [id], onDelete: Cascade)\n\n  @@map("reservation_documents")\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  userId    String   @map("user_id")\n  roomId    String   @map("room_id")\n  rating    Int\n  comment   String?\n  createdAt DateTime @default(now()) @map("created_at") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamp(6)\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n  room Room @relation(fields: [roomId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, roomId])\n  @@map("reviews")\n}\n\nmodel RoomType {\n  id    String @id @default(uuid())\n  name  String @unique\n  rooms Room[]\n\n  @@map("room_types")\n}\n\nmodel Room {\n  id          String   @id @default(uuid())\n  name        String\n  description String?\n  price       Decimal  @db.Decimal(10, 2)\n  capacity    Int\n  roomTypeId  String   @map("room_type_id")\n  isAvailable Boolean  @default(true) @map("is_available")\n  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamp(6)\n  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamp(6)\n\n  roomType     RoomType      @relation(fields: [roomTypeId], references: [id], onDelete: Cascade)\n  images       RoomImage[]\n  reservations Reservation[]\n  checkins     Checkin[]\n  reviews      Review[]\n  wishlists    Wishlist[]\n\n  extraBedPrice Decimal? @db.Decimal(10, 2) // \u{1F448} NEW\n  maxExtraBed   Int      @default(0) // \u{1F448} NEW\n\n  @@map("rooms")\n}\n\nmodel RoomImage {\n  id        String   @id @default(uuid())\n  roomId    String   @map("room_id")\n  imageUrl  String[] @map("image_url")\n  createdAt DateTime @default(now()) @map("created_at") @db.Timestamp(6)\n\n  room Room @relation(fields: [roomId], references: [id], onDelete: Cascade)\n\n  @@map("room_images")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id       String  @id @default(uuid())\n  name     String\n  price    Decimal @db.Decimal(10, 2)\n  type     String // PER_NIGHT / PER_PERSON\n  isActive Boolean @default(true)\n\n  reservations ReservationService[]\n}\n\nmodel Wishlist {\n  id        String   @id @default(uuid())\n  userId    String   @map("user_id")\n  roomId    String   @map("room_id")\n  createdAt DateTime @default(now()) @map("created_at") @db.Timestamp(6)\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n  room Room @relation(fields: [roomId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, roomId])\n  @@map("wishlists")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"tokenVersion","kind":"scalar","type":"Int","dbName":"token_version"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"wishlists","kind":"object","type":"Wishlist","relationName":"UserToWishlist"},{"name":"reservations","kind":"object","type":"Reservation","relationName":"ReservationToUser"}],"dbName":"users"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"sessions"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String","dbName":"account_id"},{"name":"providerId","kind":"scalar","type":"String","dbName":"provider_id"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String","dbName":"access_token"},{"name":"refreshToken","kind":"scalar","type":"String","dbName":"refresh_token"},{"name":"idToken","kind":"scalar","type":"String","dbName":"id_token"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime","dbName":"access_token_expires_at"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime","dbName":"refresh_token_expires_at"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"accounts"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime","dbName":"expires_at"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verifications"},"Checkin":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reservationId","kind":"scalar","type":"String","dbName":"reservation_id"},{"name":"roomId","kind":"scalar","type":"String","dbName":"room_id"},{"name":"checkinTime","kind":"scalar","type":"DateTime","dbName":"checkin_time"},{"name":"checkoutTime","kind":"scalar","type":"DateTime","dbName":"checkout_time"},{"name":"status","kind":"enum","type":"CheckinStatus"},{"name":"notes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"reservation","kind":"object","type":"Reservation","relationName":"checkin_reservation"},{"name":"room","kind":"object","type":"Room","relationName":"CheckinToRoom"}],"dbName":"checkins"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reservationId","kind":"scalar","type":"String","dbName":"reservation_id"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"refundStatus","kind":"enum","type":"RefundStatus","dbName":"refund_status"},{"name":"refundAmount","kind":"scalar","type":"Decimal","dbName":"refund_amount"},{"name":"transactionId","kind":"scalar","type":"String","dbName":"transaction_id"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"reservation","kind":"object","type":"Reservation","relationName":"payment_reservation"}],"dbName":"payments"},"Reservation":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"roomId","kind":"scalar","type":"String","dbName":"room_id"},{"name":"checkInDate","kind":"scalar","type":"DateTime"},{"name":"checkOutDate","kind":"scalar","type":"DateTime"},{"name":"adults","kind":"scalar","type":"Int"},{"name":"children","kind":"scalar","type":"Int"},{"name":"roomsBooked","kind":"scalar","type":"Int"},{"name":"extraBed","kind":"scalar","type":"Int"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"ReservationStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ReservationToUser"},{"name":"room","kind":"object","type":"Room","relationName":"ReservationToRoom"},{"name":"payment","kind":"object","type":"Payment","relationName":"payment_reservation"},{"name":"checkin","kind":"object","type":"Checkin","relationName":"checkin_reservation"},{"name":"documents","kind":"object","type":"ReservationDocument","relationName":"reservation_documents"},{"name":"services","kind":"object","type":"ReservationService","relationName":"ReservationToReservationService"}],"dbName":null},"ReservationService":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reservationId","kind":"scalar","type":"String"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"reservation","kind":"object","type":"Reservation","relationName":"ReservationToReservationService"},{"name":"service","kind":"object","type":"Service","relationName":"ReservationServiceToService"}],"dbName":null},"ReservationDocument":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reservationId","kind":"scalar","type":"String","dbName":"reservation_id"},{"name":"documentType","kind":"scalar","type":"String","dbName":"document_type"},{"name":"documentUrl","kind":"scalar","type":"String","dbName":"document_url"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"reservation","kind":"object","type":"Reservation","relationName":"reservation_documents"}],"dbName":"reservation_documents"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"roomId","kind":"scalar","type":"String","dbName":"room_id"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"room","kind":"object","type":"Room","relationName":"ReviewToRoom"}],"dbName":"reviews"},"RoomType":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"rooms","kind":"object","type":"Room","relationName":"RoomToRoomType"}],"dbName":"room_types"},"Room":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"capacity","kind":"scalar","type":"Int"},{"name":"roomTypeId","kind":"scalar","type":"String","dbName":"room_type_id"},{"name":"isAvailable","kind":"scalar","type":"Boolean","dbName":"is_available"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"roomType","kind":"object","type":"RoomType","relationName":"RoomToRoomType"},{"name":"images","kind":"object","type":"RoomImage","relationName":"RoomToRoomImage"},{"name":"reservations","kind":"object","type":"Reservation","relationName":"ReservationToRoom"},{"name":"checkins","kind":"object","type":"Checkin","relationName":"CheckinToRoom"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToRoom"},{"name":"wishlists","kind":"object","type":"Wishlist","relationName":"RoomToWishlist"},{"name":"extraBedPrice","kind":"scalar","type":"Decimal"},{"name":"maxExtraBed","kind":"scalar","type":"Int"}],"dbName":"rooms"},"RoomImage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"roomId","kind":"scalar","type":"String","dbName":"room_id"},{"name":"imageUrl","kind":"scalar","type":"String","dbName":"image_url"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"room","kind":"object","type":"Room","relationName":"RoomToRoomImage"}],"dbName":"room_images"},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"type","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"reservations","kind":"object","type":"ReservationService","relationName":"ReservationServiceToService"}],"dbName":null},"Wishlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String","dbName":"user_id"},{"name":"roomId","kind":"scalar","type":"String","dbName":"room_id"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"user","kind":"object","type":"User","relationName":"UserToWishlist"},{"name":"room","kind":"object","type":"Room","relationName":"RoomToWishlist"}],"dbName":"wishlists"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","rooms","_count","roomType","room","images","reservation","payment","checkin","documents","reservations","service","services","checkins","reviews","wishlists","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_avg","_sum","_min","_max","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Checkin.findUnique","Checkin.findUniqueOrThrow","Checkin.findFirst","Checkin.findFirstOrThrow","Checkin.findMany","Checkin.createOne","Checkin.createMany","Checkin.createManyAndReturn","Checkin.updateOne","Checkin.updateMany","Checkin.updateManyAndReturn","Checkin.upsertOne","Checkin.deleteOne","Checkin.deleteMany","Checkin.groupBy","Checkin.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Reservation.findUnique","Reservation.findUniqueOrThrow","Reservation.findFirst","Reservation.findFirstOrThrow","Reservation.findMany","Reservation.createOne","Reservation.createMany","Reservation.createManyAndReturn","Reservation.updateOne","Reservation.updateMany","Reservation.updateManyAndReturn","Reservation.upsertOne","Reservation.deleteOne","Reservation.deleteMany","Reservation.groupBy","Reservation.aggregate","ReservationService.findUnique","ReservationService.findUniqueOrThrow","ReservationService.findFirst","ReservationService.findFirstOrThrow","ReservationService.findMany","ReservationService.createOne","ReservationService.createMany","ReservationService.createManyAndReturn","ReservationService.updateOne","ReservationService.updateMany","ReservationService.updateManyAndReturn","ReservationService.upsertOne","ReservationService.deleteOne","ReservationService.deleteMany","ReservationService.groupBy","ReservationService.aggregate","ReservationDocument.findUnique","ReservationDocument.findUniqueOrThrow","ReservationDocument.findFirst","ReservationDocument.findFirstOrThrow","ReservationDocument.findMany","ReservationDocument.createOne","ReservationDocument.createMany","ReservationDocument.createManyAndReturn","ReservationDocument.updateOne","ReservationDocument.updateMany","ReservationDocument.updateManyAndReturn","ReservationDocument.upsertOne","ReservationDocument.deleteOne","ReservationDocument.deleteMany","ReservationDocument.groupBy","ReservationDocument.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","RoomType.findUnique","RoomType.findUniqueOrThrow","RoomType.findFirst","RoomType.findFirstOrThrow","RoomType.findMany","RoomType.createOne","RoomType.createMany","RoomType.createManyAndReturn","RoomType.updateOne","RoomType.updateMany","RoomType.updateManyAndReturn","RoomType.upsertOne","RoomType.deleteOne","RoomType.deleteMany","RoomType.groupBy","RoomType.aggregate","Room.findUnique","Room.findUniqueOrThrow","Room.findFirst","Room.findFirstOrThrow","Room.findMany","Room.createOne","Room.createMany","Room.createManyAndReturn","Room.updateOne","Room.updateMany","Room.updateManyAndReturn","Room.upsertOne","Room.deleteOne","Room.deleteMany","Room.groupBy","Room.aggregate","RoomImage.findUnique","RoomImage.findUniqueOrThrow","RoomImage.findFirst","RoomImage.findFirstOrThrow","RoomImage.findMany","RoomImage.createOne","RoomImage.createMany","RoomImage.createManyAndReturn","RoomImage.updateOne","RoomImage.updateMany","RoomImage.updateManyAndReturn","RoomImage.upsertOne","RoomImage.deleteOne","RoomImage.deleteMany","RoomImage.groupBy","RoomImage.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","Wishlist.findUnique","Wishlist.findUniqueOrThrow","Wishlist.findFirst","Wishlist.findFirstOrThrow","Wishlist.findMany","Wishlist.createOne","Wishlist.createMany","Wishlist.createManyAndReturn","Wishlist.updateOne","Wishlist.updateMany","Wishlist.updateManyAndReturn","Wishlist.upsertOne","Wishlist.deleteOne","Wishlist.deleteMany","Wishlist.groupBy","Wishlist.aggregate","AND","OR","NOT","id","userId","roomId","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","price","type","isActive","every","some","none","imageUrl","has","hasEvery","hasSome","description","capacity","roomTypeId","isAvailable","updatedAt","extraBedPrice","maxExtraBed","rating","comment","reservationId","documentType","documentUrl","serviceId","quantity","checkInDate","checkOutDate","adults","children","roomsBooked","extraBed","totalPrice","ReservationStatus","status","amount","currency","PaymentMethod","paymentMethod","PaymentStatus","RefundStatus","refundStatus","refundAmount","transactionId","checkinTime","checkoutTime","CheckinStatus","notes","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","email","phone","UserRole","role","emailVerified","tokenVersion","image","userId_roomId","providerId_accountId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "oweMAfABEgQAAOUDACAFAADmAwAgDwAA6QMAIBMAAOcDACAUAADoAwAgjQIAAOEDADCOAgAAQQAQjwIAAOEDADCQAgEAAAABkwJAANADACGfAgEApgMAIa4CQADQAwAh3QIBAAAAAd4CAQDiAwAh4AIAAOMD4AIi4QIgAKgDACHiAgIA5AMAIeMCAQDiAwAhAQAAAAEAIAwDAADsAwAgjQIAAIIEADCOAgAAAwAQjwIAAIIEADCQAgEApgMAIZECAQCmAwAhkwJAANADACGuAkAA0AMAIdACQADQAwAh2gIBAKYDACHbAgEA4gMAIdwCAQDiAwAhAwMAAL0GACDbAgAArAQAINwCAACsBAAgDAMAAOwDACCNAgAAggQAMI4CAAADABCPAgAAggQAMJACAQAAAAGRAgEApgMAIZMCQADQAwAhrgJAANADACHQAkAA0AMAIdoCAQAAAAHbAgEA4gMAIdwCAQDiAwAhAwAAAAMAIAEAAAQAMAIAAAUAIBEDAADsAwAgjQIAAIEEADCOAgAABwAQjwIAAIEEADCQAgEApgMAIZECAQCmAwAhkwJAANADACGuAkAA0AMAIdECAQCmAwAh0gIBAKYDACHTAgEA4gMAIdQCAQDiAwAh1QIBAOIDACHWAkAA7wMAIdcCQADvAwAh2AIBAOIDACHZAgEA4gMAIQgDAAC9BgAg0wIAAKwEACDUAgAArAQAINUCAACsBAAg1gIAAKwEACDXAgAArAQAINgCAACsBAAg2QIAAKwEACASAwAA7AMAII0CAACBBAAwjgIAAAcAEI8CAACBBAAwkAIBAAAAAZECAQCmAwAhkwJAANADACGuAkAA0AMAIdECAQCmAwAh0gIBAKYDACHTAgEA4gMAIdQCAQDiAwAh1QIBAOIDACHWAkAA7wMAIdcCQADvAwAh2AIBAOIDACHZAgEA4gMAIeUCAACABAAgAwAAAAcAIAEAAAgAMAIAAAkAIAwDAADsAwAgCQAA7QMAII0CAAD_AwAwjgIAAAsAEI8CAAD_AwAwkAIBAKYDACGRAgEApgMAIZICAQCmAwAhkwJAANADACGuAkAA0AMAIbECAgDkAwAhsgIBAOIDACEDAwAAvQYAIAkAAL4GACCyAgAArAQAIA0DAADsAwAgCQAA7QMAII0CAAD_AwAwjgIAAAsAEI8CAAD_AwAwkAIBAAAAAZECAQCmAwAhkgIBAKYDACGTAkAA0AMAIa4CQADQAwAhsQICAOQDACGyAgEA4gMAIeQCAAD-AwAgAwAAAAsAIAEAAAwAMAIAAA0AIBQIAAD7AwAgCgAA_AMAIA8AAOkDACASAAD9AwAgEwAA5wMAIBQAAOgDACCNAgAA-gMAMI4CAAAPABCPAgAA-gMAMJACAQCmAwAhkwJAANADACGfAgEApgMAIaACEACnAwAhqgIBAOIDACGrAgIA5AMAIawCAQCmAwAhrQIgAKgDACGuAkAA0AMAIa8CEADPAwAhsAICAOQDACEICAAAwwYAIAoAAMQGACAPAAC8BgAgEgAAxQYAIBMAALoGACAUAAC7BgAgqgIAAKwEACCvAgAArAQAIBQIAAD7AwAgCgAA_AMAIA8AAOkDACASAAD9AwAgEwAA5wMAIBQAAOgDACCNAgAA-gMAMI4CAAAPABCPAgAA-gMAMJACAQAAAAGTAkAA0AMAIZ8CAQCmAwAhoAIQAKcDACGqAgEA4gMAIasCAgDkAwAhrAIBAKYDACGtAiAAqAMAIa4CQADQAwAhrwIQAM8DACGwAgIA5AMAIQMAAAAPACABAAAQADACAAARACABAAAADwAgCAkAAO0DACCNAgAA-QMAMI4CAAAUABCPAgAA-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_wUAIBMAAP0FACAUAAD-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_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_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_QIAEI8CAACeAwAwkAIBAJcDACGfAgEAlwMAIaACEACfAwAhoQIBAJcDACGiAiAAoAMAIQMAAADqAgAgAQAA_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_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-wMAIAoAAPwDACAPAADpAwAgEgAA_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_wMAMI4CAAALABCPAgAA_wMAMJACAQAAAAGRAgEApgMAIZICAQCmAwAhkwJAANADACGuAkAA0AMAIbECAgDkAwAhsgIBAOIDACHkAgAA_gMAIAIAAAANACAaAADQBAAgAgAAAM4EACAaAADPBAAgCo0CAADNBAAwjgIAAM4EABCPAgAAzQQAMJACAQCmAwAhkQIBAKYDACGSAgEApgMAIZMCQADQAwAhrgJAANADACGxAgIA5AMAIbICAQDiAwAhCo0CAADNBAAwjgIAAM4EABCPAgAAzQQAMJACAQCmAwAhkQIBAKYDACGSAgEApgMAIZMCQADQAwAhrgJAANADACGxAgIA5AMAIbICAQDiAwAhBpACAQCGBAAhkQIBAIYEACGTAkAAhwQAIa4CQACHBAAhsQICAJ4EACGyAgEAsgQAIQcDAADRBAAgkAIBAIYEACGRAgEAhgQAIZMCQACHBAAhrgJAAIcEACGxAgIAngQAIbICAQCyBAAhBSEAAIUHACAiAACIBwAg6AIAAIYHACDpAgAAhwcAIO4CAAABACAHAwAA0wQAIJACAQAAAAGRAgEAAAABkwJAAAAAAa4CQAAAAAGxAgIAAAABsgIBAAAAAQMhAACFBwAg6AIAAIYHACDuAgAAAQAgCQsAAOMEACCQAgEAAAABkwJAAAAAAa4CQAAAAAGzAgEAAAABwAIAAADNAgLKAkAAAAABywJAAAAAAc0CAQAAAAECAAAALQAgIQAA4gQAIAMAAAAtACAhAADiBAAgIgAA4AQAIAEaAACEBwAwDgkAAO0DACALAADRAwAgjQIAAO4DADCOAgAAHgAQjwIAAO4DADCQAgEAAAABkgIBAKYDACGTAkAA0AMAIa4CQADQAwAhswIBAAAAAcACAADwA80CIsoCQADQAwAhywJAAO8DACHNAgEA4gMAIQIAAAAtACAaAADgBAAgAgAAANwEACAaAADdBAAgDI0CAADbBAAwjgIAANwEABCPAgAA2wQAMJACAQCmAwAhkgIBAKYDACGTAkAA0AMAIa4CQADQAwAhswIBAKYDACHAAgAA8APNAiLKAkAA0AMAIcsCQADvAwAhzQIBAOIDACEMjQIAANsEADCOAgAA3AQAEI8CAADbBAAwkAIBAKYDACGSAgEApgMAIZMCQADQAwAhrgJAANADACGzAgEApgMAIcACAADwA80CIsoCQADQAwAhywJAAO8DACHNAgEA4gMAIQiQAgEAhgQAIZMCQACHBAAhrgJAAIcEACGzAgEAhgQAIcACAADfBM0CIsoCQACHBAAhywJAAN4EACHNAgEAsgQAIQHrAkAAAAABAesCAAAAzQICCQsAAOEEACCQAgEAhgQAIZMCQACHBAAhrgJAAIcEACGzAgEAhgQAIcACAADfBM0CIsoCQACHBAAhywJAAN4EACHNAgEAsgQAIQUhAAD_BgAgIgAAggcAIOgCAACABwAg6QIAAIEHACDuAgAAGgAgCQsAAOMEACCQAgEAAAABkwJAAAAAAa4CQAAAAAGzAgEAAAABwAIAAADNAgLKAkAAAAABywJAAAAAAc0CAQAAAAEDIQAA_wYAIOgCAACABwAg7gIAABoAIBEDAACcBQAgDAAAnQUAIA0AAJ4FACAOAACfBQAgEQAAoAUAIJACAQAAAAGRAgEAAAABkwJAAAAAAa4CQAAAAAG4AkAAAAABuQJAAAAAAboCAgAAAAG7AgIAAAABvAICAAAAAb0CAgAAAAG-AhAAAAABwAIAAADAAgICAAAAGgAgIQAAmwUAIAMAAAAaACAhAACbBQAgIgAA7wQAIAEaAAD-BgAwFgMAAOwDACAJAADtAwAgDAAA9gMAIA0AAPcDACAOAAD4AwAgEQAAqQMAII0CAAD0AwAwjgIAABgAEI8CAAD0AwAwkAIBAAAAAZECAQCmAwAhkgIBAKYDACGTAkAA0AMAIa4CQADQAwAhuAJAANADACG5AkAA0AMAIboCAgDkAwAhuwICAOQDACG8AgIA5AMAIb0CAgDkAwAhvgIQAKcDACHAAgAA9QPAAiICAAAAGgAgGgAA7wQAIAIAAADsBAAgGgAA7QQAIBCNAgAA6wQAMI4CAADsBAAQjwIAAOsEADCQAgEApgMAIZECAQCmAwAhkgIBAKYDACGTAkAA0AMAIa4CQADQAwAhuAJAANADACG5AkAA0AMAIboCAgDkAwAhuwICAOQDACG8AgIA5AMAIb0CAgDkAwAhvgIQAKcDACHAAgAA9QPAAiIQjQIAAOsEADCOAgAA7AQAEI8CAADrBAAwkAIBAKYDACGRAgEApgMAIZICAQCmAwAhkwJAANADACGuAkAA0AMAIbgCQADQAwAhuQJAANADACG6AgIA5AMAIbsCAgDkAwAhvAICAOQDACG9AgIA5AMAIb4CEACnAwAhwAIAAPUDwAIiDJACAQCGBAAhkQIBAIYEACGTAkAAhwQAIa4CQACHBAAhuAJAAIcEACG5AkAAhwQAIboCAgCeBAAhuwICAJ4EACG8AgIAngQAIb0CAgCeBAAhvgIQAJEEACHAAgAA7gTAAiIB6wIAAADAAgIRAwAA8AQAIAwAAPEEACANAADyBAAgDgAA8wQAIBEAAPQEACCQAgEAhgQAIZECAQCGBAAhkwJAAIcEACGuAkAAhwQAIbgCQACHBAAhuQJAAIcEACG6AgIAngQAIbsCAgCeBAAhvAICAJ4EACG9AgIAngQAIb4CEACRBAAhwAIAAO4EwAIiBSEAAO0GACAiAAD8BgAg6AIAAO4GACDpAgAA-wYAIO4CAAABACAHIQAAkwUAICIAAJYFACDoAgAAlAUAIOkCAACVBQAg7AIAABwAIO0CAAAcACDuAgAAsgEAIAchAACMBQAgIgAAjwUAIOgCAACNBQAg6QIAAI4FACDsAgAAHgAg7QIAAB4AIO4CAAAtACALIQAAgAUAMCIAAIUFADDoAgAAgQUAMOkCAACCBQAw6gIAAIMFACDrAgAAhAUAMOwCAACEBQAw7QIAAIQFADDuAgAAhAUAMO8CAACGBQAw8AIAAIcFADALIQAA9QQAMCIAAPkEADDoAgAA9gQAMOkCAAD3BAAw6gIAAPgEACDrAgAAmAQAMOwCAACYBAAw7QIAAJgEADDuAgAAmAQAMO8CAAD6BAAw8AIAAJsEADAEEAAA_wQAIJACAQAAAAG2AgEAAAABtwICAAAAAQIAAAAmACAhAAD-BAAgAwAAACYAICEAAP4EACAiAAD8BAAgARoAAPoGADACAAAAJgAgGgAA_AQAIAIAAACcBAAgGgAA-wQAIAOQAgEAhgQAIbYCAQCGBAAhtwICAJ4EACEEEAAA_QQAIJACAQCGBAAhtgIBAIYEACG3AgIAngQAIQUhAAD1BgAgIgAA-AYAIOgCAAD2BgAg6QIAAPcGACDuAgAA5wIAIAQQAAD_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_AMAIA8AAOkDACASAAD9AwAgEwAA5wMAIBQAAOgDACCNAgAA-gMAMI4CAAAPABCPAgAA-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_AUAIA8AAP8FACATAAD9BQAgFAAA_gUAIBoAAM8GACCQAgEAhgQAIZMCQACHBAAhnwIBAIYEACGuAkAAhwQAId0CAQCGBAAh3gIBALIEACHgAgAA-gXgAiLhAiAAkgQAIeICAgCeBAAh4wIBALIEACEOBQAA_AUAIA8AAP8FACATAAD9BQAgFAAA_gUAIJACAQCGBAAhkwJAAIcEACGfAgEAhgQAIa4CQACHBAAh3QIBAIYEACHeAgEAsgQAIeACAAD6BeACIuECIACSBAAh4gICAJ4EACHjAgEAsgQAIQ4EAACzBgAgDwAAtwYAIBMAALUGACAUAAC2BgAgkAIBAAAAAZMCQAAAAAGfAgEAAAABrgJAAAAAAd0CAQAAAAHeAgEAAAAB4AIAAADgAgLhAiAAAAAB4gICAAAAAeMCAQAAAAECAAAAAQAgIQAA0AYAIAMAAABBACAhAADQBgAgIgAA1AYAIBAAAABBACAEAAD7BQAgDwAA_wUAIBMAAP0FACAUAAD-BQAgGgAA1AYAIJACAQCGBAAhkwJAAIcEACGfAgEAhgQAIa4CQACHBAAh3QIBAIYEACHeAgEAsgQAIeACAAD6BeACIuECIACSBAAh4gICAJ4EACHjAgEAsgQAIQ4EAAD7BQAgDwAA_wUAIBMAAP0FACAUAAD-BQAgkAIBAIYEACGTAkAAhwQAIZ8CAQCGBAAhrgJAAIcEACHdAgEAhgQAId4CAQCyBAAh4AIAAPoF4AIi4QIgAJIEACHiAgIAngQAIeMCAQCyBAAhEgMAAJwFACAJAADcBQAgDQAAngUAIA4AAJ8FACARAACgBQAgkAIBAAAAAZECAQAAAAGSAgEAAAABkwJAAAAAAa4CQAAAAAG4AkAAAAABuQJAAAAAAboCAgAAAAG7AgIAAAABvAICAAAAAb0CAgAAAAG-AhAAAAABwAIAAADAAgICAAAAGgAgIQAA1QYAIAMAAAAYACAhAADVBgAgIgAA2QYAIBQAAAAYACADAADwBAAgCQAA2wUAIA0AAPIEACAOAADzBAAgEQAA9AQAIBoAANkGACCQAgEAhgQAIZECAQCGBAAhkgIBAIYEACGTAkAAhwQAIa4CQACHBAAhuAJAAIcEACG5AkAAhwQAIboCAgCeBAAhuwICAJ4EACG8AgIAngQAIb0CAgCeBAAhvgIQAJEEACHAAgAA7gTAAiISAwAA8AQAIAkAANsFACANAADyBAAgDgAA8wQAIBEAAPQEACCQAgEAhgQAIZECAQCGBAAhkgIBAIYEACGTAkAAhwQAIa4CQACHBAAhuAJAAIcEACG5AkAAhwQAIboCAgCeBAAhuwICAJ4EACG8AgIAngQAIb0CAgCeBAAhvgIQAJEEACHAAgAA7gTAAiIQCAAArQUAIAoAAK4FACASAACwBQAgEwAAsQUAIBQAALIFACCQAgEAAAABkwJAAAAAAZ8CAQAAAAGgAhAAAAABqgIBAAAAAasCAgAAAAGsAgEAAAABrQIgAAAAAa4CQAAAAAGvAhAAAAABsAICAAAAAQIAAAARACAhAADaBgAgAwAAAA8AICEAANoGACAiAADeBgAgEgAAAA8AIAgAALQEACAKAAC1BAAgEgAAtwQAIBMAALgEACAUAAC5BAAgGgAA3gYAIJACAQCGBAAhkwJAAIcEACGfAgEAhgQAIaACEACRBAAhqgIBALIEACGrAgIAngQAIawCAQCGBAAhrQIgAJIEACGuAkAAhwQAIa8CEACzBAAhsAICAJ4EACEQCAAAtAQAIAoAALUEACASAAC3BAAgEwAAuAQAIBQAALkEACCQAgEAhgQAIZMCQACHBAAhnwIBAIYEACGgAhAAkQQAIaoCAQCyBAAhqwICAJ4EACGsAgEAhgQAIa0CIACSBAAhrgJAAIcEACGvAhAAswQAIbACAgCeBAAhEgMAAJwFACAJAADcBQAgDAAAnQUAIA0AAJ4FACARAACgBQAgkAIBAAAAAZECAQAAAAGSAgEAAAABkwJAAAAAAa4CQAAAAAG4AkAAAAABuQJAAAAAAboCAgAAAAG7AgIAAAABvAICAAAAAb0CAgAAAAG-AhAAAAABwAIAAADAAgICAAAAGgAgIQAA3wYAIAMAAAAYACAhAADfBgAgIgAA4wYAIBQAAAAYACADAADwBAAgCQAA2wUAIAwAAPEEACANAADyBAAgEQAA9AQAIBoAAOMGACCQAgEAhgQAIZECAQCGBAAhkgIBAIYEACGTAkAAhwQAIa4CQACHBAAhuAJAAIcEACG5AkAAhwQAIboCAgCeBAAhuwICAJ4EACG8AgIAngQAIb0CAgCeBAAhvgIQAJEEACHAAgAA7gTAAiISAwAA8AQAIAkAANsFACAMAADxBAAgDQAA8gQAIBEAAPQEACCQAgEAhgQAIZECAQCGBAAhkgIBAIYEACGTAkAAhwQAIa4CQACHBAAhuAJAAIcEACG5AkAAhwQAIboCAgCeBAAhuwICAJ4EACG8AgIAngQAIb0CAgCeBAAhvgIQAJEEACHAAgAA7gTAAiIQCAAArQUAIAoAAK4FACAPAACvBQAgEgAAsAUAIBQAALIFACCQAgEAAAABkwJAAAAAAZ8CAQAAAAGgAhAAAAABqgIBAAAAAasCAgAAAAGsAgEAAAABrQIgAAAAAa4CQAAAAAGvAhAAAAABsAICAAAAAQIAAAARACAhAADkBgAgAwAAAA8AICEAAOQGACAiAADoBgAgEgAAAA8AIAgAALQEACAKAAC1BAAgDwAAtgQAIBIAALcEACAUAAC5BAAgGgAA6AYAIJACAQCGBAAhkwJAAIcEACGfAgEAhgQAIaACEACRBAAhqgIBALIEACGrAgIAngQAIawCAQCGBAAhrQIgAJIEACGuAkAAhwQAIa8CEACzBAAhsAICAJ4EACEQCAAAtAQAIAoAALUEACAPAAC2BAAgEgAAtwQAIBQAALkEACCQAgEAhgQAIZMCQACHBAAhnwIBAIYEACGgAhAAkQQAIaoCAQCyBAAhqwICAJ4EACGsAgEAhgQAIa0CIACSBAAhrgJAAIcEACGvAhAAswQAIbACAgCeBAAhCpACAQAAAAGTAkAAAAABnwIBAAAAAaACEAAAAAGqAgEAAAABqwICAAAAAa0CIAAAAAGuAkAAAAABrwIQAAAAAbACAgAAAAECkAIBAAAAAZ8CAQAAAAECAAAAogIAICEAAOoGACADkAIBAAAAAZMCQAAAAAGmAgAAqgQAIA4EAACzBgAgBQAAtAYAIBMAALUGACAUAAC2BgAgkAIBAAAAAZMCQAAAAAGfAgEAAAABrgJAAAAAAd0CAQAAAAHeAgEAAAAB4AIAAADgAgLhAiAAAAAB4gICAAAAAeMCAQAAAAECAAAAAQAgIQAA7QYAIBAIAACtBQAgCgAArgUAIA8AAK8FACATAACxBQAgFAAAsgUAIJACAQAAAAGTAkAAAAABnwIBAAAAAaACEAAAAAGqAgEAAAABqwICAAAAAawCAQAAAAGtAiAAAAABrgJAAAAAAa8CEAAAAAGwAgIAAAABAgAAABEAICEAAO8GACADAAAADwAgIQAA7wYAICIAAPMGACASAAAADwAgCAAAtAQAIAoAALUEACAPAAC2BAAgEwAAuAQAIBQAALkEACAaAADzBgAgkAIBAIYEACGTAkAAhwQAIZ8CAQCGBAAhoAIQAJEEACGqAgEAsgQAIasCAgCeBAAhrAIBAIYEACGtAiAAkgQAIa4CQACHBAAhrwIQALMEACGwAgIAngQAIRAIAAC0BAAgCgAAtQQAIA8AALYEACATAAC4BAAgFAAAuQQAIJACAQCGBAAhkwJAAIcEACGfAgEAhgQAIaACEACRBAAhqgIBALIEACGrAgIAngQAIawCAQCGBAAhrQIgAJIEACGuAkAAhwQAIa8CEACzBAAhsAICAJ4EACEEkAIBAAAAAZMCQAAAAAG0AgEAAAABtQIBAAAAAQWQAgEAAAABnwIBAAAAAaACEAAAAAGhAgEAAAABogIgAAAAAQIAAADnAgAgIQAA9QYAIAMAAADqAgAgIQAA9QYAICIAAPkGACAHAAAA6gIAIBoAAPkGACCQAgEAhgQAIZ8CAQCGBAAhoAIQAJEEACGhAgEAhgQAIaICIACSBAAhBZACAQCGBAAhnwIBAIYEACGgAhAAkQQAIaECAQCGBAAhogIgAJIEACEDkAIBAAAAAbYCAQAAAAG3AgIAAAABAwAAAEEAICEAAO0GACAiAAD9BgAgEAAAAEEAIAQAAPsFACAFAAD8BQAgEwAA_QUAIBQAAP4FACAaAAD9BgAgkAIBAIYEACGTAkAAhwQAIZ8CAQCGBAAhrgJAAIcEACHdAgEAhgQAId4CAQCyBAAh4AIAAPoF4AIi4QIgAJIEACHiAgIAngQAIeMCAQCyBAAhDgQAAPsFACAFAAD8BQAgEwAA_QUAIBQAAP4FACCQAgEAhgQAIZMCQACHBAAhnwIBAIYEACGuAkAAhwQAId0CAQCGBAAh3gIBALIEACHgAgAA-gXgAiLhAiAAkgQAIeICAgCeBAAh4wIBALIEACEMkAIBAAAAAZECAQAAAAGTAkAAAAABrgJAAAAAAbgCQAAAAAG5AkAAAAABugICAAAAAbsCAgAAAAG8AgIAAAABvQICAAAAAb4CEAAAAAHAAgAAAMACAhIDAACcBQAgCQAA3AUAIAwAAJ0FACAOAACfBQAgEQAAoAUAIJACAQAAAAGRAgEAAAABkgIBAAAAAZMCQAAAAAGuAkAAAAABuAJAAAAAAbkCQAAAAAG6AgIAAAABuwICAAAAAbwCAgAAAAG9AgIAAAABvgIQAAAAAcACAAAAwAICAgAAABoAICEAAP8GACADAAAAGAAgIQAA_wYAICIAAIMHACAUAAAAGAAgAwAA8AQAIAkAANsFACAMAADxBAAgDgAA8wQAIBEAAPQEACAaAACDBwAgkAIBAIYEACGRAgEAhgQAIZICAQCGBAAhkwJAAIcEACGuAkAAhwQAIbgCQACHBAAhuQJAAIcEACG6AgIAngQAIbsCAgCeBAAhvAICAJ4EACG9AgIAngQAIb4CEACRBAAhwAIAAO4EwAIiEgMAAPAEACAJAADbBQAgDAAA8QQAIA4AAPMEACARAAD0BAAgkAIBAIYEACGRAgEAhgQAIZICAQCGBAAhkwJAAIcEACGuAkAAhwQAIbgCQACHBAAhuQJAAIcEACG6AgIAngQAIbsCAgCeBAAhvAICAJ4EACG9AgIAngQAIb4CEACRBAAhwAIAAO4EwAIiCJACAQAAAAGTAkAAAAABrgJAAAAAAbMCAQAAAAHAAgAAAM0CAsoCQAAAAAHLAkAAAAABzQIBAAAAAQ4EAACzBgAgBQAAtAYAIA8AALcGACAUAAC2BgAgkAIBAAAAAZMCQAAAAAGfAgEAAAABrgJAAAAAAd0CAQAAAAHeAgEAAAAB4AIAAADgAgLhAiAAAAAB4gICAAAAAeMCAQAAAAECAAAAAQAgIQAAhQcAIAMAAABBACAhAACFBwAgIgAAiQcAIBAAAABBACAEAAD7BQAgBQAA_AUAIA8AAP8FACAUAAD-BQAgGgAAiQcAIJACAQCGBAAhkwJAAIcEACGfAgEAhgQAIa4CQACHBAAh3QIBAIYEACHeAgEAsgQAIeACAAD6BeACIuECIACSBAAh4gICAJ4EACHjAgEAsgQAIQ4EAAD7BQAgBQAA_AUAIA8AAP8FACAUAAD-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-wUAIAUAAPwFACAPAAD_BQAgEwAA_QUAIBoAAKMHACCQAgEAhgQAIZMCQACHBAAhnwIBAIYEACGuAkAAhwQAId0CAQCGBAAh3gIBALIEACHgAgAA-gXgAiLhAiAAkgQAIeICAgCeBAAh4wIBALIEACEOBAAA-wUAIAUAAPwFACAPAAD_BQAgEwAA_QUAIJACAQCGBAAhkwJAAIcEACGfAgEAhgQAIa4CQACHBAAh3QIBAIYEACHeAgEAsgQAIeACAAD6BeACIuECIACSBAAh4gICAJ4EACHjAgEAsgQAIQYEBgIFCgMHABMPOgkTDgQUOREBAwABAQMAAQIDAAEJAAUHBwASCAAGChcIDxsJEi4LEy8EFDMRAgYSBQcABwEGEwABCQAFBwMAAQcAEAkABQwdCg0fCw4jDBEnDQELAAkCCQAFCwAJAQsACQILAAkQAA4CBwAPDygNAQ8pAAIOKgARKwACAwABCQAFBQo0AA81ABI2ABM3ABQ4AAUEOwAFPAAPPwATPQAUPgAAAAAFBwAYJwAZKAAaKQAbKgAcAAAAAAAFBwAYJwAZKAAaKQAbKgAcAQMAAQEDAAEDBwAhKQAiKgAjAAAAAwcAISkAIioAIwEDAAEBAwABAwcAKCkAKSoAKgAAAAMHACgpACkqACoAAAADBwAwKQAxKgAyAAAAAwcAMCkAMSoAMgIJAAULAAkCCQAFCwAJAwcANykAOCoAOQAAAAMHADcpADgqADkBCwAJAQsACQUHAD4nAD8oAEApAEEqAEIAAAAAAAUHAD4nAD8oAEApAEEqAEICAwABCQAFAgMAAQkABQUHAEcnAEgoAEkpAEoqAEsAAAAAAAUHAEcnAEgoAEkpAEoqAEsCCwAJEAAOAgsACRAADgUHAFAnAFEoAFIpAFMqAFQAAAAAAAUHAFAnAFEoAFIpAFMqAFQBCwAJAQsACQMHAFkpAFoqAFsAAAADBwBZKQBaKgBbAgMAAQkABQIDAAEJAAUFBwBgJwBhKABiKQBjKgBkAAAAAAAFBwBgJwBhKABiKQBjKgBkAAADBwBpKQBqKgBrAAAAAwcAaSkAaioAawEIAAYBCAAGBQcAcCcAcSgAcikAcyoAdAAAAAAABQcAcCcAcSgAcikAcyoAdAEJAAUBCQAFAwcAeSkAeioAewAAAAMHAHkpAHoqAHsAAAUHAIABJwCBASgAggEpAIMBKgCEAQAAAAAABQcAgAEnAIEBKACCASkAgwEqAIQBAgMAAQkABQIDAAEJAAUDBwCJASkAigEqAIsBAAAAAwcAiQEpAIoBKgCLARUCARZAARdDARhEARlFARtHARxJFB1KFR5MAR9OFCBPFiNQASRRASVSFCtVFyxWHS1XAi5YAi9ZAjBaAjFbAjJdAjNfFDRgHjViAjZkFDdlHzhmAjlnAjpoFDtrIDxsJD1tAz5uAz9vA0BwA0FxA0JzA0N1FER2JUV4A0Z6FEd7Jkh8A0l9A0p-FEuBASdMggErTYQBLE6FASxPiAEsUIkBLFGKASxSjAEsU44BFFSPAS1VkQEsVpMBFFeUAS5YlQEsWZYBLFqXARRbmgEvXJsBM12cAQtenQELX54BC2CfAQthoAELYqIBC2OkARRkpQE0ZacBC2apARRnqgE1aKsBC2msAQtqrQEUa7ABNmyxATptswEKbrQBCm-2AQpwtwEKcbgBCnK6AQpzvAEUdL0BO3W_AQp2wQEUd8IBPHjDAQp5xAEKesUBFHvIAT18yQFDfcoBCX7LAQl_zAEJgAHNAQmBAc4BCYIB0AEJgwHSARSEAdMBRIUB1QEJhgHXARSHAdgBRYgB2QEJiQHaAQmKAdsBFIsB3gFGjAHfAUyNAeABDY4B4QENjwHiAQ2QAeMBDZEB5AENkgHmAQ2TAegBFJQB6QFNlQHrAQ2WAe0BFJcB7gFOmAHvAQ2ZAfABDZoB8QEUmwH0AU-cAfUBVZ0B9gEMngH3AQyfAfgBDKAB-QEMoQH6AQyiAfwBDKMB_gEUpAH_AValAYECDKYBgwIUpwGEAleoAYUCDKkBhgIMqgGHAhSrAYoCWKwBiwJcrQGMAgSuAY0CBK8BjgIEsAGPAgSxAZACBLIBkgIEswGUAhS0AZUCXbUBlwIEtgGZAhS3AZoCXrgBmwIEuQGcAgS6AZ0CFLsBoAJfvAGhAmW9AaMCBr4BpAIGvwGnAgbAAagCBsEBqQIGwgGrAgbDAa0CFMQBrgJmxQGwAgbGAbICFMcBswJnyAG0AgbJAbUCBsoBtgIUywG5AmjMAboCbM0BuwIFzgG8AgXPAb0CBdABvgIF0QG_AgXSAcECBdMBwwIU1AHEAm3VAcYCBdYByAIU1wHJAm7YAcoCBdkBywIF2gHMAhTbAc8Cb9wB0AJ13QHRAgjeAdICCN8B0wII4AHUAgjhAdUCCOIB1wII4wHZAhTkAdoCduUB3AII5gHeAhTnAd8Cd-gB4AII6QHhAgjqAeICFOsB5QJ47AHmAnztAegCDu4B6QIO7wHsAg7wAe0CDvEB7gIO8gHwAg7zAfICFPQB8wJ99QH1Ag72AfcCFPcB-AJ--AH5Ag75AfoCDvoB-wIU-wH-An_8Af8ChQH9AYADEf4BgQMR_wGCAxGAAoMDEYEChAMRggKGAxGDAogDFIQCiQOGAYUCiwMRhgKNAxSHAo4DhwGIAo8DEYkCkAMRigKRAxSLApQDiAGMApUDjAE"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CheckinScalarFieldEnum: () => CheckinScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReservationDocumentScalarFieldEnum: () => ReservationDocumentScalarFieldEnum,
  ReservationScalarFieldEnum: () => ReservationScalarFieldEnum,
  ReservationServiceScalarFieldEnum: () => ReservationServiceScalarFieldEnum,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  RoomImageScalarFieldEnum: () => RoomImageScalarFieldEnum,
  RoomScalarFieldEnum: () => RoomScalarFieldEnum,
  RoomTypeScalarFieldEnum: () => RoomTypeScalarFieldEnum,
  ServiceScalarFieldEnum: () => ServiceScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  WishlistScalarFieldEnum: () => WishlistScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.5.0",
  engine: "280c870be64f457428992c43c1f6d557fab6e29e"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Checkin: "Checkin",
  Payment: "Payment",
  Reservation: "Reservation",
  ReservationService: "ReservationService",
  ReservationDocument: "ReservationDocument",
  Review: "Review",
  RoomType: "RoomType",
  Room: "Room",
  RoomImage: "RoomImage",
  Service: "Service",
  Wishlist: "Wishlist"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  phone: "phone",
  role: "role",
  emailVerified: "emailVerified",
  tokenVersion: "tokenVersion",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CheckinScalarFieldEnum = {
  id: "id",
  reservationId: "reservationId",
  roomId: "roomId",
  checkinTime: "checkinTime",
  checkoutTime: "checkoutTime",
  status: "status",
  notes: "notes",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  reservationId: "reservationId",
  amount: "amount",
  currency: "currency",
  paymentMethod: "paymentMethod",
  status: "status",
  refundStatus: "refundStatus",
  refundAmount: "refundAmount",
  transactionId: "transactionId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReservationScalarFieldEnum = {
  id: "id",
  userId: "userId",
  roomId: "roomId",
  checkInDate: "checkInDate",
  checkOutDate: "checkOutDate",
  adults: "adults",
  children: "children",
  roomsBooked: "roomsBooked",
  extraBed: "extraBed",
  totalPrice: "totalPrice",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReservationServiceScalarFieldEnum = {
  id: "id",
  reservationId: "reservationId",
  serviceId: "serviceId",
  quantity: "quantity"
};
var ReservationDocumentScalarFieldEnum = {
  id: "id",
  reservationId: "reservationId",
  documentType: "documentType",
  documentUrl: "documentUrl",
  createdAt: "createdAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  userId: "userId",
  roomId: "roomId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var RoomTypeScalarFieldEnum = {
  id: "id",
  name: "name"
};
var RoomScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  capacity: "capacity",
  roomTypeId: "roomTypeId",
  isAvailable: "isAvailable",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  extraBedPrice: "extraBedPrice",
  maxExtraBed: "maxExtraBed"
};
var RoomImageScalarFieldEnum = {
  id: "id",
  roomId: "roomId",
  imageUrl: "imageUrl",
  createdAt: "createdAt"
};
var ServiceScalarFieldEnum = {
  id: "id",
  name: "name",
  price: "price",
  type: "type",
  isActive: "isActive"
};
var WishlistScalarFieldEnum = {
  id: "id",
  userId: "userId",
  roomId: "roomId",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var UserRole = {
  CUSTOMER: "CUSTOMER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN"
};
var ReservationStatus = {
  HOLD: "HOLD",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
  COMPLETED: "COMPLETED"
};
var PaymentStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED"
};
var CheckinStatus = {
  PENDING: "PENDING",
  CHECKED_IN: "CHECKED_IN",
  CHECKED_OUT: "CHECKED_OUT"
};
var PaymentMethod = {
  STRIPE: "STRIPE",
  SSLCOMMERZ: "SSLCOMMERZ"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = envVars.DATABASE_URL;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/lib/auth.ts
import { oAuthProxy } from "better-auth/plugins";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: UserRole.CUSTOMER
      },
      phone: {
        type: "string",
        required: false
      }
    }
  },
  baseURL: envVars.FRONTEND_URL,
  trustedOrigins: [envVars.FRONTEND_URL],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      prompt: "select_account"
    },
    github: {
      clientId: envVars.GITHUB_CLIENT_ID,
      clientSecret: envVars.GITHUB_CLIENT_SECRET
    }
  },
  session: {
    expiresIn: 60 * 60 * 60 * 24,
    // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24,
    // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24
      // 1 day in seconds
    }
  },
  advanced: {
    cookies: {
      session_token: {
        name: "session_token",
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      },
      state: {
        name: "session_token",
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      }
    }
  },
  plugins: [oAuthProxy()]
});

// src/app/modules/auth/auth.service.ts
var CreateCustomerService = async (payload) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password
    }
  });
  if (!data.user) {
    throw new Error("Failed to create customer");
  }
  const user = data.user;
  const accessToken = getAccessToken({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified
  });
  const refreshToken = getRefreshToken({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified
  });
  return {
    user,
    accessToken,
    refreshToken,
    token: data.token
  };
};
var LoginCustomerService = async (payload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  const accessToken = getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    emailVerified: data.user.emailVerified
  });
  return { ...data, accessToken, refreshToken };
};
var GetMeService = async (user) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUserExists) {
    throw new AppError_default(status2.UNAUTHORIZED, "Unauthorized user");
  }
  return isUserExists;
};
var GetNewTokenService = async (refreshToken, sessionToken) => {
  const isSessionTokenExists = prisma.session.findUnique({
    where: {
      id: sessionToken
    },
    include: {
      user: true
    }
  });
  if (!isSessionTokenExists) {
    throw new AppError_default(status2.UNAUTHORIZED, "Invalid session token");
  }
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET
  );
  if (!verifiedRefreshToken.success) {
    throw new AppError_default(status2.UNAUTHORIZED, "Invalid refresh token");
  }
  const data = verifiedRefreshToken;
  const newAccessToken = getAccessToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    emailVerified: data.emailVerified
  });
  const newRefreshToken = getRefreshToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    emailVerified: data.emailVerified
  });
  const { token } = await prisma.session.update({
    where: {
      token: sessionToken
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1e3),
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token
  };
};
var logoutUserService = async (sessionToken) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  return result;
};

// src/app/modules/auth/auth.controller.ts
import status3 from "http-status";
var CreateCustomerController = catchAsync(
  async (req, res) => {
    const result = await CreateCustomerService(req.body);
    const { accessToken, refreshToken, token, ...rest } = result;
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
      httpStatusCode: status3.CREATED,
      success: true,
      message: "Create user Successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    });
  }
);
var LoginCustomerController = catchAsync(
  async (req, res) => {
    const result = await LoginCustomerService(req.body);
    const { accessToken, refreshToken, token, ...rest } = result;
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
      httpStatusCode: status3.OK,
      success: true,
      message: "Create user Successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    });
  }
);
var GetMeController = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await GetMeService(user);
    sendResponse(res, {
      httpStatusCode: status3.OK,
      success: true,
      message: "Welcome your profile",
      data: result
    });
  }
);
var GetNewTokenController = catchAsync(
  async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
      throw new AppError_default(status3.UNAUTHORIZED, "Refresh token is missing");
    }
    const result = await GetNewTokenService(
      refreshToken,
      betterAuthSessionToken
    );
    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
    setAccessTokenCookie(res, accessToken);
    setAccessTokenCookie(res, newRefreshToken);
    setBetterAuthSessionCookie(res, sessionToken);
    sendResponse(res, {
      httpStatusCode: status3.OK,
      success: true,
      message: "New tokens generated successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        sessionToken
      }
    });
  }
);
var logoutUserController = catchAsync(
  async (req, res) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await logoutUserService(betterAuthSessionToken);
    clearCookie(res, "accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    clearCookie(res, "refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    clearCookie(res, "better-auth.session_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    sendResponse(res, {
      httpStatusCode: status3.OK,
      success: true,
      message: "User logged out successfully",
      data: result
    });
  }
);

// src/app/middleware/checkAuth.ts
import status4 from "http-status";
var checkAuth = (...authRoles) => async (req, res, next) => {
  try {
    const sessionToken = getCookie(req, "better-auth.session_token");
    if (!sessionToken) {
      throw new Error("Unauthorized access! No session token provided.");
    }
    if (sessionToken) {
      const sessionExists = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: /* @__PURE__ */ new Date()
          }
        },
        include: {
          user: true
        }
      });
      if (sessionExists && sessionExists.user) {
        const user = sessionExists.user;
        const now = /* @__PURE__ */ new Date();
        const expiresAt = new Date(sessionExists.expiresAt);
        const createdAt = new Date(sessionExists.createdAt);
        const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
        const timeRemaining = expiresAt.getTime() - now.getTime();
        const percentRemaining = timeRemaining / sessionLifeTime * 100;
        if (percentRemaining < 20) {
          res.setHeader("X-Session-Refresh", "true");
          res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
          res.setHeader("X-Time-Remaining", timeRemaining.toString());
          console.log("Session Expiring Soon!!");
        }
        if (authRoles.length > 0 && !authRoles.includes(user.role)) {
          throw new AppError_default(
            status4.FORBIDDEN,
            "Forbidden access! You do not have permission to access this resource."
          );
        }
        req.user = {
          userId: user.id,
          role: user.role,
          email: user.email
        };
      }
      const accessToken2 = getCookie(req, "accessToken");
      if (!accessToken2) {
        throw new AppError_default(
          status4.UNAUTHORIZED,
          "Unauthorized access! No access token provided."
        );
      }
    }
    const accessToken = getCookie(req, "accessToken");
    if (!accessToken) {
      throw new AppError_default(
        status4.UNAUTHORIZED,
        "Unauthorized access! No access token provided."
      );
    }
    const verifiedToken = verifyToken(
      accessToken,
      envVars.ACCESS_TOKEN_SECRET
    );
    if (!verifiedToken.success) {
      throw new AppError_default(
        status4.UNAUTHORIZED,
        "Unauthorized access! Invalid access token."
      );
    }
    if (authRoles.length > 0 && !authRoles.includes(verifiedToken.decoded.role)) {
      throw new AppError_default(
        status4.FORBIDDEN,
        "Forbidden access! You do not have permission to access this resource."
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

// src/app/modules/auth/auth.routes.ts
var router = Router();
router.post("/register", CreateCustomerController);
router.post("/login", LoginCustomerController);
router.get(
  "/me",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  GetMeController
);
router.post("/refresh-token", GetNewTokenController);
router.post(
  "/logout",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  logoutUserController
);
var authRoutes = router;

// src/app/modules/extraService/extraService.routes.ts
import { Router as Router2 } from "express";

// src/app/modules/extraService/extraService.controller.ts
import status6 from "http-status";

// src/app/modules/extraService/extraService.service.ts
import status5 from "http-status";
var createService = async (payload) => {
  const { name, price, type, isActive } = payload;
  const result = await prisma.service.create({
    data: {
      name,
      price: new prismaNamespace_exports.Decimal(price),
      type,
      isActive: isActive ?? true
    }
  });
  return result;
};
var getAllServices = async () => {
  const result = await prisma.service.findMany({
    where: {
      isActive: true
    }
  });
  return result;
};
var updateService = async (id, payload) => {
  const isExist = await prisma.service.findUnique({
    where: {
      id
    }
  });
  if (!isExist) {
    throw new AppError_default(status5.NOT_FOUND, "Service not found");
  }
  const { name, price, type, isActive } = payload;
  const result = await prisma.service.update({
    where: {
      id
    },
    data: {
      name,
      type,
      isActive,
      ...price !== void 0 && {
        price: new prismaNamespace_exports.Decimal(price)
      }
    }
  });
  return result;
};
var deleteService = async (id) => {
  const isExist = await prisma.service.findUnique({
    where: {
      id
    }
  });
  if (!isExist) {
    throw new AppError_default(status5.NOT_FOUND, "Service not found");
  }
  const result = await prisma.service.delete({
    where: {
      id
    }
  });
  return result;
};

// src/app/modules/extraService/extraService.controller.ts
var createController = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await createService(payload);
    sendResponse(res, {
      httpStatusCode: status6.CREATED,
      success: true,
      message: "Create extra service successfully",
      data: result
    });
  }
);
var getAllController = catchAsync(
  async (req, res) => {
    const result = await getAllServices();
    sendResponse(res, {
      httpStatusCode: status6.CREATED,
      success: true,
      message: "Fetch extra service successfully",
      data: result
    });
  }
);
var updateController = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await updateService(req.params.id, payload);
    sendResponse(res, {
      httpStatusCode: status6.OK,
      success: true,
      message: "Updated extra service successfully",
      data: result
    });
  }
);
var deleteController = catchAsync(
  async (req, res) => {
    await deleteService(req.params.id);
    sendResponse(res, {
      httpStatusCode: status6.OK,
      success: true,
      message: "Deleted extra service successfully"
    });
  }
);

// src/app/modules/extraService/extraService.routes.ts
var router2 = Router2();
router2.post("/", checkAuth(UserRole.ADMIN, UserRole.MANAGER), createController);
router2.get("/", getAllController);
router2.put(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  updateController
);
router2.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  deleteController
);
var serviceRoutes = router2;

// src/app/modules/room/room.routes.ts
import { Router as Router3 } from "express";

// src/app/modules/room/room.service.ts
import status7 from "http-status";
var createRoom = async (payload) => {
  const {
    name,
    description,
    price,
    capacity,
    roomTypeId,
    isAvailable,
    images,
    extraBedPrice,
    maxExtraBed
  } = payload;
  const isRoomTypeExist = await prisma.roomType.findUnique({
    where: {
      id: roomTypeId
    }
  });
  if (!isRoomTypeExist) {
    throw new AppError_default(status7.NOT_FOUND, "Room type not found");
  }
  const result = await prisma.$transaction(async (tx) => {
    const room = await tx.room.create({
      data: {
        name,
        description,
        price,
        capacity,
        roomTypeId,
        isAvailable: isAvailable ?? true,
        extraBedPrice,
        maxExtraBed: maxExtraBed ?? 0
      }
    });
    if (images && images.length > 0) {
      await tx.roomImage.create({
        data: {
          roomId: room.id,
          imageUrl: images
        }
      });
    }
    return room;
  });
  return result;
};
var getsRoom = async ({
  search,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const addConnection = [];
  if (search) {
    addConnection.push({
      name: {
        contains: search,
        mode: "insensitive"
      }
    });
  }
  const result = await prisma.room.findMany({
    where: {
      AND: addConnection
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      roomType: true,
      images: true,
      reservations: true,
      checkins: true,
      reviews: true,
      wishlists: true
    }
  });
  const total = await prisma.room.count({
    where: {
      AND: addConnection
    }
  });
  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getSimilarRooms = async (roomId) => {
  const currentRoom = await prisma.room.findUnique({
    where: {
      id: roomId
    }
  });
  if (!currentRoom) {
    throw new AppError_default(404, "Room not found");
  }
  const similarRooms = await prisma.room.findMany({
    where: {
      id: {
        not: roomId
      },
      roomTypeId: currentRoom.roomTypeId
    },
    take: 3,
    include: {
      images: true,
      roomType: true
    }
  });
  return similarRooms;
};
var getRoom = async (id) => {
  const result = await prisma.room.findUnique({
    where: {
      id
    },
    include: {
      roomType: true,
      images: true,
      reservations: true,
      checkins: true,
      reviews: true,
      wishlists: true
    }
  });
  if (!result) {
    throw new AppError_default(status7.NOT_FOUND, "Room not found");
  }
  return result;
};
var updateRoom = async (roomId, payload) => {
  const {
    name,
    description,
    price,
    capacity,
    roomTypeId,
    isAvailable,
    images,
    extraBedPrice,
    maxExtraBed
  } = payload;
  const existingRoom = await prisma.room.findUnique({
    where: {
      id: roomId
    }
  });
  if (!existingRoom) {
    throw new AppError_default(status7.NOT_FOUND, "Room not found");
  }
  if (roomTypeId) {
    const roomTypeExist = await prisma.roomType.findUnique({
      where: {
        id: roomTypeId
      }
    });
    if (!roomTypeExist) {
      throw new AppError_default(status7.NOT_FOUND, "Room type not found");
    }
  }
  const result = await prisma.$transaction(async (tx) => {
    const updatedRoom = await tx.room.update({
      where: { id: roomId },
      data: {
        name,
        description,
        price,
        capacity,
        roomTypeId,
        isAvailable,
        extraBedPrice,
        maxExtraBed
      }
    });
    if (images) {
      await tx.roomImage.deleteMany({
        where: { roomId }
      });
      if (images.length > 0) {
        await tx.roomImage.create({
          data: {
            roomId,
            imageUrl: images
          }
        });
      }
    }
    return updatedRoom;
  });
  return result;
};
var deleteRoom = async (id) => {
  const existsRoom = await prisma.room.findUniqueOrThrow({
    where: {
      id
    }
  });
  const result = await prisma.room.delete({
    where: {
      id: existsRoom?.id
    }
  });
  return result;
};
var RoomService = {
  createRoom,
  getsRoom,
  getSimilarRooms,
  getRoom,
  updateRoom,
  deleteRoom
};

// src/app/modules/room/room.controller.ts
import status8 from "http-status";

// src/app/utils/paginationSorting.ts
var paginationSorting = (option) => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 12);
  const skip = (page - 1) * limit;
  const sortBy = option.sortBy || "createdAt";
  const sortOrder = option.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};

// src/app/modules/room/room.controller.ts
var createRoom2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await RoomService.createRoom(payload);
  sendResponse(res, {
    httpStatusCode: status8.CREATED,
    success: true,
    message: "Create Room successfully",
    data: result
  });
});
var getsRoom2 = catchAsync(async (req, res) => {
  const { search } = req.query;
  const searchString = typeof search === "string" ? search : void 0;
  const { page, limit, skip, sortBy, sortOrder } = paginationSorting(req.query);
  const result = await RoomService.getsRoom({
    search: searchString,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  });
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Fetch Room successfully",
    data: result.data,
    meta: result.pagination
  });
});
var getSimilarRooms2 = catchAsync(async (req, res) => {
  const result = await RoomService.getSimilarRooms(req.params.id);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Fetch Room successfully",
    data: result
  });
});
var getRoom2 = catchAsync(async (req, res) => {
  const result = await RoomService.getRoom(req.params.id);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Fetch Room successfully",
    data: result
  });
});
var updateRoom2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await RoomService.updateRoom(req.params.id, payload);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Updated Room successfully",
    data: result
  });
});
var deleteRoom2 = catchAsync(async (req, res) => {
  await RoomService.deleteRoom(req.params.id);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Delete Room successfully"
  });
});
var RoomController = {
  createRoom: createRoom2,
  getSimilarRooms: getSimilarRooms2,
  getsRoom: getsRoom2,
  getRoom: getRoom2,
  updateRoom: updateRoom2,
  deleteRoom: deleteRoom2
};

// src/app/modules/room/room.routes.ts
var router3 = Router3();
router3.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomController.createRoom
);
router3.get("/", RoomController.getsRoom);
router3.get("/similar/:id", RoomController.getSimilarRooms);
router3.get("/:id", RoomController.getRoom);
router3.put(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomController.updateRoom
);
router3.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomController.deleteRoom
);
var roomRoutes = router3;

// src/app/modules/roomType/roomType.routes.ts
import { Router as Router4 } from "express";

// src/app/modules/roomType/roomType.controller.ts
import status10 from "http-status";

// src/app/modules/roomType/roomType.service.ts
import status9 from "http-status";
var createRoomType = async (payload) => {
  const { name } = payload;
  const exist = await prisma.roomType.findUnique({
    where: {
      name
    }
  });
  if (exist) {
    throw new AppError_default(status9.CONFLICT, "Room type already exists");
  }
  const result = await prisma.roomType.create({
    data: {
      name
    }
  });
  return result;
};
var getsRoomTypes = async () => {
  const result = await prisma.roomType.findMany({
    include: {
      rooms: false
    }
  });
  return result;
};
var getRoomType = async (id) => {
  const result = await prisma.roomType.findUnique({
    where: {
      id
    }
  });
  if (!result) {
    throw new AppError_default(status9.NOT_FOUND, "Room type not found");
  }
  return result;
};
var updateRoomType = async (id, payload) => {
  const { name } = payload;
  const exist = await prisma.roomType.findUnique({ where: { id } });
  if (!exist) {
    throw new AppError_default(status9.NOT_FOUND, "Room type not found");
  }
  const duplicate = await prisma.roomType.findUnique({
    where: {
      name
    }
  });
  if (duplicate && duplicate.id !== id) {
    throw new AppError_default(status9.CONFLICT, "Room type name already exists");
  }
  const result = await prisma.roomType.update({
    where: {
      id
    },
    data: {
      name
    }
  });
  return result;
};
var deleteRoomType = async (id) => {
  const exist = await prisma.roomType.findUnique({
    where: {
      id
    }
  });
  if (!exist) {
    throw new AppError_default(status9.NOT_FOUND, "Room type not found");
  }
  const result = await prisma.roomType.delete({
    where: {
      id
    }
  });
  return result;
};
var RoomTypeService = {
  createRoomType,
  getsRoomTypes,
  getRoomType,
  updateRoomType,
  deleteRoomType
};

// src/app/modules/roomType/roomType.controller.ts
var createRoomType2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await RoomTypeService.createRoomType(payload);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Crate RoomType successfully",
    data: result
  });
});
var getsRoomTypes2 = catchAsync(async (req, res) => {
  const result = await RoomTypeService.getsRoomTypes();
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Fetch RoomType successfully",
    data: result
  });
});
var getRoomType2 = catchAsync(async (req, res) => {
  const result = await RoomTypeService.getRoomType(req.params.id);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Fetch RoomType successfully",
    data: result
  });
});
var updateRoomType2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await RoomTypeService.updateRoomType(
    req.params.id,
    payload
  );
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Update RoomType successfully",
    data: result
  });
});
var deleteRoomType2 = catchAsync(async (req, res) => {
  await RoomTypeService.deleteRoomType(req.params.id);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Delete RoomType successfully"
  });
});
var RoomTypeController = {
  createRoomType: createRoomType2,
  getsRoomTypes: getsRoomTypes2,
  getRoomType: getRoomType2,
  updateRoomType: updateRoomType2,
  deleteRoomType: deleteRoomType2
};

// src/app/modules/roomType/roomType.routes.ts
var router4 = Router4();
router4.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomTypeController.createRoomType
);
router4.get("/", RoomTypeController.getsRoomTypes);
router4.get("/:id", RoomTypeController.getRoomType);
router4.patch(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomTypeController.updateRoomType
);
router4.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomTypeController.deleteRoomType
);
var roomTypeRoutes = router4;

// src/app/modules/reservation/reservation.routes.ts
import { Router as Router5 } from "express";

// src/app/modules/reservation/reservation.controller.ts
import status12 from "http-status";

// src/app/modules/reservation/reservation.service.ts
import status11 from "http-status";
var CreateReservation = async (user, payload) => {
  const {
    roomId,
    checkInDate,
    checkOutDate,
    adults = 1,
    children = 0,
    roomsBooked = 1,
    extraBed = 0,
    services = []
  } = payload;
  const userExit = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!userExit) {
    throw new AppError_default(status11.BAD_REQUEST, "Request failed wrang user");
  }
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  if (checkIn >= checkOut) {
    throw new AppError_default(status11.BAD_REQUEST, "Invalid date range");
  }
  const nights = (checkOut.getTime() - checkIn.getTime()) / (1e3 * 60 * 60 * 24);
  const room = await prisma.room.findUnique({
    where: {
      id: roomId
    }
  });
  if (!room) {
    throw new AppError_default(status11.NOT_FOUND, "Room not found");
  }
  let totalPrice = Number(room.price) * nights * roomsBooked;
  if (extraBed > 0) {
    totalPrice += Number(room.extraBedPrice || 0) * extraBed * nights;
  }
  const serviceData = [];
  if (services.length > 0) {
    for (const item of services) {
      const service = await prisma.service.findUnique({
        where: { id: item.serviceId }
      });
      if (!service) {
        throw new AppError_default(
          status11.NOT_FOUND,
          `Service not found: ${item.serviceId}`
        );
      }
      const quantity = item.quantity ?? 1;
      let serviceCost = 0;
      if (service.type === "PER_NIGHT") {
        serviceCost = Number(service.price) * quantity * nights;
      } else {
        serviceCost = Number(service.price) * quantity * adults;
      }
      totalPrice += serviceCost;
      serviceData.push({
        serviceId: item.serviceId,
        quantity
      });
    }
  }
  const result = await prisma.$transaction(async (tx) => {
    const newReservation = await tx.reservation.create({
      data: {
        userId: user.userId,
        roomId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults,
        children,
        roomsBooked,
        extraBed,
        totalPrice: new prismaNamespace_exports.Decimal(totalPrice)
      }
    });
    if (serviceData.length > 0) {
      await tx.reservationService.createMany({
        data: serviceData.map((s) => ({
          reservationId: newReservation.id,
          serviceId: s.serviceId,
          quantity: s.quantity
        }))
      });
    }
    return newReservation;
  });
  return result;
};
var gestMyReservation = async (user) => {
  const userExit = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!userExit) {
    throw new AppError_default(status11.BAD_REQUEST, "Request failed: wrong user");
  }
  let reservations;
  if (user.role === UserRole.ADMIN || user.role === UserRole.MANAGER) {
    reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        room: {
          include: {
            images: true
          }
        },
        payment: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } else {
    reservations = await prisma.reservation.findMany({
      where: {
        userId: user.userId
      },
      include: {
        room: {
          include: {
            images: true
          }
        },
        payment: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }
  return reservations;
};
var getReservationById = async (reservationId) => {
  const reservation = await prisma.reservation.findUniqueOrThrow({
    where: {
      id: reservationId
    },
    include: {
      room: {
        include: {
          images: true
        }
      },
      payment: true,
      user: true
    }
  });
  return reservation;
};
var updateReservationStatus = async (payload, reservationId) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId
    }
  });
  if (!reservation)
    throw new AppError_default(status11.NOT_FOUND, "Reservation not found");
  if (reservation.status === ReservationStatus.COMPLETED) {
    throw new AppError_default(
      status11.BAD_REQUEST,
      "Completed reservation cannot be updated"
    );
  }
  return prisma.reservation.update({
    where: {
      id: reservationId
    },
    data: {
      status: payload.status
    }
  });
};
var cancelMyReservation = async (user, reservationId) => {
  const existUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId
    }
  });
  if (!reservation)
    throw new AppError_default(status11.NOT_FOUND, "Reservation not found");
  if (reservation.userId !== existUser?.id) {
    throw new AppError_default(status11.FORBIDDEN, "Cannot cancel others reservation");
  }
  if (ReservationStatus.CANCELLED === reservation.status) {
    throw new AppError_default(status11.BAD_REQUEST, "Reservations already cancelled");
  }
  if (ReservationStatus.COMPLETED === reservation.status) {
    throw new AppError_default(
      status11.BAD_REQUEST,
      "Only HOLD or CONFIRMED reservations can be cancelled"
    );
  }
  return prisma.reservation.update({
    where: {
      id: reservationId
    },
    data: {
      status: ReservationStatus.CANCELLED
    }
  });
};
var ReservationService = {
  CreateReservation,
  gestMyReservation,
  getReservationById,
  updateReservationStatus,
  cancelMyReservation
};

// src/app/modules/reservation/reservation.controller.ts
var CreateReservation2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const result = await ReservationService.CreateReservation(user, payload);
  sendResponse(res, {
    httpStatusCode: status12.CREATED,
    success: true,
    message: "Create Reservation successfully",
    data: result
  });
});
var gestMyReservation2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ReservationService.gestMyReservation(user);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Fetch Reservation successfully",
    data: result
  });
});
var getReservationById2 = catchAsync(async (req, res) => {
  const result = await ReservationService.getReservationById(
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Fetch Reservation successfully",
    data: result
  });
});
var updateReservationStatus2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await ReservationService.updateReservationStatus(
      payload,
      req.params.id
    );
    sendResponse(res, {
      httpStatusCode: status12.OK,
      success: true,
      message: "Updated Reservation successfully",
      data: result
    });
  }
);
var cancelMyReservation2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ReservationService.cancelMyReservation(
    user,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Cancelled Reservation successfully",
    data: result
  });
});
var ReservationController = {
  CreateReservation: CreateReservation2,
  gestMyReservation: gestMyReservation2,
  getReservationById: getReservationById2,
  updateReservationStatus: updateReservationStatus2,
  cancelMyReservation: cancelMyReservation2
};

// src/app/modules/reservation/reservation.routes.ts
var router5 = Router5();
router5.post(
  "/",
  checkAuth(UserRole.CUSTOMER),
  ReservationController.CreateReservation
);
router5.get(
  "/",
  checkAuth(UserRole.MANAGER, UserRole.ADMIN, UserRole.CUSTOMER),
  ReservationController.gestMyReservation
);
router5.get(
  "/:id",
  checkAuth(UserRole.MANAGER, UserRole.ADMIN, UserRole.CUSTOMER),
  ReservationController.getReservationById
);
router5.patch(
  "/:id",
  checkAuth(UserRole.MANAGER, UserRole.ADMIN),
  ReservationController.updateReservationStatus
);
router5.patch(
  "/cancel/:id",
  checkAuth(UserRole.CUSTOMER),
  ReservationController.cancelMyReservation
);
var ReservationRoutes = router5;

// src/app/modules/payment/payment.routes.ts
import { Router as Router6 } from "express";

// src/app/modules/payment/payment.service.ts
import status13 from "http-status";
import axios from "axios";
import qs from "qs";
var createPayment = async (payload) => {
  const { reservationId, amount } = payload;
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { user: true }
  });
  if (!reservation) {
    throw new Error("Reservation not found");
  }
  const tran_id = reservationId;
  const post_data = {
    store_id: envVars.SSL_STORE_ID,
    store_passwd: envVars.SSL_STORE_PASS,
    total_amount: amount,
    currency: "BDT",
    tran_id,
    success_url: `${envVars.BACKEND_URL}/api/v1/payment/success`,
    fail_url: `${envVars.BACKEND_URL}/api/v1/payment/fail`,
    cancel_url: `${envVars.BACKEND_URL}/api/v1/payment/cancel`,
    cus_name: reservation.user?.name || "Guest",
    cus_email: reservation.user.email,
    cus_add1: "Dhaka",
    cus_phone: "01700000000",
    product_name: `Reservation-${reservationId}`
  };
  const sslUrl = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
  const response = await axios.post(sslUrl, qs.stringify(post_data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return {
    redirectUrl: response.data.GatewayPageURL
  };
};
var handlePaymentSuccess = async (req, res) => {
  try {
    const { tran_id } = req.body;
    console.log("SSL SUCCESS BODY:", req.body);
    if (!tran_id) {
      throw new Error("Transaction ID missing");
    }
    const reservationId = tran_id;
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId }
    });
    if (!reservation) {
      throw new AppError_default(status13.NOT_FOUND, "Reservation not found");
    }
    await prisma.payment.upsert({
      where: {
        reservationId
      },
      update: {
        amount: reservation.totalPrice,
        status: PaymentStatus.SUCCESS,
        transactionId: tran_id,
        paymentMethod: PaymentMethod.SSLCOMMERZ
      },
      create: {
        reservationId,
        amount: reservation.totalPrice,
        currency: "BDT",
        status: PaymentStatus.SUCCESS,
        transactionId: tran_id,
        paymentMethod: PaymentMethod.SSLCOMMERZ
      }
    });
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: "CONFIRMED"
      }
    });
    return res.redirect(
      `${envVars.FRONTEND_URL}/payment/payment-success/${reservationId}`
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};
var getsPaymentHistoryService = async () => {
  const payments = await prisma.payment.findMany({
    include: {
      reservation: {
        include: {
          room: true,
          user: true
        }
      }
    }
  });
  return payments;
};
var getPaymentHistoryService = async (id) => {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      reservation: {
        include: {
          room: true,
          user: true
        }
      }
    }
  });
  return payment;
};

// src/app/modules/payment/payment.controller.ts
import status14 from "http-status";
var PaymentController = {
  createPayment: async (req, res) => {
    const { reservationId, amount } = req.body;
    try {
      const result = await createPayment({ reservationId, amount });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ status: "fail", message: err.message });
    }
  },
  paymentSuccess: async (req, res) => {
    try {
      const result = await handlePaymentSuccess(req, res);
      return result;
    } catch (err) {
      return res.status(500).json({
        status: "fail",
        message: err.message
      });
    }
  },
  paymentFail: async (req, res) => {
    return res.status(400).json({ status: "fail", message: "Payment failed or canceled" });
  }
};
var getsPaymentHistoryController = catchAsync(
  async (req, res) => {
    const payment = await getsPaymentHistoryService();
    sendResponse(res, {
      httpStatusCode: status14.OK,
      message: "Payment history retrieved successfully",
      success: true,
      data: payment
    });
  }
);
var getPaymentHistoryController = catchAsync(
  async (req, res) => {
    const payment = await getPaymentHistoryService(req.params.id);
    sendResponse(res, {
      httpStatusCode: status14.OK,
      message: "Payment history retrieved successfully",
      success: true,
      data: payment
    });
  }
);

// src/app/modules/payment/payment.routes.ts
var router6 = Router6();
router6.post("/create", PaymentController.createPayment);
router6.post("/success", PaymentController.paymentSuccess);
router6.post("/fail", PaymentController.paymentFail);
router6.get("/history", checkAuth(UserRole.ADMIN), getsPaymentHistoryController);
router6.get(
  "/history/:id",
  checkAuth(UserRole.ADMIN),
  getPaymentHistoryController
);
var PaymentRoutes = router6;

// src/app/modules/chekin/checkin.routes.ts
import { Router as Router7 } from "express";

// src/app/modules/chekin/checkin.controller.ts
import status16 from "http-status";

// src/app/modules/chekin/checkin.service.ts
import status15 from "http-status";
var createCheckin = async (payload) => {
  const { reservationId, notes } = payload;
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId
    }
  });
  if (!reservation) {
    throw new AppError_default(status15.NOT_FOUND, "Reservation not found");
  }
  if (reservation.status !== ReservationStatus.CONFIRMED) {
    throw new AppError_default(
      status15.BAD_REQUEST,
      "Reservation is not confirmed. Customer must complete payment first."
    );
  }
  const existingCheckin = await prisma.checkin.findUnique({
    where: {
      reservationId: reservation.id
    }
  });
  if (existingCheckin) {
    throw new AppError_default(
      status15.BAD_REQUEST,
      "Check-in already exists for this reservation."
    );
  }
  const result = await prisma.checkin.create({
    data: {
      reservationId: reservation.id,
      roomId: reservation.roomId,
      checkinTime: /* @__PURE__ */ new Date(),
      checkoutTime: new Date(reservation.checkOutDate),
      status: CheckinStatus.PENDING,
      notes
    },
    include: {
      reservation: true,
      room: true
    }
  });
  return result;
};
var getsCheckin = async () => {
  const result = await prisma.checkin.findMany({
    include: {
      reservation: true,
      room: {
        include: { images: true }
      }
    },
    orderBy: { checkinTime: "desc" }
  });
  return result;
};
var updateCheckinStatus = async (checkinId, payload) => {
  const checkin = await prisma.checkin.findUnique({
    where: { id: checkinId }
  });
  if (!checkin) {
    throw new AppError_default(status15.NOT_FOUND, "Check-in record not found");
  }
  const allowedTransitions = {
    PENDING: ["CHECKED_IN"],
    CHECKED_IN: ["CHECKED_OUT"],
    CHECKED_OUT: []
    // terminal state
  };
  const allowed = allowedTransitions[checkin.status] ?? [];
  if (!allowed.includes(payload.status)) {
    throw new AppError_default(
      status15.BAD_REQUEST,
      `Cannot transition from ${checkin.status} to ${payload.status}. Allowed next: ${allowed.join(", ") || "none (terminal state)"}`
    );
  }
  const updateData = {
    status: payload.status
  };
  if (payload.status === "CHECKED_OUT") {
    updateData.checkoutTime = /* @__PURE__ */ new Date();
  }
  const result = await prisma.checkin.update({
    where: { id: checkinId },
    data: updateData,
    include: {
      reservation: true,
      room: true
    }
  });
  return result;
};
var CheckinService = {
  createCheckin,
  getsCheckin,
  updateCheckinStatus
};

// src/app/modules/chekin/checkin.controller.ts
var createCheckin2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await CheckinService.createCheckin(payload);
  sendResponse(res, {
    httpStatusCode: status16.CREATED,
    success: true,
    message: "Check-in created successfully",
    data: result
  });
});
var getsCheckin2 = catchAsync(async (req, res) => {
  const result = await CheckinService.getsCheckin();
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Check-ins fetched successfully",
    data: result
  });
});
var updateCheckinStatus2 = catchAsync(async (req, res) => {
  const { checkinId } = req.params;
  const payload = req.body;
  const result = await CheckinService.updateCheckinStatus(
    checkinId,
    payload
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: `Status updated to ${result.status}`,
    data: result
  });
});
var CheckinController = {
  createCheckin: createCheckin2,
  getsCheckin: getsCheckin2,
  updateCheckinStatus: updateCheckinStatus2
};

// src/app/modules/chekin/checkin.routes.ts
var router7 = Router7();
router7.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.createCheckin
);
router7.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.getsCheckin
);
router7.patch(
  "/:checkinId/status",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.updateCheckinStatus
);
var CheckinRoutes = router7;

// src/app/modules/wishlist/wishlist.routes.ts
import { Router as Router8 } from "express";

// src/app/modules/wishlist/wishlist.controller.ts
import status18 from "http-status";

// src/app/modules/wishlist/wishlist.service.ts
import status17 from "http-status";
var createWishlistService = async (payload, user) => {
  const { roomId } = payload;
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!existsUser) {
    throw new AppError_default(status17.NOT_FOUND, "User not found");
  }
  const isExist = await prisma.wishlist.findUnique({
    where: {
      userId_roomId: {
        userId: existsUser.id,
        roomId
      }
    }
  });
  if (isExist) {
    throw new AppError_default(status17.BAD_REQUEST, "Already added to wishlist");
  }
  const result = await prisma.wishlist.create({
    data: {
      userId: existsUser.id,
      roomId
    }
  });
  return result;
};
var getMyWishlistService = async (user) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!existsUser) {
    throw new AppError_default(status17.NOT_FOUND, "User not found");
  }
  const result = await prisma.wishlist.findMany({
    where: {
      userId: existsUser.id
    },
    include: {
      room: {
        include: {
          images: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var clearWishlistService = async (user) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!existsUser) {
    throw new AppError_default(status17.NOT_FOUND, "User not found");
  }
  const result = await prisma.wishlist.deleteMany({
    where: {
      userId: existsUser.id
    }
  });
  return result;
};
var deleteWishlistService = async (user, id) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!existsUser) {
    throw new AppError_default(status17.NOT_FOUND, "User not found");
  }
  const isExist = await prisma.wishlist.findUnique({
    where: {
      id
    }
  });
  if (!isExist) {
    throw new AppError_default(status17.NOT_FOUND, "Wishlist item not found");
  }
  const result = await prisma.wishlist.delete({
    where: {
      id
    }
  });
  return result;
};

// src/app/modules/wishlist/wishlist.controller.ts
var createWishlistController = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const user = req.user;
    const result = await createWishlistService(payload, user);
    sendResponse(res, {
      httpStatusCode: status18.CREATED,
      success: true,
      message: "Create wishlist successfully",
      data: result
    });
  }
);
var getMyWishlistController = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await getMyWishlistService(user);
    sendResponse(res, {
      httpStatusCode: status18.OK,
      success: true,
      message: "Fetch wishlist successfully",
      data: result
    });
  }
);
var clearWishlistController = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await clearWishlistService(user);
    sendResponse(res, {
      httpStatusCode: status18.OK,
      success: true,
      message: "Clear wishlist successfully",
      data: result
    });
  }
);
var deleteWishlistController = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await deleteWishlistService(user, req.params.id);
    sendResponse(res, {
      httpStatusCode: status18.OK,
      success: true,
      message: "Delete wishlist successfully",
      data: result
    });
  }
);

// src/app/modules/wishlist/wishlist.routes.ts
var router8 = Router8();
router8.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  createWishlistController
);
router8.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  getMyWishlistController
);
router8.delete(
  "/clear",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  clearWishlistController
);
router8.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  deleteWishlistController
);
var WishlistRoutes = router8;

// src/app/modules/review/review.routes.ts
import { Router as Router9 } from "express";

// src/app/modules/review/review.controller.ts
import status20 from "http-status";

// src/app/modules/review/review.service.ts
import status19 from "http-status";
var createReviewService = async (payload, user) => {
  const { roomId, rating, comment } = payload;
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!existsUser) {
    throw new AppError_default(status19.NOT_FOUND, "User not found");
  }
  const isExist = await prisma.review.findUnique({
    where: {
      userId_roomId: {
        userId: existsUser.id,
        roomId
      }
    }
  });
  if (isExist) {
    throw new AppError_default(status19.BAD_REQUEST, "You already reviewed this room");
  }
  if (rating < 1 || rating > 5) {
    throw new AppError_default(status19.BAD_REQUEST, "Rating must be between 1-5");
  }
  const result = await prisma.review.create({
    data: {
      userId: existsUser.id,
      roomId,
      rating,
      comment
    }
  });
  return result;
};
var getsRoomReviewsService = async () => {
  const result = await prisma.review.findMany({
    include: {
      room: {
        include: {
          images: true
        }
      }
    }
  });
  return result;
};
var getsMyRoomReviewsService = async (user) => {
  const result = await prisma.review.findMany({
    where: {
      userId: user.email
    },
    include: {
      room: {
        include: {
          images: true
        }
      }
    }
  });
  return result;
};
var getRoomReviewsService = async (roomId) => {
  const result = await prisma.review.findMany({
    where: {
      roomId
    },
    include: {
      room: {
        include: {
          images: true
        }
      }
    }
  });
  return result;
};
var getRoomAverageRatingService = async (roomId) => {
  const result = await prisma.review.aggregate({
    where: {
      roomId
    },
    _avg: {
      rating: true
    },
    _count: {
      rating: true
    }
  });
  return {
    averageRating: result._avg.rating || 0,
    totalReviews: result._count.rating
  };
};
var updateReviewService = async (reviewId, payload, user) => {
  const { rating, comment } = payload;
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!existsUser) {
    throw new AppError_default(status19.NOT_FOUND, "User not found");
  }
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId
    }
  });
  if (!review) {
    throw new AppError_default(status19.NOT_FOUND, "Review not found");
  }
  if (review.userId !== existsUser.id) {
    throw new AppError_default(status19.FORBIDDEN, "You cannot update this review");
  }
  if (rating && (rating < 1 || rating > 5)) {
    throw new AppError_default(status19.BAD_REQUEST, "Rating must be between 1-5");
  }
  const result = await prisma.review.update({
    where: {
      id: reviewId
    },
    data: {
      ...rating && { rating },
      ...comment && { comment }
    }
  });
  return result;
};
var deleteReviewService = async (reviewId, user) => {
  const existsUser = await prisma.user.findUnique({
    where: { email: user.email }
  });
  if (!existsUser) {
    throw new AppError_default(status19.NOT_FOUND, "User not found");
  }
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId
    }
  });
  if (!review) {
    throw new AppError_default(status19.NOT_FOUND, "Review not found");
  }
  if (review.userId !== existsUser.id && user.role !== "ADMIN") {
    throw new AppError_default(status19.FORBIDDEN, "You cannot delete this review");
  }
  await prisma.review.delete({
    where: {
      id: reviewId
    }
  });
  return null;
};

// src/app/modules/review/review.controller.ts
var createWishlistController2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const user = req.user;
    const result = await createReviewService(payload, user);
    sendResponse(res, {
      httpStatusCode: status20.CREATED,
      success: true,
      message: "Create Review successfully",
      data: result
    });
  }
);
var getsRoomReviewsController = catchAsync(
  async (req, res) => {
    const result = await getsRoomReviewsService();
    sendResponse(res, {
      httpStatusCode: status20.CREATED,
      success: true,
      message: "Fetch Review successfully",
      data: result
    });
  }
);
var getsMyRoomReviewsController = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await getsMyRoomReviewsService(user);
    sendResponse(res, {
      httpStatusCode: status20.CREATED,
      success: true,
      message: "Fetch Review successfully",
      data: result
    });
  }
);
var getRoomReviewsController = catchAsync(
  async (req, res) => {
    const result = await getRoomReviewsService(req.params.id);
    sendResponse(res, {
      httpStatusCode: status20.CREATED,
      success: true,
      message: "Fetch Review successfully",
      data: result
    });
  }
);
var getRoomAverageRatingController = catchAsync(
  async (req, res) => {
    const result = await getRoomAverageRatingService(req.params.id);
    sendResponse(res, {
      httpStatusCode: status20.CREATED,
      success: true,
      message: "Average rating review successfully",
      data: result
    });
  }
);
var updateReviewController = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const user = req.user;
    const result = await updateReviewService(
      req.params.id,
      payload,
      user
    );
    sendResponse(res, {
      httpStatusCode: status20.CREATED,
      success: true,
      message: "Update Review successfully",
      data: result
    });
  }
);
var deleteReviewController = catchAsync(
  async (req, res) => {
    const user = req.user;
    await deleteReviewService(req.params.id, user);
    sendResponse(res, {
      httpStatusCode: status20.CREATED,
      success: true,
      message: "Delete Review successfully"
    });
  }
);

// src/app/modules/review/review.routes.ts
var router9 = Router9();
router9.post("/", checkAuth(UserRole.CUSTOMER), createWishlistController2);
router9.get("/", getsRoomReviewsController);
router9.get(
  "/my-reviews",
  checkAuth(UserRole.CUSTOMER),
  getsMyRoomReviewsController
);
router9.get("/room/:id", getRoomReviewsController);
router9.get("/:id", getRoomAverageRatingController);
router9.patch(
  "/:id",
  checkAuth(UserRole.CUSTOMER),
  getRoomAverageRatingController
);
router9.delete(
  "/:id",
  checkAuth(UserRole.CUSTOMER),
  getRoomAverageRatingController
);
var ReviewRoutes = router9;

// src/app/modules/stats/stats.routes.ts
import { Router as Router10 } from "express";

// src/app/modules/stats/stats.controller.ts
import status22 from "http-status";

// src/app/modules/stats/stats.service.ts
import status21 from "http-status";
var getDashboardStatsData = async (user) => {
  switch (user.role) {
    case UserRole.ADMIN:
      return getAdminStats();
    case UserRole.MANAGER:
      return getManagerStats(user);
    case UserRole.CUSTOMER:
      return getCustomerStats(user);
    default:
      throw new AppError_default(status21.BAD_REQUEST, "Invalid role");
  }
};
var getAdminStats = async () => {
  const [
    totalReservations,
    totalRooms,
    totalUsers,
    totalPayments,
    totalReviews,
    totalWishlist,
    totalCheckins,
    revenueData,
    reservationStatus,
    checkinStatus,
    pieChart,
    barChart
  ] = await Promise.all([
    prisma.reservation.count(),
    prisma.room.count(),
    prisma.user.count(),
    prisma.payment.count(),
    prisma.review.count(),
    prisma.wishlist.count(),
    prisma.checkin.count(),
    prisma.payment.aggregate({
      _sum: {
        amount: true
      },
      where: {
        status: PaymentStatus.SUCCESS
      }
    }),
    prisma.reservation.groupBy({
      by: ["status"],
      _count: {
        id: true
      }
    }),
    prisma.checkin.groupBy({
      by: ["status"],
      _count: {
        id: true
      }
    }),
    getPieChartData(),
    getBarChartData()
  ]);
  return {
    totalReservations,
    totalRooms,
    totalUsers,
    totalPayments,
    totalReviews,
    totalWishlist,
    totalCheckins,
    totalRevenue: revenueData._sum.amount || 0,
    reservationStatus: reservationStatus.map(({ _count, status: status25 }) => ({
      status: status25,
      count: _count.id
    })),
    checkinStatus: checkinStatus.map(({ _count, status: status25 }) => ({
      status: status25,
      count: _count.id
    })),
    pieChart,
    barChart
  };
};
var getManagerStats = async (user) => {
  const manager = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email
    }
  });
  console.log(manager);
  const [roomCount, reservationCount, revenueData, checkinCount, reviewCount] = await Promise.all([
    prisma.room.count({
      where: {
        reservations: {
          some: {
            userId: manager.id
          }
        }
      }
    }),
    prisma.reservation.count({
      where: {
        userId: manager.id
      }
    }),
    prisma.payment.aggregate({
      _sum: {
        amount: true
      },
      where: {
        status: PaymentStatus.SUCCESS,
        reservation: {
          userId: manager.id
        }
      }
    }),
    prisma.checkin.count({
      where: {
        reservation: {
          userId: manager.id
        }
      }
    }),
    prisma.review.count({
      where: {
        room: {
          reservations: {
            some: {
              userId: manager.id
            }
          }
        }
      }
    })
  ]);
  return {
    roomCount,
    reservationCount,
    checkinCount,
    reviewCount,
    totalRevenue: revenueData._sum.amount || 0
  };
};
var getCustomerStats = async (user) => {
  const customer = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email
    }
  });
  const [
    reservationCount,
    wishlistCount,
    reviewCount,
    paymentData,
    reservationStatus
  ] = await Promise.all([
    prisma.reservation.count({
      where: {
        userId: customer.id
      }
    }),
    prisma.wishlist.count({
      where: {
        userId: customer.id
      }
    }),
    prisma.review.count({
      where: {
        userId: customer.id
      }
    }),
    prisma.payment.aggregate({
      _sum: {
        amount: true
      },
      where: {
        status: PaymentStatus.SUCCESS,
        reservation: {
          userId: customer.id
        }
      }
    }),
    prisma.reservation.groupBy({
      by: ["status"],
      _count: {
        id: true
      },
      where: {
        userId: customer.id
      }
    })
  ]);
  return {
    reservationCount,
    wishlistCount,
    reviewCount,
    totalSpent: paymentData._sum.amount || 0,
    reservationStatus: reservationStatus.map(({ _count, status: status25 }) => ({
      status: status25,
      count: _count.id
    }))
  };
};
var getPieChartData = async () => {
  const data = await prisma.reservation.groupBy({
    by: ["status"],
    _count: {
      id: true
    }
  });
  return data.map(({ _count, status: status25 }) => ({
    status: status25,
    count: _count.id
  }));
};
var getBarChartData = async () => {
  const result = await prisma.$queryRaw`
    SELECT DATE_TRUNC('month', "createdAt") AS month,
    CAST(COUNT(*) AS INTEGER) AS count
    FROM "Reservation"
    GROUP BY month
    ORDER BY month ASC;
  `;
  return result;
};
var StatsService = {
  getDashboardStatsData
};

// src/app/modules/stats/stats.controller.ts
var getDashboardStats = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await StatsService.getDashboardStatsData(user);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: result
  });
});
var StatsController = {
  getDashboardStats
};

// src/app/modules/stats/stats.routes.ts
var router10 = Router10();
router10.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  StatsController.getDashboardStats
);
var StatsRoutes = router10;

// src/app/modules/users/users.routes.ts
import { Router as Router11 } from "express";

// src/app/modules/users/users.controller.ts
import status24 from "http-status";

// src/app/modules/users/users.service.ts
import status23 from "http-status";
var createManager = async (payload) => {
  const { name, email, password } = payload;
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (existingUser) {
    throw new AppError_default(status23.BAD_REQUEST, "User already exists");
  }
  let userData;
  try {
    userData = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        role: UserRole.MANAGER
      }
    });
  } catch (error) {
    throw new AppError_default(status23.BAD_REQUEST, "Auth user creation failed");
  }
  try {
    const user = await prisma.user.create({
      data: {
        id: userData.user.id,
        name,
        email,
        role: UserRole.MANAGER
      }
    });
    return user;
  } catch (error) {
    if (error.code === "P2002") {
      const existingUser2 = await prisma.user.findUnique({
        where: {
          email
        }
      });
      return existingUser2;
    }
    throw new AppError_default(
      status23.INTERNAL_SERVER_ERROR,
      "Failed to save user in database"
    );
  }
};
var getAllUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};
var getSingleUsers = async (id) => {
  const data = await prisma.user.findUnique({
    where: {
      id
    }
  });
  return data;
};
var updateUser = async (user, id, payload) => {
  const { name, phone, image } = payload;
  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!existingUser) {
    throw new AppError_default(status23.NOT_FOUND, "User not found");
  }
  const data = await prisma.user.update({
    where: {
      id
    },
    data: {
      name,
      phone,
      image
    }
  });
  return data;
};
var updateUserRole = async (user, payload) => {
  const { userId, role } = payload;
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!existingUser) {
    throw new AppError_default(status23.NOT_FOUND, "User not found");
  }
  if (existingUser.id === user.userId) {
    throw new AppError_default(status23.BAD_REQUEST, "You cannot change your own role");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role
    }
  });
  return updatedUser;
};
var UsersService = {
  createManager,
  getAllUsers,
  getSingleUsers,
  updateUser,
  updateUserRole
};

// src/app/modules/users/users.controller.ts
var createManager2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UsersService.createManager(payload);
  sendResponse(res, {
    httpStatusCode: status24.CREATED,
    success: true,
    message: "Manager created successfully",
    data: result
  });
});
var getAllUsers2 = catchAsync(async (req, res) => {
  const result = await UsersService.getAllUsers();
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Fetch Users successfully",
    data: result
  });
});
var getSingleUsers2 = catchAsync(async (req, res) => {
  const result = await UsersService.getSingleUsers(req.params.id);
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Fetch Users successfully",
    data: result
  });
});
var updateUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const result = await UsersService.updateUser(
    user,
    req.params.id,
    payload
  );
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Updated Users successfully",
    data: result
  });
});
var updateUserRole2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const result = await UsersService.updateUserRole(user, payload);
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "User role updated successfully",
    data: result
  });
});
var UsersController = {
  createManager: createManager2,
  getAllUsers: getAllUsers2,
  getSingleUsers: getSingleUsers2,
  updateUser: updateUser2,
  updateUserRole: updateUserRole2
};

// src/app/modules/users/users.routes.ts
var router11 = Router11();
router11.post(
  "/create-manager",
  checkAuth(UserRole.ADMIN),
  UsersController.createManager
);
router11.get("/", checkAuth(UserRole.ADMIN), UsersController.getAllUsers);
router11.get("/:id", UsersController.getSingleUsers);
router11.patch(
  "/me/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  UsersController.updateUser
);
router11.patch(
  "/role/:id",
  checkAuth(UserRole.ADMIN),
  UsersController.updateUserRole
);
var usersRoutes = router11;

// src/app/routes/index.ts
var router12 = Router12();
router12.use("/auth", authRoutes);
router12.use("/extra-service", serviceRoutes);
router12.use("/room-type", roomTypeRoutes);
router12.use("/room", roomRoutes);
router12.use("/reservation", ReservationRoutes);
router12.use("/payment", PaymentRoutes);
router12.use("/checkin", CheckinRoutes);
router12.use("/wishlist", WishlistRoutes);
router12.use("/review", ReviewRoutes);
router12.use("/stats", StatsRoutes);
router12.use("/users", usersRoutes);
var IndexRoutes = router12;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import cookieParser from "cookie-parser";
var app = express();
app.use("/api/auth", toNodeHandler(auth));
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BACKEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", IndexRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully"
  });
});
var app_default = app;

// src/server.ts
var PORT = envVars.PORT || 5e3;
app_default.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map