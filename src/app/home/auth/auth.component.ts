import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    isAuth: boolean;
    signinForm: FormGroup;
    badAuthent = false;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.isAuth = this.authService.isLoggedIn();
        this.initForm();
    }

    initForm(): void {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        const email = this.signinForm.get('email').value;
        const password = this.signinForm.get('password').value;

        this.authService.login(email, password).subscribe(
            () => {
                this.isAuth = true;
                this.badAuthent = false;
            },
            (error) => {
                this.badAuthent = true;
            }
        );
    }

    logout(): void {
        this.authService.logout();
    }

}
