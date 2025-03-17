import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';
import { LayoutComponent } from './shared/ui/layout.component';

export const routes: Routes = [
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [privateGuard()],
    children: [
      {
        path: 'task',
        loadChildren: () => import('./task/features/task.routes'),
      },
      // otras rutas hijas pueden ir aquí
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/sign-up',
  },
];
