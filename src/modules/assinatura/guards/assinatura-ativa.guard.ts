import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { EnumTipoPerfil } from '@app/utils/enums';
import { UsuarioLogadoService } from '@common/services';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AssinaturaAtivaGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _usuarioLogado: UsuarioLogadoService,
        private readonly _toastService: ToastrService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._usuarioLogado.isLogado()) {
            if ((this._usuarioLogado.getDadosSession().usuario as IUsuarioAutenticado).tipoPerfil === EnumTipoPerfil.MoradorAdministrador) {
                return true;
            } else {
                this._toastService.info('Seu usuário não possui permissão para acessar esta página!',
                    'Acesso bloqueado', {
                    timeOut: 3000
                });
                this._router.navigate(['/']);
                return false;
            }
        }
        this._router.navigate(['/auth/login']);
        return false;
    }

}
