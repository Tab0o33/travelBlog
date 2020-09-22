import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // @Output() sideBar: EventEmitter<any> = new EventEmitter();

  showSideBar = true;
  alreadyToggled = false;

  constructor() { }

  ngOnInit() {
  }

  toggleShowSideBar() {
    this.alreadyToggled = true;
    this.showSideBar = !this.showSideBar;
    // this.sideBar.emit();
  }

}
