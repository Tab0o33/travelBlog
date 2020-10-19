import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryService } from '../services/summary.service';

@Component({
    selector: 'app-add-summary-card',
    templateUrl: './add-summary-card.component.html',
    styleUrls: ['./add-summary-card.component.scss']
})
export class AddSummaryCardComponent implements OnInit {

    constructor(
        private summaryService: SummaryService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    addNewCard(event: any) {
        event.values.firstDay = this.mapDateInString(event.values.firstDay);
        event.values.lastDay = this.mapDateInString(event.values.lastDay);

        const postNewSummaryCard$ = this.summaryService.postNewSummaryCard(event.values, event.imageFile);
        postNewSummaryCard$.subscribe(
            () => {
                this.router.navigate(['/summary']);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    private mapDateInString(travelDate: Date) {
        const dd = String(travelDate.getDate()).padStart(2, '0');
        const mm = String(travelDate.getMonth() + 1).padStart(2, '0');
        const yyyy = travelDate.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }
}
