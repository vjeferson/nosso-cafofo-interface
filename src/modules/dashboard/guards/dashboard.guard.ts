import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioLogadoService } from '@common/services';

@Injectable()
export class DashboardGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _usuarioLogado: UsuarioLogadoService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._usuarioLogado.isLogado()) {
            return true;
        }
        this._router.navigate(['/auth/login']);
        return false;
    }
}
