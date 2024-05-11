import { Component, OnInit } from '@angular/core';
import { TvService } from '../services/tv.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css',
  providers: [TvService]
})
export class TvshowsComponent implements OnInit {
  topRatedTVShows: any;
  responsiveOptions;
  loading: boolean = true;
  router: any;


  constructor(public tvservice: TvService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      }
    ];
   }

  ngOnInit(): void {
    this.loadTopRatedTvShows();
  }

  loadTopRatedTvShows(): void {
    this.tvservice.getTopRatedTvShows().subscribe((data: any) => {
      this.topRatedTVShows = data.results.slice(0, 10);
    });
  }
  onTvShowClicked(tv: any) {
    console.log('Clicked movie:', tv.id);
    const tvId = tv.id;
    this.router.navigate(['/tvshow-details', tvId]); // Use movie.id to navigate
  }
}

