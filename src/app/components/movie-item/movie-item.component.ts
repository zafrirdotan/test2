import { Component, Input, ViewChild } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @ViewChild('f') editMovieForm: NgForm;
  @Input() movie: Movie;
  isEdited: boolean = false;
  isDelete: boolean = false;
  isTitleDuplicated: boolean = false;
  preEditMovie: Movie;

  constructor(private MovieService: MovieService) {}

  editMovie(): void {
    this.preEditMovie = { ...this.movie };
    this.isEdited = true;
  }

  onDeleteMovie(): void {
    this.isDelete = true;
  }

  deleteMovie(movie: Movie) {
    this.MovieService.deleteMovie(movie);
  }

  onDeleteCanceled(): void {
    this.isDelete = false;
  }

  onMovieEdited(movie: Movie, preEditMovie: Movie): void {
    this.MovieService.editMovie(movie, preEditMovie);
    this.isEdited = false;
  }

  onEditCanceled(): void {
    this.movie = this.preEditMovie;
    this.isEdited = false;
  }

  checkTitle(form: NgForm): void {
    var titleToCheck = this.editMovieForm.value.movieTitle;
    var isDuplicated = this.MovieService.checkForDuplicates(titleToCheck);
    isDuplicated ? (this.isTitleDuplicated = true) : this.getInput(form);
  }

  getInput(form: NgForm): void {
    this.movie.Title = this.editMovieForm.value.movieTitle;
    this.movie.Director = this.editMovieForm.value.movieDirector;
    this.movie.Year = this.editMovieForm.value.movieYear;
    this.movie.Genre = this.editMovieForm.value.movieGenre;
    this.movie.Runtime = this.editMovieForm.value.movieRuntime;

    this.onMovieEdited(this.movie, this.preEditMovie);
  }
}
