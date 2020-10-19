import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AddSummaryCardComponent } from './add-summary-card/add-summary-card.component';

import { AuthGuard } from './services/auth-guard.service';
import { EditSummaryCardComponent } from './edit-summary-card/edit-summary-card.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'summary/new-card', canActivate: [AuthGuard], component: AddSummaryCardComponent },
  { path: 'summary/edit-card/:id', canActivate: [AuthGuard], component: EditSummaryCardComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
