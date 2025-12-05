import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {
  favorites: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  remove(movieId: number) {
    this.firestoreService.removeFromFavorites(movieId).subscribe(() => {
      this.favorites = this.favorites.filter(m => m.id !== movieId);
    });
  }
}
