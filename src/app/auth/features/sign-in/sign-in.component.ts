import { Component, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isRequired, isEmail, isMinLength } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

interface SignInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.signInForm);
  }

  isEmail() {
    return isEmail('email', this.signInForm);
  }

  isMinLength(field: 'password') {
    return isMinLength(field, this.signInForm);
  }

  signInForm = this._formBuilder.group<SignInForm>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  async onSubmit() {
    if (this.signInForm.invalid) return;

    try {
      const { email, password } = this.signInForm.value;

      if (!email || !password) {
        return;
      }

      await this._authService.signIn({ email, password });
      toast.success('Signed in successfully.');
      this._router.navigate(['/task']);
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  }
}
