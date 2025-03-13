import { Component } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styles: ``,
})
export default class TaskListComponent {
  constructor(private authService: AuthStateService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}
