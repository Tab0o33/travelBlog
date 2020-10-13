import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class SummaryService {

    countriesSubject = new Subject<any[]>();

    private countries = [];
    private summaryCards = [];

    constructor(private http: HttpClient) { }

    emitCountriesSubject() {
        this.countriesSubject.next(this.countries.slice());
    }

    getSummaryCards() {
        this.http
            .get<any[]>('http://localhost:3000/api/summaryCard')
            .subscribe(
                (response) => {
                    this.summaryCards = response;
                    this.countries = this.mapAndOrderData(this.summaryCards);
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
                countries.push({ label: card.country, places: [] });
            }
            countries.find(c => c.label === card.country).places.push(card);
        }
        return countries;
    }

    postNewSummaryCard(cardInfo: any, image: File) {
        const cardDate = new FormData();
        cardDate.append('summaryCard', JSON.stringify(cardInfo));
        cardDate.append('image', image, cardInfo.title);
        return this.http.post('http://localhost:3000/api/summaryCard',
            cardDate,
            { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjgwYzA3OTgzZDI5ODY0MmM4NTBhYmQiLCJpYXQiOjE2MDI1ODkzNDgsImV4cCI6MTYwMjY3NTc0OH0.HWuJyszcFPNEa3Hz1tAynFY1Bs7OcOrd5-x8QvG7Mzc' } }
        );
    }

}
