import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssinaturasService, PlanosService } from '@app/api/services';
import { IAssinaturaAtiva } from '@app/models/assinatura-ativa-interface';
import { IPlanoResult } from '@app/models/plano-result-interface';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { mapDescricaoTiposPlanos, mapTiposPlanos } from '@app/utils/consts';
import { EnumTipoPlano } from '@app/utils/enums';
import { UsuarioLogadoService } from '@common/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-assinatura-ativa',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './assinatura-ativa.component.html',
    styleUrls: ['./assinatura-ativa.component.scss']
})
export class AssinaturaAtivaComponent implements OnInit {
    private usuarioLogado: IUsuarioAutenticado;
    public assinaturaAtiva!: IAssinaturaAtiva;
    public planosAtivos!: IPlanoResult[];
    public mapTiposPlanos = mapTiposPlanos;
    public mapDescricaoTiposPlanos = mapDescricaoTiposPlanos;
    public mapTituloTiposPlanos: { [key: number]: string } = {
        [EnumTipoPlano.Mensal]: 'Nosso Cafofo Mensal',
        [EnumTipoPlano.Semestral]: 'Nosso Cafofo Semestral',
        [EnumTipoPlano.Anual]: 'Nosso Cafofo Anual',
        [EnumTipoPlano.PromocionalAnual]: 'Nosso Cafofo Promocional Anual',
        [EnumTipoPlano.Free]: 'Nosso Cafofo Grátis'
    };

    constructor(
        private readonly _assinaturaService: AssinaturasService,
        private readonly _planosService: PlanosService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _toastService: ToastrService,
        private readonly _usuarioLogadoService: UsuarioLogadoService
    ) {
        this.usuarioLogado = this._usuarioLogadoService.getDadosSession().usuario;
        this._assinaturaService.getAssinaturaId(this.usuarioLogado.assinaturaId as number).subscribe((res: any) => {
            if (res) {
                this.assinaturaAtiva = res;
                this._changeDetectorRef.detectChanges();
            } else {
                this._toastService.info('Problemas ao carregar a assinatura ativa!',
                    'Redirecionando', {
                    timeOut: 3000
                });
                this._router.navigate(['/']);
            }
        }, err => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Assinatura não encontrada!',
                err.error && err.error.error ? err.error.error : 'Busca de Assinatura', {
                timeOut: 3000,
            });
            this._router.navigate(['/']);
        });
    }

    ngOnInit() {
        this._planosService.getPlano({ offset: 0, limit: 50, ativo: true }).subscribe((res: any) => {
            if (res && res.rows) {
                this.planosAtivos = res.rows.filter((plano: any) => plano.tipoPlano !== this.assinaturaAtiva.tipoPlano);
            } else {
                this.planosAtivos = [];
            }
            this._changeDetectorRef.detectChanges();
        }, err => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Planos ativos não foram filtrados!',
                err.error && err.error.error ? err.error.error : 'Busca de Planos', {
                timeOut: 3000
            });
            this._router.navigate(['/']);
        });
    }

}