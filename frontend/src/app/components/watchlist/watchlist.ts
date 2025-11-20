import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getLists().subscribe(lists => {
      this.watchlist = lists.filter(l => l.type === 'watchlist').map(l => l.movieData);
    });
  }

  remove(movieId: number) {
    this.userService.removeFromList(movieId, 'watchlist').subscribe(() => {
      this.watchlist = this.watchlist.filter(m => m.id !== movieId);
    });
  }
}
