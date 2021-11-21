import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioLogadoService } from '@common/services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _usuarioLogado: UsuarioLogadoService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        if (this._usuarioLogado.isLogado()) {
            this._router.navigate(['/dashboard']);
        }

        return true;
    }
}
