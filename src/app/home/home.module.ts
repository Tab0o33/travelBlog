// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules externes

// Components
import { HomeComponent } from './home-component/home.component';
import { AuthComponent } from './auth/auth.component';

// Services
import { AuthService } from './auth.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        AuthComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        AuthService
    ]
})
export class HomeModule { }
