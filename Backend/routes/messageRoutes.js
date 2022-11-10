import express from 'express';
import { sendMessage } from '../controllers/messageController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/message').post(protect, sendMessage);

export default router;