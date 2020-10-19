import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class SummaryService {

    countriesSubject = new Subject<any[]>();

    private countries = [];
    private summaryCards = [];

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    emitCountriesSubject() {
        this.countriesSubject.next(this.countries.slice());
    }

    getOneCard$(id: string) {
        return this.http.get<any>(`http://localhost:3000/api/summaryCard/${id}`);
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
        const token = this.authService.token;
        const cardDate = new FormData();
        cardDate.append('summaryCard', JSON.stringify(cardInfo));
        cardDate.append('image', image, cardInfo.title);
        return this.http.post('http://localhost:3000/api/summaryCard',
            cardDate,
            { headers: { Authorization: token } }
        );
    }

    editSummaryCard(cardId: string, cardInfo: any, image: File) {
        const token = this.authService.token;
        const cardDate = new FormData();
        cardDate.append('summaryCard', JSON.stringify(cardInfo));
        cardDate.append('image', image, cardInfo.title);
        return this.http.put(`http://localhost:3000/api/summaryCard/${cardId}`,
            cardDate,
            { headers: { Authorization: token } }
        );
    }

    deleteSummaryCard(cardId: string): Observable<any> {
        const token = this.authService.token;
        const apiCall = this.http.delete(`http://localhost:3000/api/summaryCard/${cardId}`,
            { headers: { Authorization: token } }
        );
        apiCall.subscribe(
            () => {
                this.summaryCards = this.summaryCards.filter(card => card._id !== cardId);
                this.countries = this.mapAndOrderData(this.summaryCards);
                this.emitCountriesSubject();
            },
            (err) => {
                console.log(err);
            },
        );
        return apiCall;
    }

}
