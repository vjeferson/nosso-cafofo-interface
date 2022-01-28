import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { EnumTipoPerfil } from '@app/utils/enums';
import { UsuarioLogadoService } from '@common/services';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public administradorNossoCafofo: boolean = false;
    private usuarioLogado: IUsuarioAutenticado;

    constructor(
        private readonly _usuarioLogadoService: UsuarioLogadoService
    ) {
        this.usuarioLogado = this._usuarioLogadoService.getDadosSession().usuario;
        this.administradorNossoCafofo = this.usuarioLogado.tipoPerfil === EnumTipoPerfil.AdministradorNossoCafofo;
    }
    ngOnInit() { }
}
