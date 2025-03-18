import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _taskService = inject(TaskService);

  loading = new BehaviorSubject<boolean>(false);

  form = this._formBuilder.group({
    name: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control('', Validators.required),
    status: this._formBuilder.control(false, Validators.required),
  });

  async onSubmit() {
    if (this.form.valid) {
      try {
        this.loading.next(true);
        await this._taskService.create(this.form.value as TaskCreate);
        toast.success('Task created successfully!');
        this.form.reset();
        this._router.navigate(['/task']);
      } catch (error) {
        console.error(error);
        toast.error('Failed to create task. Please try again.');
      } finally {
        this.loading.next(false);
      }
    }
  }
}
