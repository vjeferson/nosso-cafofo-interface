import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FestasService } from '@app/api/services';
import { IParticipanteFestaResult } from '@app/models/participante-festa-result-interface';
import { IFiltroParticipantesFestas } from '@app/models/search-participantes-festas';
import { mapDescricaoAcoesModalConfirmacao, mapLoteFesta, mapSituacaoPagamentoParticipanteFesta, _PAGE_SIZE } from '@app/utils/consts';
import { ConfirmacaoNgbdModal } from '@common/components';
import { FiltrosParticipantesNgbdModal, FormParticipantesFestaNgbdModal } from '@modules/festas/components';
import { FiltrosFestasNgbdModal } from '@modules/festas/components/filtros-festas-modal/filtros-festas-modal.component';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ParticipantesFestasTableService } from './participantes-festas-table.service';

@Component({
    selector: 'sb-festas-participantes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './participantes-festas-list.component.html',
    styleUrls: ['./participantes-festas-list.component.scss'],
})
export class ParticipantesFestasComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosParticipantesNgbdModal | any;
    @ViewChild('modalConfirmacao', { static: true }) modalConfirmacao: ConfirmacaoNgbdModal | any;
    @Input() festaId!: number;

    public mapSituacaoPagamentoParticipanteFesta = mapSituacaoPagamentoParticipanteFesta;
    public mapLoteFesta = mapLoteFesta;
    public mapDescricaoAcoesModalConfirmacao = mapDescricaoAcoesModalConfirmacao;
    public pageSize = _PAGE_SIZE;
    public registros$!: Observable<IParticipanteFestaResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroParticipantesFestas;

    constructor(
        public _serviceTable: ParticipantesFestasTableService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: FestasService,
        private _toastService: ToastrService,
        private _modalService: NgbModal
    ) { }

    ngOnInit() {
        this._serviceTable.pageSize = this.pageSize;
        this.registros$ = this._serviceTable.registros$;
        this.total$ = this._serviceTable.count$;
        this.filtros = this._serviceTable.state;
        this.filtros.festaId = this.festaId;
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

    public cadastrarParticipante() {
        const modalRef = this._modalService.open(FormParticipantesFestaNgbdModal, { centered: true });
        modalRef.componentInstance.festaId = this.festaId;

        modalRef.result.then((response) => {
            if (response) {
                this.filtrar();
            }
        }, (reason) => {
            if (reason) {
                this.filtrar();
            }
        });
    }

    editar(idRegistro: number) {

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