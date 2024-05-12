import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movie.service';
import { TvService } from '../services/tv.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
onMovieClicked(_t5: any) {
throw new Error('Method not implemented.');
}
  topRatedMovies: any;


  constructor(public moviesService: MoviesService, public tvService: TvService) { }

  ngOnInit(): void {
    this.loadTopRatedMovies();
    this.loadTopRatedTvShows();
  }

  loadTopRatedMovies(): void {
    this.moviesService.getTopRatedMovies().subscribe((data: any) => {
      this.topRatedMovies = data.results.slice(0, 10);
    });
  }

  loadTopRatedTvShows(): void {
    this.tvService.getTopRatedTvShows().subscribe((data: any) => {
      this.loadTopRatedTvShows = data.results.slice(0, 10);
    });
   }
  }