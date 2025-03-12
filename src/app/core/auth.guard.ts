import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthStateService } from '../shared/data-access/auth-state.service';
import { map } from 'rxjs';

export const privateGuard = (): CanActivateChildFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
    return authState.authState.pipe(
      map((user) => {
        if (!user) {
          router.navigate(['/auth/sign-in']);
          return false;
        }

        return true;
      })
    );
  };
};

export const publicGuard = (): CanActivateChildFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
    return authState.authState.pipe(
      map((user) => {
        if (user) {
          router.navigate(['/task']);
          return false;
        }

        return true;
      })
    );
  };
};
