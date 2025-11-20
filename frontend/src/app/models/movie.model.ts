export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
}

export interface MovieList {
    userId: string;
    movieId: number;
    type: 'favorite' | 'watchlist';
    movieData: Movie;
    addedAt: Date;
}
