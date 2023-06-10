
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuNav, menuV1, NavLink } from 'src/app/shared/router';

@Component({
  selector: 'app-siderbars',
  templateUrl: './siderbars.component.html',
  styleUrls: ['./siderbars.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '20%' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('detailExpandChild', [
      state('collapsedChild', style({ height: '20%' })),
      state('expandedChild', style({ height: '*' })),
      transition(
        'expandedChild <=> collapsedChild',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SiderbarsComponent implements OnInit {
  toggleNavbar = true;
  navLinks: NavLink[];
  scrolled: boolean = false;
  current: any;
  navActive: any;
  arr: NavLink[] = [];
  public expanded: boolean = false;
  public expandedChild: boolean = false;
  expandedElement: NavLink | null | undefined;
  expandedChildElement: NavLink | null | undefined;
  listCategories: any;
  constructor(private route: ActivatedRoute, private router: Router) {

    const url: string = this.router.url;
    const navs: MenuNav = menuV1;
    this.navLinks = navs.child;
  }
  active(router: string) {
    this.current = this.route.snapshot.routeConfig?.path;
    if (this.current == router) {
      return true;
    }
    return false;
  }
  ngOnInit(): void {
    const navs: any = localStorage.getItem('navLinks');
    this.navLinks = JSON.parse(navs);

    this.navLinks.forEach((element) => {
      if (element.display) {
        this.arr.push(element);
      }
    });
    console.log('navLinks: ' + this.navLinks);

  }
  isActive(currentRoute: any[], exact = true): boolean {
    return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
  }
  onItemSelected(item: any) {
    console.log(item)
    if (!item.active) {
      this.navLinks.forEach((a: any) => {
        if (this.navLinks.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) {
            return false;
          }
          b.children.forEach((c: any) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
            if (!c.children) {
              return false;
            }
            return;
          });
          return;
        });
        return;
      });
    }
    item.active = !item.active;
  }
  drop(value: any) {
    console.log("drop sidebar: ", value);

  }
  checkDrop(value: any) {
    console.log("drop sidebar: ", value);
  }
}
