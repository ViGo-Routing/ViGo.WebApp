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
      title: 'Quản lý tuyến đường',
      icon: 'fas fa-route',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'route',
      display: false,
    },
    {
      url: 'booking',
      title: 'Quản lý đặt trước',
      icon: 'fas fa-calendar-alt',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'booking',
      display: false,
    },
    {
      url: 'user',
      title: 'Quản lý người dùng',
      icon: 'fas fa-user',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'user',
      display: false,
    },
    {
      url: 'vehicle',
      title: 'Quản lý phương tiện',
      icon: 'fas fa-motorcycle',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'vehicle',
      display: false,
    },
    {
      url: 'promotion',
      title: 'Quản lý khuyến mãi',
      icon: 'fas fa-percent',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'promotion',
      display: false,
    },
    {
      url: 'report',
      title: 'Quản lý báo cáo',
      icon: 'fas fa-flag',
      img: '../assets/img/device_page.png',
      active: false,
      type: 'link',
      name: 'report',
      display: false,
    },

  ],
};