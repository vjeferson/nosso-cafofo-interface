import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FestasService } from '@app/api/services';
import { IReuniaoResult } from '@app/models/reuniao-result-interface';
import { IFiltroReunioes } from '@app/models/search-reunioes';
import { mapDescricaoAcoesModalConfirmacao, mapSituacaoFesta, _PAGE_SIZE } from '@app/utils/consts';
import { ConfirmacaoNgbdModal } from '@common/components';
import { FiltrosFestasNgbdModal } from '@modules/festas/components/filtros-festas-modal/filtros-festas-modal.component';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FestasTableService } from './festas-table.service';

@Component({
    selector: 'sb-festas',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './festas-list.component.html',
    styleUrls: ['./festas-list.component.scss'],
})
export class FestasComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosFestasNgbdModal | any;
    @ViewChild('modalConfirmacao', { static: true }) modalConfirmacao: ConfirmacaoNgbdModal | any;

    public mapSituacaoFesta = mapSituacaoFesta;
    public mapDescricaoAcoesModalConfirmacao = mapDescricaoAcoesModalConfirmacao;
    private routeEdicao: string = '/festas/edicao';
    private routeVisualizar: string = '/festas/visualizar';
    public routeCadastro: string = '/festas/cadastro';
    public pageSize = _PAGE_SIZE;
    public registros$!: Observable<IReuniaoResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroReunioes;

    constructor(
        public _serviceTable: FestasTableService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _service: FestasService,
        private _toastService: ToastrService
    ) { }

    ngOnInit() {
        this._serviceTable.pageSize = this.pageSize;
        this.registros$ = this._serviceTable.registros$;
        this.total$ = this._serviceTable.count$;
        this.filtros = this._serviceTable.state;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this._serviceTable.sortColumn = column;
        this._serviceTable.sortDirection = direction;
        this._changeDetectorRef.detectChanges();
    }

    abrirModalFiltrar() {
        this.modalFiltros.open();
    }

    filtrar() {
        this._serviceTable._set(this.filtros);
    }

    editar(idRegistro: number) {
        this._router.navigate([this.routeEdicao, { id: idRegistro }]);
    }

    abrirModalRemocao(idRegistro: number) {
        this.modalConfirmacao.idRegistro = idRegistro;
        this.modalConfirmacao.open();
    }

    remover(idRegistro: number) {
        this._service.deleteFestaId(idRegistro).subscribe((res: any) => {
            if (res) {
                this._toastService.success('Registro removido!', "Remoção", {
                    timeOut: 3000,
                });
            } else {
                this._toastService.error('Remoção não foi feita!', "Remoção", {
                    timeOut: 3000,
                });
            }
            this.filtrar();
        }, (err: any) => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Remoção inválida", {
                timeOut: 3000,
            });
        });
    }

}