import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { UsuariosService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { IFiltroUsuarios } from '@app/models/search-usuarios';
import { ToastrService } from 'ngx-toastr';
import { _PAGE_SIZE } from '@app/utils/consts';

@Injectable({ providedIn: 'root' })
export class UsuariosTableService extends TableService<UsuariosService, IFiltroUsuarios> {
    constructor(pipe: DecimalPipe, service: UsuariosService,
        private readonly _toastService: ToastrService) {
        super(pipe, service, {
            page: 1,
            pageSize: _PAGE_SIZE,
            searchTerm: '',
            sortColumn: '',
            sortDirection: '',
            ativo: undefined,
            limit: 0,
            offset: 0
        } as IFiltroUsuarios);
    }

    _search(): Observable<SearchResult> {
        let { sortColumn, sortDirection, pageSize, searchTerm, anoEntrada, ativo } = this.state;
        return new Observable((observer) => {
            this.service.getUsuario({ limit: pageSize, offset: this.calculaOffset(), nome: searchTerm && searchTerm !== '' ? searchTerm : undefined, ativo }).subscribe((res: any) => {
                observer.next(res);
                observer.complete();
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Consulta inválida!',
                    err.error && err.error.error ? err.error.error : "Consulta inválida", {
                    timeOut: 3000,
                });
                observer.next({ rows: [], count: 0 });
                observer.complete();
            });
        });
    }

}