import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movie.service';
import { Observable, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  searchTerm: string = ''; // Add searchTerm property
  private searchTerms = new Subject<string>();

  constructor(public moviesService: MoviesService, private router: Router) { // Inject Router
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      }
    ];

    // Subscribe to searchTerms subject with debounceTime and distinctUntilChanged operators
    this.searchTerms.pipe(
      debounceTime(1000), // Wait for 1 second after the user stops typing
      distinctUntilChanged() // Only emit distinct consecutive values
    ).subscribe(searchTerm => {
      if (searchTerm.length >= 3) {
        this.searchMovies(searchTerm);
      } else {
        this.loadTopRatedMovies();
      }
    });
  }

  ngOnInit(): void {
    this.loadTopRatedMovies();
  }

  loadTopRatedMovies(): void {
    this.moviesService.getTopRatedMovies().subscribe((data: any) => {
      this.topRatedMovies = data.results.slice(0, 10);
    });
  }

  searchMovies(searchTerm: string): void {
    if (searchTerm.length >= 3) {
      this.moviesService.searchMovies(searchTerm).subscribe((data: any) => {
      this.topRatedMovies = data.results;
    });
      this.loadTopRatedMovies();
  }
  }
  onSearchInput(event: any): void {
    const searchTerm = event.target.value.trim();
    this.searchTerms.next(searchTerm); // Emit the search term to the searchTerms subject
  }

  onMovieClicked(movie: any) {
    console.log('Movie ID:', movie.id);
    const movieId = movie.id;
    this.router.navigate(['/movie-details', movieId]); // Use movie.id to navigate
  }
}
