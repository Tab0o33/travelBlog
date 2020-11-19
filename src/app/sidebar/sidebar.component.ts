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
        {
            icon: 'public',
            label: 'Pays',
            link: null,
            collapse: true,
            toggle: false,
            subparts: [
                {
                    label: 'colombie',
                    link: 'countries/colombie/1'
                },
                {
                    label: 'équateur',
                    link: 'countries/ecuador/1'
                }
            ]
        },
        { icon: 'photo', label: 'Galerie', link: 'gallery' }
    ];

    selectedItemColapse: any;

    constructor() { }

    toggleList(item: any) {
        item.toggle = !item.toggle;
        if (!this.sideBarOpen) {
            this.toggleSideBar.emit();
        }
    }

    toggleShowSideBar(): void {
        if (this.sideBarOpen) {
            this.closeEachToggleableItem();
        }
        this.toggleSideBar.emit();

    }

    closeEachToggleableItem() {
        this.items.forEach(item => {
            if (item.hasOwnProperty('toggle')) {
                item.toggle = false;
            }
        });
    }

    closeCollapseTopBar() {
        this.selectedItemColapse = undefined;
    }
}
