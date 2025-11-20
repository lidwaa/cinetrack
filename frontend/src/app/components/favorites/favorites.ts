import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getLists().subscribe(lists => {
      this.favorites = lists.filter(l => l.type === 'favorite').map(l => l.movieData);
    });
  }

  remove(movieId: number) {
    this.userService.removeFromList(movieId, 'favorite').subscribe(() => {
      this.favorites = this.favorites.filter(m => m.id !== movieId);
    });
  }
}
