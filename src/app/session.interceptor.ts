import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve session information (e.g., token) from a service or storage
    console.log('Intercepting request....');
    const token = sessionStorage.getItem('userSession'); // Example: stored in localStorage
    
    // Clone the request and add the token to the headers
    let modifiedReq = req;
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          'userSession': `${token}`, // Add your header key-value pair
        },
      });
    }

    // Pass the modified request to the next handler
    return next.handle(modifiedReq);
  }
}
