import { Input } from '@angular/core';
import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('sidebar') sidebar: ElementRef;

  @Input() sideBarOpen: boolean;
  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  toggleShowSideBar() {
    this.toggleSideBar.emit();
  }

}
