import { Component, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  isRequired,
  isEmail,
  isMinLength,
  passwordsMatch,
} from '../../utils/validators';
import { CommonModule } from '@angular/common';

interface SignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  terms: FormControl<boolean | null>;
}

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export default class SignUpComponent {
  private _formBuilder = inject(NonNullableFormBuilder);

  isRequired(field: 'email' | 'password' | 'confirmPassword') {
    return isRequired(field, this.signUpForm);
  }

  isEmail() {
    return isEmail('email', this.signUpForm);
  }

  isMinLength(field: 'password' | 'confirmPassword') {
    return isMinLength(field, this.signUpForm);
  }

  passwordsMatch() {
    return passwordsMatch(this.signUpForm);
  }

  signUpForm = this._formBuilder.group<SignUpForm>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    terms: this._formBuilder.control(false, Validators.requiredTrue),
  });

  onSubmit() {
    if (this.signUpForm.invalid) return;

    const { email, password, confirmPassword, terms } = this.signUpForm.value;
  }
}
