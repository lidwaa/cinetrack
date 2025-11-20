import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Query is required' });

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query,
                language: 'fr-FR'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from TMDB', error: error.message });
    }
};

export const getPopularMovies = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'fr-FR'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from TMDB', error: error.message });
    }
};

export const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'fr-FR',
                append_to_response: 'credits,videos'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie details', error: error.message });
    }
};

export const getGenres = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'fr-FR'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching genres', error: error.message });
    }
};

export const discoverMovies = async (req, res) => {
    const { with_genres, primary_release_year, 'vote_average.gte': vote_average } = req.query;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'fr-FR',
                sort_by: 'popularity.desc',
                with_genres,
                primary_release_year,
                'vote_average.gte': vote_average
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error discovering movies', error: error.message });
    }
};
