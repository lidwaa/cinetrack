import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { MovieDetails } from './components/movie-details/movie-details';
import { Search } from './components/search/search';
import { Favorites } from './components/favorites/favorites';
import { Watchlist } from './components/watchlist/watchlist';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'movie/:id', component: MovieDetails },
    { path: 'search', component: Search },
    { path: 'favorites', component: Favorites, canActivate: [AuthGuard] },
    { path: 'watchlist', component: Watchlist, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
