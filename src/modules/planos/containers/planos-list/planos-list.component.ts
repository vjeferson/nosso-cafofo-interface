import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PlanosService } from '@app/api/services';
import { IPlanoResult } from '@app/models/plano-result-interface';
import { IFiltroPlanos } from '@app/models/search-planos';
import { mapTiposPlanos, _PAGE_SIZE } from '@app/utils/consts';
import { FiltrosPlanosNgbdModal } from '@modules/planos/components';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PlanoTableService } from './plano-table.service';

@Component({
    selector: 'sb-planos',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './planos-list.component.html',
    styleUrls: ['./planos-list.component.scss'],
})
export class PlanosComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosPlanosNgbdModal | any;

    private routeEdicaoPlanos: string = '/planos/edicao';
    public routeCadastroPlanos: string = '/planos/cadastro';
    public mapTiposPlanos = mapTiposPlanos;
    public pageSize = _PAGE_SIZE;
    public registros$!: Observable<IPlanoResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroPlanos;

    constructor(
        public serviceTable: PlanoTableService,
        private readonly _planosService: PlanosService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private toastService: ToastrService
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
        this.changeDetectorRef.detectChanges();
    }

    abrirModalFiltrar() {
        this.modalFiltros.open();
    }

    filtrar() {
        this.serviceTable._set(this.filtros);
    }

    editar(idRegistro: number) {
        this.router.navigate([this.routeEdicaoPlanos, { id: idRegistro }]);
    }

    ativar(plano: any) {
        this._planosService.putPlanoAtivarId(plano.id).subscribe((res: any) => {
            if (res) {
                this.toastService.success('Registro ativo com sucesso!', "Ativação", {
                    timeOut: 3000
                });
            } else {
                this.toastService.error('Ativação do Plano não foi feita!', "Ativação", {
                    timeOut: 3000
                });
            }
            this.filtrar();
        }, (err: any) => {
            this.toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Ativação inválida", {
                timeOut: 3000
            });
        });
    }

    desativar(plano: any) {
        this._planosService.putPlanoDesativarId(plano.id).subscribe((res: any) => {
            if (res) {
                this.toastService.success('Registro desativado com sucesso!', "Desativação", {
                    timeOut: 3000
                });
            } else {
                this.toastService.error('Desativação do Plano não foi feita!', "Desativação", {
                    timeOut: 3000
                });
            }
            this.filtrar();
        }, (err: any) => {
            this.toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Desativação inválida", {
                timeOut: 3000
            });
        });
    }

}