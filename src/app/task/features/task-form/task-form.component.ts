import { Component, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  providers: [TaskService],
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _taskService = inject(TaskService);

  loading = new BehaviorSubject<boolean>(false);

  idTask = input.required<string>();

  form = this._formBuilder.group({
    name: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control('', Validators.required),
    status: this._formBuilder.control(false, Validators.required),
  });

  constructor() {
    effect(() => {
      // Cargar datos si existe un parámetro 'id'
      const taskId = this.idTask();
      if (taskId) {
        this.loadTask(taskId);
      }
    });
  }

  // Método para enviar el formulario
  async onSubmit() {
    if (this.form.valid) {
      const taskId = this.idTask();
      if (taskId) {
        this.onUpdate();
      } else {
        this.onCreate();
      }
    }
  }

  async onCreate() {
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

  async onUpdate() {
    if (this.form.valid) {
      try {
        this.loading.next(true);
        const taskId = this.idTask();
        if (!taskId) {
          console.error('Task ID is undefined.');
          toast.error('Failed to update task. Please try again.');
          return;
        }

        const updatedTask = { id: taskId, ...this.form.value } as Task;
        await this._taskService.update(updatedTask);
        toast.success('Task updated successfully!');
        this.form.reset();
        this._router.navigate(['/task']);
      } catch (error) {
        console.error(error);
        toast.error('Failed to update task. Please try again.');
      } finally {
        this.loading.next(false);
      }
    }
  }

  // Método para cargar una tarea
  private async loadTask(id: string) {
    try {
      this.loading.next(true);
      const task = await this._taskService.getById(id); // Suponiendo que tienes un método getById
      if (task) {
        const taskData = task.data() as
          | { name: string; description: string; status: boolean }
          | undefined;
        if (taskData) {
          this.form.patchValue(taskData); // Rellenar el formulario con los datos de la tarea
        } else {
          console.error('Task data is undefined.');
          toast.error('Failed to load task data.');
        }
        toast.success('Task data loaded successfully.');
      } else {
        console.error('Task data is undefined.');
        toast.error('Failed to load task data.');
      }
    } catch (error) {
      console.error('Error loading task:', error);
      toast.error('Failed to load task data.');
    } finally {
      this.loading.next(false);
    }
  }
}
