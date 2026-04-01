import express from 'express';
import { generateIdea } from '../controllers/ideaController.js';
import { register, login, getMe } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ── Health ────────────────────────────────────────────────────
router.get('/test', (req, res) => res.status(200).json({ message: 'Backend working' }));
router.get('/health', (req, res) => res.status(200).json({ status: 'OK', message: 'API is healthy' }));

// ── AI Generation ─────────────────────────────────────────────
router.post('/generate-idea', generateIdea);

// ── Auth ──────────────────────────────────────────────────────
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authenticateToken, getMe);

export default router;
