import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Router, RouterLink } from '@angular/router';
import TableComponent from '../../ui/table/table.component';
import { Task, TaskService } from '../../data-access/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterLink, CommonModule],
  templateUrl: './task-list.component.html',
  styles: ``,
  providers: [TaskService],
})
export default class TaskListComponent {
  private _authService = inject(AuthStateService);
  private _router = inject(Router);

  taskService = inject(TaskService);

  logout() {
    this._authService.logout();
    this._router.navigate(['/auth/sign-in']);
  }
}
