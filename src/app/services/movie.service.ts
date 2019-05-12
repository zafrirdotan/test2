import { Injectable, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { from, of } from 'rxjs';
import { OmdbService } from './omdb.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: Movie[] = [];
  constructor(private omdbService: OmdbService) {
    this.getMovies()
  }

  public getMovies() {
    this.omdbService.getMovies('Batman').subscribe(movies => {
      this.movies = movies.map((movie: any) => {
        return {
          Id: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Runtime: movie.Runtime,
          Genre: movie.Genre,
          Director: movie.Director,
        };
      });
    });
    return of(this.movies);
  }

  public editMovie(newMovie, oldMovie): void {
    var index = this.findMovieIndex(this.movies, oldMovie);
    this.movies.splice(index, 1, newMovie);
  }

  public deleteMovie(movie): void {
    var movieToRemoveIndex = this.findMovieIndex(this.movies, movie.Title);
    this.movies.splice(movieToRemoveIndex, 1);
  }

  findMovieIndex(movies: Movie[], target: string): number {
    var index = movies.findIndex(movie => movie.Title === target);
    return index;
  }

  public addMovie(newMovie): void {
    var newMovieId = this.generateId();
    newMovie.Id = newMovieId;
    this.movies.push(newMovie);
  }

  generateId(): string {
    var length = 9;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
  }

  public checkForDuplicates(titleToCheck: string): boolean{
    titleToCheck = titleToCheck.replace(/[^0-9a-z ]/gi, '');
    titleToCheck = titleToCheck.toLowerCase();
    var movieTitles = this.movies.map(movie => {
      return movie.Title.toLowerCase();
    })
    var isDuplicated = movieTitles.includes(titleToCheck);
    return isDuplicated
  }

}

