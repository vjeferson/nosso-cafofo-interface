import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '@app/api/services';
import { IFiltroUsuarios } from '@app/models/search-usuarios';
import { IUsuarioResult } from '@app/models/usuario-result-interface';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { FiltrosUsuariosNgbdModal } from '@modules/usuarios/components';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsuariosTableService } from './usuarios-table.service';

@Component({
    selector: 'sb-usuarios',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosComponent implements OnInit {
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    @ViewChild('modalFiltros', { static: true }) modalFiltros: FiltrosUsuariosNgbdModal | any;

    private routeEdicao: string = '/usuarios/edicao';
    public routeCadastro: string = '/usuarios/cadastro';
    public pageSize = 2;
    public registros$!: Observable<IUsuarioResult[]>;
    public total$!: Observable<number>;
    public sortedColumn!: string;
    public sortedDirection!: string;
    public filtros!: IFiltroUsuarios;

    constructor(
        public serviceTable: UsuariosTableService,
        private readonly _service: UsuariosService,
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

    ativar(registro: any) {
        // this._service.putUsuarioAtivarId(registro.id).subscribe((res: any) => {
        //     if (res) {
        //         this._toastService.success('Registro ativo com sucesso!', "Ativação", {
        //             timeOut: 3000
        //         });
        //     } else {
        //         this._toastService.error('Ativação do Usuário não foi feita!', "Ativação", {
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

    desativar(registro: any) {
        // this._service.putUsuarioDesativarId(registro.id).subscribe((res: any) => {
        //     if (res) {
        //         this._toastService.success('Registro desativado com sucesso!', "Desativação", {
        //             timeOut: 3000
        //         });
        //     } else {
        //         this._toastService.error('Desativação do Usuário não foi feita!', "Desativação", {
        //             timeOut: 3000
        //         });
        //     }
        //     this.filtrar();
        // }, (err: any) => {
        //     this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
        //         err.error && err.error.error ? err.error.error : "Desativação inválida", {
        //         timeOut: 3000
        //     });
        // });
    }

}