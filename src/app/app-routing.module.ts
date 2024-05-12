// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvshowDetailsComponent } from './tvshow-details/tvshow-details.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'movie-details/:id', component: MovieDetailsComponent },
    { path: 'tvshows', component: TvshowsComponent },
    { path: 'tvshow-details/:id', component: TvshowDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
