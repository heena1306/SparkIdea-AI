import express from 'express';
import { generateIdea } from '../controllers/ideaController.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is healthy' });
});

router.post('/generate-idea', generateIdea);

export default router;
