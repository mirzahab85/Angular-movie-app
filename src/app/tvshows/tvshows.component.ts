import { Component, OnInit } from '@angular/core';
import { TvService } from '../services/tv.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css'],
  providers: [TvService]
})
export class TvshowsComponent implements OnInit {
  topRatedTVShows: any;
  responsiveOptions;
  loading: boolean = true;
  searchQuery: string = ''; // Renamed property
  private searchTerms = new Subject<string>();

  constructor(public tvservice: TvService, private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      }
    ];

    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm.length >= 3) {
        this.searchTvShow(searchTerm);
      } else {
        this.loadTopRatedTvShows();
      }
    });
  }

  ngOnInit(): void {
    this.loadTopRatedTvShows();
  }

  loadTopRatedTvShows(): void {
    this.tvservice.getTopRatedTvShows().subscribe((data: any) => {
      this.topRatedTVShows = data.results.slice(0, 10);
    });
  }

  searchTvShow(searchTerm: string): void {
    this.tvservice.searchTvShow(searchTerm).subscribe((data: any) => {
      this.topRatedTVShows = data.results;
    });
  }

  onSearchInput(event: any): void {
    const searchTerm = event.target.value.trim();
    this.searchTerms.next(searchTerm);
  }

  onTvShowClicked(tv: any) {
    console.log('Clicked movie:', tv.id);
    const tvId = tv.id;
    this.router.navigate(['/tvshow-details', tvId]);
  }
}
