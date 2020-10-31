import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-picture-card',
    templateUrl: './picture-card.component.html',
    styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {

    @Input() item: any;
    @Output() clickOnPicture: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    displayItem(): void {
        this.clickOnPicture.emit();

    }

}
