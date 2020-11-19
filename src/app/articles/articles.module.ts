// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules internes
import { AppRoutingModule } from '../app-routing.module';

// Modules externes
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);


// Components
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticleComponent } from './article/article.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleFormP2Component } from './article-form-p2/article-form-p2.component';
import { AddArticlePageComponent } from './add-article-page/add-article-page.component';

// Services
import { ArticlesService } from './articles.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        ArticlesPageComponent,
        ArticleComponent,
        ArticleFormComponent,
        ArticleFormP2Component,
        AddArticlePageComponent
    ],
    exports: [
        ArticlesPageComponent
    ],
    providers: [
        ArticlesService
    ]
})
export class ArticlesModule { }
