import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PlanosService } from '@app/api/services';
import { IFiltroPlanos } from '@app/models/search-planos';
import { mapTiposPlanos } from '@app/utils/consts';
import { FiltrosAssinantesNgbdModal } from '@modules/assinantes/components';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
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

    // private routeVisualizaAssinantes: string = '/assinantes/';
    public mapTiposPlanos = mapTiposPlanos;
    public pageSize = 2;
    public registros$!: Observable<Country[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroPlanos;

    constructor(
        public _serviceTable: AssinantesTableService,
        private readonly _planosService: PlanosService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
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

    visualizar(idRegistro: number) {
        // this._router.navigate([this.routeEdicaoPlanos, { id: idRegistro }]);
    }

}