import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { Task } from '../../data-access/task.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './table.component.html',
})
export default class TableComponent {
  tasks = input.required<Task[]>();

  toggleStatus(task: any) {
    task.status = !task.status;
  }
}
