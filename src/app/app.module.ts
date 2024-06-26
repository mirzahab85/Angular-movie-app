import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from './services/movie.service';
import { TvService } from './services/tv.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { TvshowDetailsComponent } from './tvshow-details/tvshow-details.component';


import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from "./includes/header/header.component";
import { FooterComponent } from './includes/footer/footer.component';
import { pipe } from 'rxjs';

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        TvshowsComponent,
        MovieDetailsComponent,
        TvshowDetailsComponent,

    ],
    providers: [MoviesService, TvService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule, // Import HttpClientModule here
        AppRoutingModule,
        HeaderComponent,
        CommonModule,
        FooterComponent
    ]
})
export class AppModule { }
