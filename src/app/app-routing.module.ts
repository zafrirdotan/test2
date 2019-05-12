import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieGalleryComponent } from './pages/movie-gallery/movie-gallery.component';

const routes: Routes = [
  { path: 'movie-gallery', component: MovieGalleryComponent },
  { path: '',
    redirectTo: '/movie-gallery',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
