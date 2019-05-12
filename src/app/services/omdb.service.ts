import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, concatAll } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Movie } from '../interfaces/movie';
@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  constructor(private http: HttpClient) {}
  readonly ApiKey: string = '1ce46be1';

  fetchMovie(title: string): Observable<any> {
    return this.http.get(`http://www.omdbapi.com/?t=${title}&apikey=1ce46be1`);
  }

  getMovies(title) {
    return this.fetchMovies(title).pipe(
      map(res => {
        let observableArr = res.Search.map(movie => {
          return this.fetchMovie(movie.Title);
        });
        return forkJoin(observableArr);
      }),
      concatAll()
    );
  }

  fetchMovies(title: string): Observable<any> {
    return this.http.get(
      `https://www.omdbapi.com/?s=${title}&type=movie&r=json&apikey=1ce46be1`
    );
  }
}
