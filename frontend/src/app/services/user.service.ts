import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MovieList } from '../models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/user';

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders() {
        const token = this.authService.currentUserValue?.token;
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
    }

    getLists(): Observable<MovieList[]> {
        return this.http.get<MovieList[]>(`${this.apiUrl}/lists`, this.getHeaders());
    }

    addToList(movieId: number, type: 'favorite' | 'watchlist', movieData: any): Observable<any> {
        console.log('Adding to list:', movieId, type);
        console.log('Headers:', this.getHeaders());
        return this.http.post(`${this.apiUrl}/lists`, { movieId, type, movieData }, this.getHeaders());
    }

    removeFromList(movieId: number, type: 'favorite' | 'watchlist'): Observable<any> {
        return this.http.delete(`${this.apiUrl}/lists/${type}/${movieId}`, this.getHeaders());
    }
}
