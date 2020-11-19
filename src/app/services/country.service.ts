import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../home/auth.service';
import { Properties } from './properties.service';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private properties: Properties
    ) { }

    getCountries$(): Observable<{ label: string, position: number }[]> {
        const token = this.authService.token;
        return this.http.get<{ label: string, position: number }[]>(`http://${this.properties.hostAPI}/api/country`,
            { headers: { Authorization: token } }
        );
    }

    addCountry$(newCountry: { label: string, position: number }): Observable<any> {
        const token = this.authService.token;
        return this.http.post(`http://${this.properties.hostAPI}/api/country`,
            newCountry,
            { headers: { Authorization: token } }
        );
    }

}
