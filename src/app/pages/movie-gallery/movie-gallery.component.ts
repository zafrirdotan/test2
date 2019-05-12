import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss']
})
export class MovieGalleryComponent{
  @ViewChild('f') addMovieForm: NgForm; 
  movies: Movie[] = [];
  getMovieSub: Subscription;
  isAddingMovie: boolean = false;
  userCreatedMovie: Movie = {
    Id: '', 
    Title: '', 
    Year: '', 
    Runtime: '',
    Genre: '',
    Director: '',}
  isDuplicated = false;
  constructor(private movieService: MovieService) { }

  ngOnDestroy(){
    this.getMovieSub.unsubscribe();
  }

  onAddMovie(): void {
    this.isAddingMovie = true;
  }

  onCancelAdd(): void {
    this.isAddingMovie = false;
    this.resetNewMovie()
  }

  onSavelAdd(): void {
    this.movieService.addMovie(this.userCreatedMovie)
    this.isAddingMovie = false;
    this.resetNewMovie()
  }

  resetNewMovie(): void {
    this.userCreatedMovie = {
      Id: '', 
      Title: '', 
      Year: '', 
      Runtime: '',
      Genre: '',
      Director: ''
    }
  }

  getInput(form: NgForm): void{
    this.userCreatedMovie.Title = this.addMovieForm.value.movieTitle;
    this.userCreatedMovie.Director = this.addMovieForm.value.movieDirector;
    this.userCreatedMovie.Year = this.addMovieForm.value.movieYear;
    this.userCreatedMovie.Genre = this.addMovieForm.value.movieGenre;
    this.userCreatedMovie.Runtime = this.addMovieForm.value.movieRuntime;
    this.onSavelAdd();
  }
  
  checkTitle(form: NgForm){
    var titleToCheck = this.addMovieForm.value.movieTitle;
    var isDuplicated = this.movieService.checkForDuplicates(titleToCheck);
      (isDuplicated)? this.isDuplicated = true : this.getInput(form);

  }
}
