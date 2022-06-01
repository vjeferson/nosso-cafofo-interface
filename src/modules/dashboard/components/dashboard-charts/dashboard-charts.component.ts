import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EstatisticasService } from '@app/api/services';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { EnumTipoPerfil } from '@app/utils/enums';
import { UsuarioLogadoService } from '@common/services';

@Component({
    selector: 'sb-dashboard-charts',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-charts.component.html',
    styleUrls: ['dashboard-charts.component.scss'],
})
export class DashboardChartsComponent implements OnInit {
    public administradorNossoCafofo: boolean = false;
    private usuarioLogado: IUsuarioAutenticado;
    public mapEstatisticasCards: { [key: string]: any } = {};

    constructor(
        private readonly _usuarioLogadoService: UsuarioLogadoService,
        private readonly _estatisticasService: EstatisticasService,
        private readonly _changes: ChangeDetectorRef
    ) {
        this.usuarioLogado = this._usuarioLogadoService.getDadosSession().usuario;
        this.administradorNossoCafofo = this.usuarioLogado.tipoPerfil === EnumTipoPerfil.AdministradorNossoCafofo;
    }

    ngOnInit() {}
}
