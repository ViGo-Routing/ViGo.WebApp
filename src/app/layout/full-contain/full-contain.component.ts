import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay, fromEvent, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-full-contain',
  templateUrl: './full-contain.component.html',
  styleUrls: ['./full-contain.component.css']
})
export class FullContainComponent {
  ngOnInit(): void {
  }
  title = 'project';
  showFiller = false;
  @ViewChild('drawer') snav:any;
  mobileQuery: MediaQueryList;
  isExpanded: boolean = true;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1084px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



	/**
	 * This method is use to open side nav on mobile view
	 */
  openSideNav() {
    if (this.mobileQuery.matches) {
      this.isExpanded = true;
      this.snav.opened = true;
    }
  }

}

