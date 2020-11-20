import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { NotificationService } from '../services/notification.service';
import { Properties } from '../services/properties.service';

@Injectable()
export class SummaryService {

    countriesSubject = new Subject<any[]>();

    private countries = [];
    private summaryCards = [];

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private notificationService: NotificationService,
        private properties: Properties
    ) { }

    emitCountriesSubject(): void {
        this.countriesSubject.next(this.countries.slice());
    }

    getOneCard$(id: string): Observable<any> {
        return this.http.get<any>(`http://${this.properties.hostAPI}/api/summaryCard/${id}`);
    }

    getSummaryCards(): void {
        this.http
            .get<any[]>(`http://${this.properties.hostAPI}/api/summaryCard`)
            .subscribe(
                (response) => {
                    this.summaryCards = response;
                    this.countries = this.mapAndOrderData(this.summaryCards);
                    this.emitCountriesSubject();
                },
                () => {
                    this.notificationService.popToastError();
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

    postNewSummaryCard(cardInfo: any, image: File): Observable<any> {
        const token = this.authService.token;
        const cardDate = new FormData();
        cardDate.append('summaryCard', JSON.stringify(cardInfo));
        cardDate.append('image', image, cardInfo.title);
        return this.http.post(`http://${this.properties.hostAPI}/api/summaryCard`,
            cardDate,
            { headers: { Authorization: token } }
        );
    }

    editSummaryCard(cardId: string, cardInfo: any, image: File): Observable<any> {
        const token = this.authService.token;
        const cardDate = new FormData();
        cardDate.append('summaryCard', JSON.stringify(cardInfo));
        cardDate.append('image', image, cardInfo.title);
        return this.http.put(`http://${this.properties.hostAPI}/api/summaryCard/${cardId}`,
            cardDate,
            { headers: { Authorization: token } }
        );
    }

    deleteSummaryCard(cardId: string): Observable<any> {
        const token = this.authService.token;
        const apiCall = this.http.delete(`http://${this.properties.hostAPI}/api/summaryCard/${cardId}`,
            { headers: { Authorization: token } }
        );
        apiCall.subscribe(
            () => {
                this.summaryCards = this.summaryCards.filter(card => card.id !== cardId);
                this.countries = this.mapAndOrderData(this.summaryCards);
                this.emitCountriesSubject();
            }
        );
        return apiCall;
    }


}
