import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movie.service';
import { Location } from '@angular/common'; // Import Location service

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id: string = '';
  details: any = {};
  loading: boolean = false;
  error: string = '';
  placeholderImageUrl = 'https://image.tmdb.org/t/p/w500';
  status: any;
  
  constructor(private _ActivateRoute: ActivatedRoute, private _MoviesService: MoviesService, private location: Location) {}

  goBack(): void {
    this.location.back(); // Use Location service to navigate back
  }

  ngOnInit(): void {
    this._ActivateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadMovieDetails(this.id);
    });
  }

  getLanguageText(language: string | { name: string; code: string }): string {
    if (typeof language === 'string') {
      return language;
    } else {
      return language.name || language.code;
    }
  }

  loadMovieDetails(id: string): void {
    this.loading = true;
    this.error = '';

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
    event.target.src = this.placeholderImageUrl;
  }
}
