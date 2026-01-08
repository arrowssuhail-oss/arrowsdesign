import express, { Router } from 'express';
import { getStories, createStory, deleteStory, archiveStory } from '../controllers/storyController.js';

const router: Router = express.Router();

router.get('/', getStories);
router.post('/', createStory);
router.delete('/:id', deleteStory);
router.patch('/:id/archive', archiveStory);

export default router;
