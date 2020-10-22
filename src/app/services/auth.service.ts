import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuth = false;

    token: string;
    userId: string;

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        const callAPI = this.http.post('http://localhost:3000/api/auth/login', { email, password });
        callAPI.subscribe(
            (authData: { token: string, userId: string }) => {
                this.token = authData.token;
                this.userId = authData.userId;
                this.isAuth = true;
                this.setSession(authData);
            }
        );
        return callAPI;
    }

    private setSession(authResult) {
        localStorage.setItem('id_token', `Bearer ${authResult.token}`);
    }

    private hasToken() {
        const storedToken = localStorage.getItem('id_token');
        this.token = storedToken;
        return !!storedToken;
    }

    private tokenExpired() {
        if (!this.token) {
            return true;
        }
        const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
        return (Math.floor(new Date().getTime() / 1000)) >= expiry;
    }

    public isLoggedIn() {
        return this.hasToken() && !this.tokenExpired();
    }

    logout() {
        localStorage.removeItem('id_token');
        location.reload();
    }
}
