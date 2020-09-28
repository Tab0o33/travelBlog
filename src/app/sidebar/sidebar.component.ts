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
  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

  items = [
    { icon: 'home', label: 'Home' },
    { icon: 'menu_book', label: 'Sommaire' },
    { icon: 'public', label: 'Pays' },
    { icon: 'photo', label: 'Galerie' }
  ];

  constructor() { }

  toggleShowSideBar() {
    this.toggleSideBar.emit();
  }

}
