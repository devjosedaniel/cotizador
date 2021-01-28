import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private usuarioSrv: UsuarioService,
    private storageSrv: StorageService
  ) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const token: string = localStorage.getItem('token');
    const token = this.storageSrv.getJsonValue('token');
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.usuarioSrv.removerDataUsuario();
          this.notification.warning('Autenticación', err.error.mensaje);
          this.router.navigateByUrl('auth');
        }
        if (err.status === 0) {
          this.notification.error(
            'Error en Servidor',
            'Hubo un error al intentar conectarse con el servidor.'
          );
        }
        return throwError(err);
      })
    );
  }
}
