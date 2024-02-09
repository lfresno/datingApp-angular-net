import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor{

  private busyService = inject(BusyService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyService.busy();

    return next.handle(req).pipe(
      delay(1000),    //se usa como simulación
      finalize(() => {
        this.busyService.idle()
      })
    )
  }

}

