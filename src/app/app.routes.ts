import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'screen2',
    loadComponent: () => import('./screen2/screen2.page').then( m => m.Screen2Page)
  },
  {
    path: 'screen3',
    loadComponent: () => import('./screen3/screen3.page').then( m => m.Screen3Page)
  },
  {
    path: 'screen4',
    loadComponent: () => import('./screen4/screen4.page').then( m => m.Screen4Page)
  },
  {
    path: 'screen5',
    loadComponent: () => import('./screen5/screen5.page').then( m => m.Screen5Page)
  },
  {
    path: 'screen6',
    loadComponent: () => import('./screen6/screen6.page').then( m => m.Screen6Page)
  },
  {
    path: 'screen7',
    loadComponent: () => import('./screen7/screen7.page').then( m => m.Screen7Page)
  },
  {
    path: 'screen8',
    loadComponent: () => import('./screen8/screen8.page').then( m => m.Screen8Page)
  },
  {
    path: 'modal',
    loadComponent: () => import('./modal/modal.page').then( m => m.ModalPage)
  },
  {
    path: 'page1',
    loadComponent: () => import('./page1/page1.page').then( m => m.Page1Page)
  },
];
