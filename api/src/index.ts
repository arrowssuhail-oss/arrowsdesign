import 'dotenv/config'; // Load env vars before anything else
import express, { Request, Response } from 'express';
import cors from 'cors';
import connectToDatabase from './lib/db.js';
import seedRouter from './routers/seedRouter.js';
import imageKitRouter from './routers/imageKitRouter.js';
import projectRouter from './routers/projectRouter.js';
import storyRouter from './routers/storyRouter.js';
import authRouter from './routers/authRouter.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8000', 'http://127.0.0.1:8000'],
    credentials: true,
}));
app.use(express.json());

// MongoDB Connection
connectToDatabase()
    .then(() => console.log('Connected to MongoDB via lib/db'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

// Mount routers
router.use('/seed', seedRouter);
router.use('/projects', projectRouter);
router.use('/stories', storyRouter);
import adminRouter from './routers/adminRouter.js';

// ...
router.use('/auth', authRouter);
router.use('/imagekit', imageKitRouter);
router.use('/admin', adminRouter);

app.use('/api', router);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
