import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { catchError, finalize, throwError } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService)

  loaderService.showLoader()
  return next(req).pipe(
    finalize(() => {
      loaderService.hideLoader()
    }),
    catchError((error: HttpErrorResponse) => {
      loaderService.hideLoader();
      return throwError(() => error)
    })
  )
};
