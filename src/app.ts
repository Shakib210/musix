import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler"; // Import custom error handler
import { connectDB } from "./config/db";
import configureAllRoutes from "./routes/index.js";

const app: Application = express(); // Ensure `app` is explicitly typed as `Application`

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json()); // You can keep this if needed

// Database connection
connectDB();

// Use the routes
configureAllRoutes(app);

// Error handler middleware (must be after all routes)
app.use(errorHandler as any);

export default app;
