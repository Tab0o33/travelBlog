import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { GalleryComponent } from './gallery/gallery.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
