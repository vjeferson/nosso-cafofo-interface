import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IContaResult } from '@app/models/conta-result-interface';
import { IFiltroContas } from '@app/models/search-contas';
import { mapSituacaoConta, _PAGE_SIZE } from '@app/utils/consts';
import { FiltrosContasNgbdModal } from '@modules/contas/components';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Observable } from 'rxjs';
import { ContasTableService } from './contas-table.service';

@Component({
    selector: 'sb-contas',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contas-list.component.html',
    styleUrls: ['./contas-list.component.scss'],
})
export class ContasComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosContasNgbdModal | any;

    public mapSituacaoConta = mapSituacaoConta;
    private routeEdicao: string = '/contas/edicao';
    public routeCadastro: string = '/contas/cadastro';
    public pageSize = _PAGE_SIZE;
    public registros$!: Observable<IContaResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroContas;

    constructor(
        public serviceTable: ContasTableService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) { }

    ngOnInit() {
        this.serviceTable.pageSize = this.pageSize;
        this.registros$ = this.serviceTable.registros$;
        this.total$ = this.serviceTable.count$;
        this.filtros = this.serviceTable.state;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.serviceTable.sortColumn = column;
        this.serviceTable.sortDirection = direction;
        this._changeDetectorRef.detectChanges();
    }

    abrirModalFiltrar() {
        this.modalFiltros.open();
    }

    filtrar() {
        this.serviceTable._set(this.filtros);
    }

    editar(idRegistro: number) {
        this._router.navigate([this.routeEdicao, { id: idRegistro }]);
    }

}