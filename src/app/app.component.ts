import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('body') body: ElementRef;

    bodyWidth: number;
    sideBarOpen = false;
    containerleft = true;
    toggle = false;

    constructor(public notificationService: NotificationService) { }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.bodyWidth = this.body.nativeElement.offsetWidth;
            if (this.bodyWidth > 991) {
                this.sideBarOpen = true;
                this.containerleft = false;
            } else {
                this.sideBarOpen = false;
                this.containerleft = true;
            }
        }, 10);
    }

    toggleSideBar(): void {
        this.bodyWidth = this.body.nativeElement.offsetWidth;
        this.toggle = !this.toggle;
        this.handleStateMachine();
    }

    resize(): void {
        this.bodyWidth = this.body.nativeElement.offsetWidth;
        this.handleStateMachine();
    }

    private handleStateMachine(): void {
        if (this.bodyWidth > 991 && this.toggle) {
            this.sideBarOpen = false;
            this.containerleft = true;
        } else if (this.bodyWidth > 991 && !this.toggle) {
            this.sideBarOpen = true;
            this.containerleft = false;
        } else if (this.bodyWidth <= 991 && this.toggle) {
            this.sideBarOpen = true;
            this.containerleft = true;
        } else {
            this.sideBarOpen = false;
            this.containerleft = true;
        }
    }
}
