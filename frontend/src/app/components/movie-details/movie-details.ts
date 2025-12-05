import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
  movie: any;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tmdbService.getMovieDetails(+id).subscribe(data => {
        this.movie = data;
      });
    }
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  addToList(type: 'favorite' | 'watchlist') {
    if (!this.isLoggedIn) {
      alert('Veuillez vous connecter pour ajouter des films à vos listes.');
      return;
    }

    const observable = type === 'favorite'
      ? this.firestoreService.addToFavorites(this.movie)
      : this.firestoreService.addToWatchlist(this.movie);

    observable.subscribe({
      next: () => alert('Ajouté avec succès !'),
      error: (err) => alert('Erreur lors de l\'ajout')
    });
  }
}
