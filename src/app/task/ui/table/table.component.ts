import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Task, TaskService } from '../../data-access/task.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './table.component.html',
})
export default class TableComponent {
  tasks = input.required<Task[]>();
  private _taskService = inject(TaskService);
  private _router = inject(Router);
  loading = new BehaviorSubject<boolean>(false);

  toggleStatus(task: any) {
    const newStatus = !task.status;
    this._taskService.updateStatus(task.id, newStatus);
  }

  async deleteTask(id: string) {
    console.log('Delete task with id:', id);
    this.loading.next(true);
    try {
      await this._taskService.delete(id);
      console.log('Task deleted');
      toast.success('Task deleted');
      this._router.navigate(['/task']);
    } catch (error) {
      console.error(error);
      toast.error('Error deleting task');
    } finally {
      this.loading.next(false);
    }
  }
}
