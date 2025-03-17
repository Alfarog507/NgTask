import { Component } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Router } from '@angular/router';
import TableComponent from '../../ui/table/table.component';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent],
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
