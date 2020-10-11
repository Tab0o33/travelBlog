import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class SummaryService {

    countriesSubject = new Subject<any[]>();

    private countries = [];

    constructor(private http: HttpClient) { }

    emitCountriesSubject() {
        this.countriesSubject.next(this.countries.slice());
    }

    getSummaryCards() {
        this.http
            .get<any[]>('http://localhost:3000/api/summaryCard')
            .subscribe(
                (response) => {
                    this.countries = this.mapAndOrderData(response);
                    this.emitCountriesSubject();
                },
                (error) => {
                    console.log('Erreur ! : ', error);
                }
            );
    }

    mapAndOrderData(summaryCards: any[]): any[] {
        const countries = [];

        summaryCards.sort((a, b) => {
            return a.country[0] - b.country[0];
        });

        // TODO : sort by date

        for (const card of summaryCards) {
            if (!countries.find(c => c.label === card.country)) {
                countries.push({label: card.country, places: []});
            }
            countries.find(c => c.label === card.country).places.push(card);
        }
        return countries;
    }

}
