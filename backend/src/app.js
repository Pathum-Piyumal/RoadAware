import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

// Import Route Handlers (going one level up from src/)
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin.routes.js';
import reportRoutes from '../routes/report.routes.js';
import analyticsRoutes from '../routes/analytics.routes.js';
import categoryRoutes from '../routes/category.routes.js';
import commentRoutes from '../routes/comment.routes.js';
import contactRoutes from '../routes/contact.routes.js';

// Import Error Handler
import { errorHandler } from '../middleware/error.middleware.js';
import sequelize from '../config/database.js';

const app = express();

// Global Middlewares
app.use(cors({
  origin: true, // Allow all origins for local testing, or configure appropriately
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: false, // Allow static images to be served across origins
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: [
        "'self'", 
        "data:", 
        "*.openstreetmap.org", 
        "images.unsplash.com", 
        "res.cloudinary.com"
      ],
      connectSrc: ["'self'", "*.openstreetmap.org"],
    },
  },
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve Static Uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes Mapping
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/reports/:id/comments', commentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      success: true,
      message: 'RoadAware API is healthy.',
      database: 'Connected',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'RoadAware API is unhealthy.',
      database: 'Disconnected',
      error: error.message,
    });
  }
});

// Fallback 404 Route
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found on path: ${req.originalUrl}`,
  });
});

// Global Centralized Error Middleware
app.use(errorHandler);

export default app;
