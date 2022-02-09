import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MoradoresService } from '@app/api/services';
import { IMoradorResult } from '@app/models/morador-result-interface';
import { IFiltroMoradores } from '@app/models/search-moradores';
import { FiltrosMoradoresNgbdModal } from '@modules/moradores/components';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MoradoresTableService } from './moradores-table.service';

@Component({
    selector: 'sb-moradores',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './moradores-list.component.html',
    styleUrls: ['./moradores-list.component.scss'],
})
export class MoradoresComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosMoradoresNgbdModal | any;

    private routeEdicao: string = '/planos/edicao';
    public routeCadastro: string = '/planos/cadastro';
    public pageSize = 2;
    public registros$!: Observable<IMoradorResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroMoradores;

    constructor(
        public serviceTable: MoradoresTableService,
        private readonly _moradoresService: MoradoresService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _toastService: ToastrService
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

    ativar(morador: any) {
        // this._moradoresService.putPlanoAtivarId(plano.id).subscribe((res: any) => {
        //     if (res) {
        //         this._toastService.success('Registro ativo com sucesso!', "Ativação", {
        //             timeOut: 3000
        //         });
        //     } else {
        //         this._toastService.error('Ativação do Plano não foi feita!', "Ativação", {
        //             timeOut: 3000
        //         });
        //     }
        //     this.filtrar();
        // }, (err: any) => {
        //     this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
        //         err.error && err.error.error ? err.error.error : "Ativação inválida", {
        //         timeOut: 3000
        //     });
        // });
    }

    desativar(morador: any) {
        // this._planosService.putPlanoDesativarId(plano.id).subscribe((res: any) => {
        //     if (res) {
        //         this.toastService.success('Registro desativado com sucesso!', "Desativação", {
        //             timeOut: 3000
        //         });
        //     } else {
        //         this.toastService.error('Desativação do Plano não foi feita!', "Desativação", {
        //             timeOut: 3000
        //         });
        //     }
        //     this.filtrar();
        // }, (err: any) => {
        //     this.toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
        //         err.error && err.error.error ? err.error.error : "Desativação inválida", {
        //         timeOut: 3000
        //     });
        // });
    }

}