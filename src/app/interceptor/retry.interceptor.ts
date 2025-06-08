import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { retryWhen, catchError, mergeMap, take } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let retries = 0;
    console.log('Iniciando petición a:', request.url);
    
    return next.handle(request).pipe(
      retryWhen(errors => 
        errors.pipe(
          mergeMap((error: HttpErrorResponse) => {
            console.log('Error recibido:', error.status, error.statusText);
            if (retries < this.MAX_RETRIES && 
                (error.status === 0 || error.status === 404 || error.status >= 500)) {
              retries++;
              console.log(`Reintentando petición (${retries}/${this.MAX_RETRIES}) debido a error ${error.status}...`);
              return timer(this.RETRY_DELAY * retries);
            }
            console.log('No se reintentará más la petición');
            return throwError(() => error);
          }),
          take(this.MAX_RETRIES)
        )
      ),
      catchError((error: HttpErrorResponse) => {
        console.error('Error final después de reintentos:', error.status, error.statusText);
        return throwError(() => error);
      })
    );
  }
}