import express from 'express';

import {
  createPost,
  editPost,
  removePost,
  viewAllReview,
  viewPosts,
  searchPosts,
} from '../controllers/review.js';
import { protect, verified } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/createpost', protect, verified, createPost);

// router.put('/:id', protect, verified, editPost);

// router.delete('/:id', protect, verified, removePost);

router.post('/getreview', protect, viewAllReview);

// router.get('/', protect, verified, viewPosts);

// router.post('/search', protect, searchPosts);

export default router;
