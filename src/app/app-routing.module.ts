import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home-component/home.component';
import { SummaryComponent } from './summary/summary-component/summary.component';
import { GalleryComponent } from './gallery/gallery-component/gallery.component';
import { AddSummaryCardComponent } from './summary/add-summary-card/add-summary-card.component';

import { AuthGuard } from './services/auth-guard.service';
import { EditSummaryCardComponent } from './summary/edit-summary-card/edit-summary-card.component';
import { ArticlesPageComponent } from './articles/articles-page/articles-page.component';
import { AddArticlePageComponent } from './articles/add-article-page/add-article-page.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'summary/new-card', canActivate: [AuthGuard], component: AddSummaryCardComponent },
    { path: 'summary/edit-card/:id', canActivate: [AuthGuard], component: EditSummaryCardComponent },
    { path: 'countries', component: ArticlesPageComponent },
    { path: 'countries/:country/:id', component: ArticlesPageComponent },
    { path: 'countries/new', canActivate: [AuthGuard], component: AddArticlePageComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
