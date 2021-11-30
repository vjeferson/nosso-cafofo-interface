import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PlanosService } from '@app/api/services';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { Observable } from 'rxjs';
import { PlanoTableService } from './plano-table.service';

@Component({
    selector: 'sb-planos',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './planos-list.component.html',
    styleUrls: ['./planos-list.component.scss'],
})
export class PlanosComponent implements OnInit {
    pageSize = 2;
    filtros: PlanosService.GetPlanoParams = {
        limit: this.pageSize,
        offset: 0,
        tipoPlano: undefined,
        ativo: undefined
    }
    registros$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public serviceTable: PlanoTableService,
        private readonly _planosService: PlanosService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.serviceTable.pageSize = this.pageSize;
        this.registros$ = this.serviceTable.registros$;
        this.total$ = this.serviceTable.count$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.serviceTable.sortColumn = column;
        this.serviceTable.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }

}