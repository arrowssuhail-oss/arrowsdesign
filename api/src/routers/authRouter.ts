import express, { Router } from 'express';
import { login, sync } from '../controllers/authController.js';
import { clerkAuth } from '../middleware/clerkAuth.js';

const router: Router = express.Router();

router.post('/login', login);
// Protect sync with Clerk Auth (since it's called from frontend)
router.post('/sync', clerkAuth, sync);

export default router;
