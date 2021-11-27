import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UsuarioLogadoService } from './services';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        private readonly _usuarioLogado: UsuarioLogadoService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(environment.apiUrl) && this._usuarioLogado.isLogado()) {
            req = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${this._usuarioLogado.getDadosSession().token}`
                }
            });
        }
        return next.handle(req);
    }

}
