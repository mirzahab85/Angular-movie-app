import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {
  topRatedMovies: any;
  responsiveOptions: any[];
  loading: boolean = true;

  constructor(public moviesService: MoviesService, private router: Router) { // Inject Router
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      }
    ];
  }

  ngOnInit(): void {
    this.loadTopRatedMovies();
  }

  loadTopRatedMovies(): void {
    this.moviesService.getTopRatedMovies().subscribe((data: any) => {
      this.topRatedMovies = data.results.slice(0, 10);
    });
  }

  onMovieClicked(movie: any) {
    console.log('Movie ID:', movie.id);
    const movieId = movie.id;
    this.router.navigate(['/movie-details', movieId]); // Use movie.id to navigate
  }
}