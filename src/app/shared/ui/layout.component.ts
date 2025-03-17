import { Component } from '@angular/core';
import { AuthStateService } from '../data-access/auth-state.service';
import { RouterOutlet, Router } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterOutlet, NgxSonnerToaster],
  template: `
    <div class="flex justify-end p-4">
      <button
        class="bg-red-500 text-white border-none px-4 py-2 text-lg cursor-pointer rounded transition duration-300 ease-in-out hover:bg-red-700"
        (click)="logout()"
      >
        Logout
      </button>
    </div>
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
