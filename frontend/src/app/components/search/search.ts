import { Component } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  query = '';
  results: any[] = [];

  constructor(private tmdbService: TmdbService) { }

  onSearch() {
    if (this.query.trim()) {
      this.tmdbService.searchMovies(this.query).subscribe(data => {
        this.results = data.results;
      });
    }
  }
}
