import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  const clonedRequest = token ? req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }) : req;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
      let errorMessage = '';
      if (error.status === 401) {
        errorMessage = 'Unauthorized access. Please log in again.';
        localStorage.removeItem('token');
        router.navigate(['/login']);
      } else if (error.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (error.status === 500) {
        errorMessage = 'An error occurred on the server. Please try again later.';
      } else {
        errorMessage = `An error occurred: ${error.message}`;
      }

      toastr.error(errorMessage);
      return throwError(() => error);
    })
  );
};
