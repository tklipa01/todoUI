import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = localStorage.getItem('access_token');
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${authHeader}`)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}