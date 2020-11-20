// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules externes

// Components
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
        AuthComponent
    ],
    exports: [
        AuthComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }
