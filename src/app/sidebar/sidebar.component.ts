import { Input } from '@angular/core';
import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    @ViewChild('sidebar') sidebar: ElementRef;

    @Input() sideBarOpen: boolean;
    @Input() isPhoneScreen: boolean;
    @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

    items = [
        { icon: 'home', label: 'Home', link: 'home' },
        { icon: 'menu_book', label: 'Sommaire', link: 'summary' },
        { icon: 'public', label: 'Pays', link: 'countries' },
        { icon: 'photo', label: 'Galerie', link: 'gallery' }
    ];

    constructor() { }

    toggleShowSideBar(): void {
        this.toggleSideBar.emit();
    }

}
