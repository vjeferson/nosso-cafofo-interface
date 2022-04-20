import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IReuniaoResult } from '@app/models/reuniao-result-interface';
import { IFiltroReunioes } from '@app/models/search-reunioes';
import { mapSituacaoConta, _PAGE_SIZE } from '@app/utils/consts';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Observable } from 'rxjs';
import { ReunioesTableService } from './reunioes-table.service';

@Component({
    selector: 'sb-reunioes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './reunioes-list.component.html',
    styleUrls: ['./reunioes-list.component.scss'],
})
export class ReunioesComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    // @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosContasNgbdModal | any;

    public mapSituacaoConta = mapSituacaoConta;
    private routeEdicao: string = '/reunioes/edicao';
    private routeVisualizacao: string = '/reunioes/visualizar';
    public routeCadastro: string = '/reunioes/cadastro';
    public pageSize = _PAGE_SIZE;
    public registros$!: Observable<IReuniaoResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroReunioes;

    constructor(
        public serviceTable: ReunioesTableService,
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

    // abrirModalFiltrar() {
    //     this.modalFiltros.open();
    // }

    filtrar() {
        this.serviceTable._set(this.filtros);
    }

    editar(idRegistro: number) {
        this._router.navigate([this.routeEdicao, { id: idRegistro }]);
    }

    visualizar(idRegistro: number) {
        this._router.navigate([this.routeVisualizacao, { id: idRegistro }]);
    }

}