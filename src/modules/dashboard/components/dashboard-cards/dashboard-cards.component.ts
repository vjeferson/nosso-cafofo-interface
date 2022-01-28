import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EstatisticasService } from '@app/api/services';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { EnumTipoPerfil } from '@app/utils/enums';
import { UsuarioLogadoService } from '@common/services';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
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

    ngOnInit() {
        if (this.administradorNossoCafofo) {
            this.mapEstatisticasCards['total-assinantes'] = false;
            this._estatisticasService.getEstatisticasCountAssinantes().subscribe(
                (res: any) => {
                    if (res) {
                        this.mapEstatisticasCards['total-assinantes'] = res;
                    } else {
                        this.mapEstatisticasCards['total-assinantes'] = { assinantes: 0 };
                    }
                    this._changes.detectChanges();
                }
            );
        }
    }

}
