import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    @Input() comment: any;
    @Output() addSubComment = new EventEmitter<void>();

    displaySubComments = false;

    constructor() { }

    ngOnInit(): void {
    }

    getFormattedDate(): string {
        const dateJS = new Date(this.comment.postDate);
        if (dateJS instanceof Date) {
            const day = dateJS.getDate() < 10 ? '0' + dateJS.getDate() : dateJS.getDate();
            const month = dateJS.getMonth() + 1 < 10 ? '0' + (dateJS.getMonth() + 1) : dateJS.getMonth() + 1;
            const year = dateJS.getFullYear();
            return `${day}/${month}/${year}`;
        } else {
            return 'undefined';
        }
    }

}
