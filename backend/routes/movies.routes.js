import express from 'express';
import { searchMovies, getPopularMovies, getMovieDetails, getGenres, discoverMovies } from '../controllers/movies.controller.js';

const router = express.Router();

router.get('/search', searchMovies);
router.get('/popular', getPopularMovies);
router.get('/genres', getGenres);
router.get('/discover', discoverMovies);
router.get('/:id', getMovieDetails);

export default router;
