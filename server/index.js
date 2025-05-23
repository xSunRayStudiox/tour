import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import offerRoutes from './routes/offerRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

import path from 'path';

dotenv.config();

const app = express();
app.use(
    cors({
        origin: ["http://localhost:5173", "https://tour-mw3t.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());

const PORT = process.env.PORT;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));

// images folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Serve frontend in production
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/package', packageRoutes);
app.use('/api/booking', bookingRoutes);
