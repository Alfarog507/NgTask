import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group({
    name: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control('', Validators.required),
    status: this._formBuilder.control('In Progress', Validators.required),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
