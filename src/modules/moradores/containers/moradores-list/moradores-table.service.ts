import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { MoradoresService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { IFiltroMoradores } from '@app/models/search-moradores';
import { ToastrService } from 'ngx-toastr';
import { _PAGE_SIZE } from '@app/utils/consts';

@Injectable({ providedIn: 'root' })
export class MoradoresTableService extends TableService<MoradoresService, IFiltroMoradores> {
    constructor(
        pipe: DecimalPipe,
        service: MoradoresService,
        private readonly _toastService: ToastrService
    ) {
        super(pipe, service, {
            page: 1,
            pageSize: _PAGE_SIZE,
            searchTerm: '',
            sortColumn: '',
            sortDirection: '',
            anoEntrada: undefined,
            ativo: undefined,
            limit: 0,
            offset: 0
        } as IFiltroMoradores);
    }

    _search(): Observable<SearchResult> {
        let { sortColumn, sortDirection, pageSize, searchTerm, anoEntrada, ativo } = this.state;
        return new Observable((observer) => {
            this.service.getMorador({ limit: pageSize, offset: this.calculaOffset(), nome: searchTerm && searchTerm !== '' ? searchTerm : undefined, anoEntrada, ativo }).subscribe((res: any) => {
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