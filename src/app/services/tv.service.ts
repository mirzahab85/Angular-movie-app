// tv.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  apiUrl: string;
  apiKey: string;
  
  constructor(private http: HttpClient) { 
    this.apiUrl = 'https://api.themoviedb.org/3';
    this.apiKey = '8ba4e4851dc842dbe52a04fffede9da2'; // Replace with your actual API key
  }

  getTopRatedTvShows(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/top_rated?api_key=${this.apiKey}`);
  }

  searchTvShow(searchTerm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/tv?api_key=${this.apiKey}&query=${searchTerm}`);
  }

  getImageUrl(posterPath: string): string {
    // Assuming posterPath is provided by the API, it represents the path of the movie poster
    // You need to prepend the base URL of TMDb to get the full URL of the image
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`);
  }
}
