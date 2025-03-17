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
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface SignInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    GoogleButtonComponent,
  ],
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
      if ((error as Error).message === 'User not found') {
        toast.error(
          'Account does not exist. Please check your email and try again.'
        );
      } else {
        toast.error('An error occurred. Please try again later.');
      }
      this.signInForm.reset();
    }
  }

  async signInWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Signed in successfully.');
      this._router.navigate(['/task']);
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  }
}
