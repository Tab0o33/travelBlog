// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components
import { HomeComponent } from './home-component/home.component';

// Services

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule { }
