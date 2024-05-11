import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movie.service';
import { RuntimePipe } from '../pipe/runtime.pipe';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id: string = '';
  details: any = {}; // Initialize details as empty object
  loading: boolean = false;
  error: string = '';
  placeholderImageUrl = 'https://image.tmdb.org/t/p/w500'; // Replace with your placeholder image path
  status: any;

  constructor(private _ActivateRoute: ActivatedRoute, private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this._ActivateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadMovieDetails(this.id);
    });
  }

  getLanguageText(language: string | { name: string; code: string }): string {
    if (typeof language === 'string') {
      return language; // Assuming language is just a code
    } else {
      return language.name || language.code; // Return name or code as fallback
    }
  }

  loadMovieDetails(id: string): void {
    this.loading = true;
    this.error = ''; // Clear any previous error message

    this._MoviesService.getDetails(id).subscribe(
      (response: any) => {
        this.details = response;
        this.loading = false;
      },
      error => {
        this.error = 'Error loading movie details: ' + error.message;
        this.loading = false;
      }
    );
  }

  handleImageError(event: any) {
    console.error('Image loading error:', event);
    // Optional: Display a user-friendly message or a placeholder image here
    event.target.src = this.placeholderImageUrl; // Set placeholder image on error
  }
}
