import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { SummaryService } from '../services/summary.service';

@Component({
    selector: 'app-edit-summary-card',
    templateUrl: './edit-summary-card.component.html',
    styleUrls: ['./edit-summary-card.component.scss']
})
export class EditSummaryCardComponent implements OnInit {

    id: string;
    cardToEdit: any;
    APICallFailed: string;

    constructor(
        private summaryService: SummaryService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params.id;
        this.summaryService.getOneCard$(this.id).subscribe(
            (card: any) => {
                this.cardToEdit = card;
                this.APICallFailed = 'noFail';
            },
            (err) => {
                this.APICallFailed = 'oneCard';
            },
        );
    }

    // TODO : ne pas perde l'image lors de l'édition
    editCard(event: any) {
        const editSummaryCard$ = this.summaryService.editSummaryCard(this.id, event.values, event.imageFile);
        editSummaryCard$.subscribe(
            () => {
                this.router.navigate(['/summary']);
                this.notificationService.popToastSuccess();
            },
            () => {
                this.notificationService.popToastError();
            }
        );
    }

}
