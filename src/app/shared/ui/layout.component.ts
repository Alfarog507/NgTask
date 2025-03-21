import { Component } from '@angular/core';
import { AuthStateService } from '../data-access/auth-state.service';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterOutlet, NgxSonnerToaster, RouterLink],
  template: `
    <header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4">
      <nav class="flex items-center justify-between h-full">
        <a class="text-2xl font-bold cursor-pointer" routerLink="/task"
          >Ng Task</a
        >
        <button
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
          (click)="logout()"
        >
          Logout
        </button>
      </nav>
    </header>
    <router-outlet></router-outlet>
    <!-- Aquí se renderizan las rutas hijas -->
    <ngx-sonner-toaster></ngx-sonner-toaster>
    <!-- El toaster puede ir aquí si es global -->
  `,
})
export class LayoutComponent {
  constructor(private authService: AuthStateService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}
