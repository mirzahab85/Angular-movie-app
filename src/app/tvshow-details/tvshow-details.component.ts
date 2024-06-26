import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location service
import { TvService } from '../services/tv.service';


@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css']
})
export class TvshowDetailsComponent implements OnInit {
[x: string]: any;
  id: string = '';
  details: any = {}; // Initialize details as empty object
  loading: boolean = false;
  error: string = '';
  placeholderImageUrl = 'https://image.tmdb.org/t/p/w500'; // Replace with your placeholder image path
  status: any;

  constructor(
    private _ActivateRoute: ActivatedRoute,
    private _TVService: TvService,
    private _Router: Router,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back(); // Go back to the previous location
  }

  ngOnInit(): void {
    this._ActivateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.loadTVDetails(this.id);
    });
  }

  getLanguageText(
    language: string | { name: string; code: string }
  ): string {
    if (typeof language === 'string') {
      return language; // Assuming language is just a code
    } else {
      return language.name || language.code; // Return name or code as fallback
    }
  }

  loadTVDetails(id: string): void {
    this.loading = true;
    this.error = ''; // Clear any previous error message

    this._TVService.getDetails(id).subscribe(
      (response: any) => {
        this.details = response;
        this.loading = false;
      },
      (error) => {
        this.error = 'Error loading tv details: ' + error.message;
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
