import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { getLists, addToList, removeFromList } from '../controllers/user.controller.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/lists', getLists);
router.post('/lists', addToList);
router.delete('/lists/:type/:movieId', removeFromList);

export default router;
