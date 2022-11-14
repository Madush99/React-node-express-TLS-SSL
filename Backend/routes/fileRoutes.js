import express from 'express';
import { uploadFile } from '../controllers/fileController.js';
import { protect, admin, manager} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/file').post(protect, manager, uploadFile );

export default router;