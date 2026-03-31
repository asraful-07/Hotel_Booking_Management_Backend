import express, { Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";

const app = express();

app.use("/api/auth", toNodeHandler(auth));

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BACKEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
//* Routes
app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

export default app;
