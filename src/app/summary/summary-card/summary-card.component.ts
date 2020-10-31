import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-summary-card',
    templateUrl: './summary-card.component.html',
    styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

    @Input() place: any;
    @Input() isAuth: boolean;
    @Output() clickOnDeleteButton: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    editCard(): void {
        this.router.navigate([`summary/edit-card/${this.place.id}`]);
    }

    showDeleteModal(): void {
        this.clickOnDeleteButton.emit();
    }

}
