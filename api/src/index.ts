import express, { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { StatusCheck } from './models/StatusCheck.js';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
}));
app.use(express.json());

// MongoDB Connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mybase';
mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

router.post('/status', async (req: Request, res: Response) => {
    try {
        const { client_name } = req.body;

        const newStatus = new StatusCheck({ client_name });
        const savedStatus = await newStatus.save();
        res.json(savedStatus);
    } catch (error) {
        console.error('Error creating status check:', error);
        res.status(500).json({ error: 'Failed to create status check', details: error instanceof Error ? error.message : String(error) });
    }
});

router.get('/status', async (req: Request, res: Response) => {
    try {
        const statusChecks = await StatusCheck.find().sort({ timestamp: -1 }).limit(100);
        res.json(statusChecks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch status checks' });
    }
});

app.use('/api', router);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
