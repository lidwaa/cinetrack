import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, getDocs, query, where, Timestamp } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, map, switchMap, of } from 'rxjs';
import { Movie, MovieList } from '../models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    private firestore = inject(Firestore);
    private authService = inject(AuthService);

    // Add movie to favorites
    addToFavorites(movie: Movie): Observable<void> {
        const userId = this.authService.currentUserValue?.id;
        if (!userId) {
            return of(undefined);
        }

        const favRef = doc(this.firestore, `users/${userId}/favorites/${movie.id}`);
        const data = {
            movieId: movie.id,
            movieData: movie,
            addedAt: Timestamp.now()
        };

        return from(setDoc(favRef, data));
    }

    // Remove movie from favorites
    removeFromFavorites(movieId: number): Observable<void> {
        const userId = this.authService.currentUserValue?.id;
        if (!userId) {
            return of(undefined);
        }

        const favRef = doc(this.firestore, `users/${userId}/favorites/${movieId}`);
        return from(deleteDoc(favRef));
    }

    // Get all favorites
    getFavorites(): Observable<Movie[]> {
        const userId = this.authService.currentUserValue?.id;
        if (!userId) {
            return of([]);
        }

        const favCollection = collection(this.firestore, `users/${userId}/favorites`);
        return from(getDocs(favCollection)).pipe(
            map(snapshot => snapshot.docs.map(doc => doc.data()['movieData'] as Movie))
        );
    }

    // Add movie to watchlist
    addToWatchlist(movie: Movie): Observable<void> {
        const userId = this.authService.currentUserValue?.id;
        if (!userId) {
            return of(undefined);
        }

        const watchRef = doc(this.firestore, `users/${userId}/watchlist/${movie.id}`);
        const data = {
            movieId: movie.id,
            movieData: movie,
            addedAt: Timestamp.now()
        };

        return from(setDoc(watchRef, data));
    }

    // Remove movie from watchlist
    removeFromWatchlist(movieId: number): Observable<void> {
        const userId = this.authService.currentUserValue?.id;
        if (!userId) {
            return of(undefined);
        }

        const watchRef = doc(this.firestore, `users/${userId}/watchlist/${movieId}`);
        return from(deleteDoc(watchRef));
    }

    // Get all watchlist items
    getWatchlist(): Observable<Movie[]> {
        const userId = this.authService.currentUserValue?.id;
        if (!userId) {
            return of([]);
        }

        const watchCollection = collection(this.firestore, `users/${userId}/watchlist`);
        return from(getDocs(watchCollection)).pipe(
            map(snapshot => snapshot.docs.map(doc => doc.data()['movieData'] as Movie))
        );
    }

    // Check if movie is in favorites
    isInFavorites(movieId: number): Observable<boolean> {
        return this.getFavorites().pipe(
            map(favorites => favorites.some(movie => movie.id === movieId))
        );
    }

    // Check if movie is in watchlist
    isInWatchlist(movieId: number): Observable<boolean> {
        return this.getWatchlist().pipe(
            map(watchlist => watchlist.some(movie => movie.id === movieId))
        );
    }
}
