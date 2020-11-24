// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules externes
import { ModalModule } from 'ngx-bootstrap/modal';

// Components
import { HomeComponent } from './home-component/home.component';
import { CommentComponent } from './comment/comment.component';

// Services

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        HomeComponent,
        CommentComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule { }
