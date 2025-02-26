import { FormGroup } from '@angular/forms';

export const isRequired = (
  field: 'email' | 'password' | 'confirmPassword',
  form: FormGroup
) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('required');
};

export const isEmail = (field: 'email', form: FormGroup) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('email');
};

export const isMinLength = (
  field: 'password' | 'confirmPassword',
  form: FormGroup
) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('minlength');
};

export const passwordsMatch = (form: FormGroup) => {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');
  return (
    password &&
    confirmPassword &&
    password.touched &&
    confirmPassword.touched &&
    password.value === confirmPassword.value
  );
};
