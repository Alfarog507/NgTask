import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
})
export default class TableComponent {
  task = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      status: false,
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      status: false,
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      status: false,
    },
    {
      id: 4,
      name: 'Task 4',
      description: 'Description 4',
      status: false,
    },
  ];

  toggleStatus(task: any) {
    task.status = !task.status;
  }
}
