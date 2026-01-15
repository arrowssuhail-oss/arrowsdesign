import express, { Router } from 'express';
import { updateUserRoleController, getStats } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { clerkAuth } from '../middleware/clerkAuth.js';

const router: Router = express.Router();

// Apply Clerk Auth & Admin Check to all routes
router.use(clerkAuth, requireAdmin);

router.post('/role', updateUserRoleController);
router.get('/stats', getStats);

export default router;
