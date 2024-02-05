import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from '../services/account.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private accountService = inject(AccountService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({  //haciendo take 1, solo nos suscribimos para 1 emisión (no hace falta desuscribirse)
      next: user => {
        if(user){
          req = req.clone({
            setHeaders:{
              Authorization: `Bearer ${user.token}`
            }
          })
        }
      }
    })

    return next.handle(req);
  }

}

