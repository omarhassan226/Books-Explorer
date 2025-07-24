import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const clonedRequest = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.status === 401) {
          errorMessage = 'Unauthorized access. Please log in again.';
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else if (error.status === 404) {
          errorMessage = 'The requested resource was not found.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = 'An error occurred. Please try again later.';
        }

        this.alertService.showErrorMessage(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
