import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { EnumTipoPerfil } from '@app/utils/enums';
import { UsuarioLogadoService } from '@common/services';

@Injectable()
export class PlanosGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _usuarioLogado: UsuarioLogadoService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._usuarioLogado.isLogado() && (this._usuarioLogado.getDadosSession().usuario as IUsuarioAutenticado).tipoPerfil === EnumTipoPerfil.AdministradorNossoCafofo) {
            return true;
        }
        this._router.navigate(['/auth/login']);
        return false;
    }
}
