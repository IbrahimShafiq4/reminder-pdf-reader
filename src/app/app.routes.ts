import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
const token = localStorage.getItem('userToken')
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reminder',
  },
  {
    path: 'reminder',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./reminder/reminder.module').then((m) => m.ReminderModule),
    title: 'Schedule Reminder',
    data: {
      breadcrumb: 'Reminder',
      animation: 'ReminderPage',
    },
  },
  {
    path: 'pdf-reader',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pdf-reader/pdf-reader.module').then((m) => m.PdfReaderModule),
    title: 'PDF Reader',
    data: {
      breadcrumb: 'PDF Reader',
      animation: 'PdfReaderPage',
    },
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    title: 'Login'
  },
  {
    path: '**',
    redirectTo: 'reminder',
    pathMatch: 'full',
  },
];
