import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
export interface MenuNav {
  version: string;
  child: NavLink[];
}
export interface NavLink {
  url?: string;
  title: string;
  icon?: string;
  img?: string;
  active?: boolean;
  name: string;
  display: boolean;
  type?: string
  children?: any[];
}
export const menuV1: MenuNav = {
  version: 'admin',
  child: [
    {
      url: 'route',
      title: 'Route',
      icon: 'fas fa-route',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'route',
      display: false,
    },
    {
      url: 'booking',
      title: 'Booking',
      icon: 'fas fa-calendar-alt',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'booking',
      display: false,
    },
    {
      url: 'user',
      title: 'user',
      icon: 'fas fa-user',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'user',
      display: false,
    },

  ],
};