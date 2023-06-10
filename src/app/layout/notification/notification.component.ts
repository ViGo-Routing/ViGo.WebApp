import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  disableSelect = new FormControl(false);
  version: string = '';
  constructor(private router: Router) {
    this.version = this.router.url.includes('v1') ? 'Version 1' : 'Version 2';
  }
  options = [
    { key: 'v1', value: 'Version 1' },
    { key: 'v2', value: 'Version 2' },
  ];
  ngOnInit(): void { }
  Logout() {
    localStorage.setItem('token', ' ');
    this.router.navigate(['/login']);
  }
  getVersion(key: string) {
    // const url: string = this.router.url;
    // const version: string = url.slice(1, 3);
    // const newUrl = url.replace(version, key);
    window.location.replace(`/${key}/home`);
    //this.router.navigate([`/${key}/device`]);
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
