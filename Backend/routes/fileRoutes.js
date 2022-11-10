import express from 'express';
import { uploadFile } from '../controllers/fileController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/file').post(protect, uploadFile );

export default router;