import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css'
})
export class Watchlist implements OnInit {
  watchlist: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.getWatchlist().subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }

  remove(movieId: number) {
    this.firestoreService.removeFromWatchlist(movieId).subscribe(() => {
      this.watchlist = this.watchlist.filter(m => m.id !== movieId);
    });
  }
}
