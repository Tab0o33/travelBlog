import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../home/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SummaryService } from '../summary.service';

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
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
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

    showDeleteModal(card: any): void {
        this.selectedCard = card;
        this.isModalOpen = true;
    }

    deleteCard(card: any): void {
        this.summaryService.deleteSummaryCard(card._id).subscribe(
            () => {
                this.router.navigate(['/summary']);
                this.notificationService.popToastSuccess();
            },
            () => {
                this.notificationService.popToastError();
            }
        );
    }

    addCard(): void {
        this.router.navigate([`summary/new-card`]);
    }

    ngOnDestroy(): void {
        this.countriesSubscription.unsubscribe();
    }

}
