import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ContasService, MoradoresService } from '@app/api/services';
import { IContaResult } from '@app/models/conta-result-interface';
import { IMoradorResult } from '@app/models/morador-result-interface';
import { IFiltroContas } from '@app/models/search-contas';
import { IFiltroMoradores } from '@app/models/search-moradores';
import { _PAGE_SIZE } from '@app/utils/consts';
import { FiltrosMoradoresNgbdModal } from '@modules/moradores/components';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-contas',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contas-list.component.html',
    styleUrls: ['./contas-list.component.scss'],
})
export class ContasComponent implements OnInit {
    // @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    // @ViewChild('modalFiltros', { static: true }) modalFiltros: Filtros | any;

    private routeEdicao: string = '/contas/edicao';
    public routeCadastro: string = '/contas/cadastro';
    public pageSize = _PAGE_SIZE;
    public registros$!: Observable<IContaResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroContas;

    constructor(
        //public serviceTable: MoradoresTableService,
        private readonly _moradoresService: ContasService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _toastService: ToastrService
    ) { }

    ngOnInit() {
        // this.serviceTable.pageSize = this.pageSize;
        // this.registros$ = this.serviceTable.registros$;
        // this.total$ = this.serviceTable.count$;
        // this.filtros = this.serviceTable.state;
    }

    // onSort({ column, direction }: SortEvent) {
    //     this.sortedColumn = column;
    //     this.sortedDirection = direction;
    //     this.serviceTable.sortColumn = column;
    //     this.serviceTable.sortDirection = direction;
    //     this._changeDetectorRef.detectChanges();
    // }

    // abrirModalFiltrar() {
    //     this.modalFiltros.open();
    // }

    // filtrar() {
    //     this.serviceTable._set(this.filtros);
    // }

    // editar(idRegistro: number) {
    //     this._router.navigate([this.routeEdicao, { id: idRegistro }]);
    // }

    // ativar(morador: any) {
    //     this._moradoresService.putMoradorAtivarId(morador.id).subscribe((res: any) => {
    //         if (res) {
    //             this._toastService.success('Registro ativo com sucesso!', "Ativação", {
    //                 timeOut: 3000
    //             });
    //         } else {
    //             this._toastService.error('Ativação do Morador não foi feita!', "Ativação", {
    //                 timeOut: 3000
    //             });
    //         }
    //         this.filtrar();
    //     }, (err: any) => {
    //         this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
    //             err.error && err.error.error ? err.error.error : "Ativação inválida", {
    //             timeOut: 3000
    //         });
    //     });
    // }

    // desativar(morador: any) {
    //     this._moradoresService.putMoradorDesativarId(morador.id).subscribe((res: any) => {
    //         if (res) {
    //             this._toastService.success('Registro desativado com sucesso!', "Desativação", {
    //                 timeOut: 3000
    //             });
    //         } else {
    //             this._toastService.error('Desativação do Morador não foi feita!', "Desativação", {
    //                 timeOut: 3000
    //             });
    //         }
    //         this.filtrar();
    //     }, (err: any) => {
    //         this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
    //             err.error && err.error.error ? err.error.error : "Desativação inválida", {
    //             timeOut: 3000
    //         });
    //     });
    // }

}