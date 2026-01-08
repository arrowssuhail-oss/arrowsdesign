import express from 'express';
import { getAuthParameters } from '../controllers/imageKitController.js';

const router = express.Router();

router.get('/auth', getAuthParameters);

export default router;
