import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SummaryService } from '../services/summary.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

    countries: any = [];
    countriesSubscription: Subscription;

    isAuth: boolean;
    
    isModalOpen = false;
    selectedCard: any;

    constructor(
        private summaryService: SummaryService,
        private authService: AuthService
    ) { }


    ngOnInit(): void {
        this.isAuth = this.authService.isLoggedIn();
        this.countriesSubscription = this.summaryService.countriesSubject.subscribe(
            (countries: any[]) => {
                this.countries = countries;
            }
        );
        this.summaryService.getSummaryCards();
    }

    selctPlaceAndOpenModal(card: any) {
        this.selectedCard = card;
        this.isModalOpen = true;
    }

    deleteCard(card: any) {
        this.summaryService.deleteSummaryCard(card._id);
    }

    ngOnDestroy() {
        this.countriesSubscription.unsubscribe();
    }

}
