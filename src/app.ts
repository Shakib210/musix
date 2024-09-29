import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes'; // Ensure the import is correct
import errorHandler from '@middlewares/errorHandler'; // Import custom error handler
import { connectDB } from '@config/db';

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json()); // You can keep this if needed

// Database connection
connectDB();

// Use the routes
app.use('/api', routes); // Mount all routes under '/api'

// Custom error handler middleware
app.use(errorHandler as any);

export default app;
