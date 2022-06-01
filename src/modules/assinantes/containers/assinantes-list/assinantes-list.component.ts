import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { RelatoriosService } from '@app/api/services';
import { IResultAssinante } from '@app/models/assinante-result-interface';
import { IFiltroPlanos } from '@app/models/search-planos';
import { mapTiposPlanos, _PAGE_SIZE } from '@app/utils/consts';
import { FiltrosAssinantesNgbdModal } from '@modules/assinantes/components';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AssinantesTableService } from './assinantes-table.service';

@Component({
    selector: 'sb-assinantes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './assinantes-list.component.html',
    styleUrls: ['./assinantes-list.component.scss'],
})
export class AssinantesComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosAssinantesNgbdModal | any;

    private route: string = '/assinantes';
    public mapTiposPlanos = mapTiposPlanos;
    public pageSize = _PAGE_SIZE;
    public registros$!: Observable<IResultAssinante[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroPlanos;

    constructor(
        public _serviceTable: AssinantesTableService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _toastService: ToastrService,
        private _relatoriosSerive: RelatoriosService
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

    visualizar(idRegistro: number) {
        this._router.navigate([this.route + '/visualizar', { id: idRegistro }]);
    }

    gerarRelatorio(){
        this._relatoriosSerive.getRelatoriosAssinantes().subscribe((result: any) => {
            debugger
            if (result) {
                this._toastService.success('Relatório gerado com sucesso!', "Geração", {
                    timeOut: 3000
                });

                window.open(result.url);
            }
        }, (err: any) => {
            debugger
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Geração inválida", {
                timeOut: 3000,
            });
        });
    }

}