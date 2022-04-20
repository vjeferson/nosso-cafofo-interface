import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ContasService } from '@app/api/services';
import { IFiltroContas } from '@app/models/search-contas';
import { IFiltroMoradores } from '@app/models/search-moradores';
import { SearchResult } from '@app/models/search-result';
import { _PAGE_SIZE } from '@app/utils/consts';
import { TableService } from '@common/services/table.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContasTableService extends TableService<ContasService, IFiltroContas> {
    constructor(
        pipe: DecimalPipe,
        service: ContasService,
        private readonly _toastService: ToastrService
    ) {
        super(pipe, service, {
            page: 1,
            pageSize: _PAGE_SIZE,
            searchTerm: '',
            sortColumn: '',
            sortDirection: '',
            situacao: undefined,
            limit: 0,
            offset: 0
        } as IFiltroContas);
    }

    _search(): Observable<SearchResult> {
        debugger
        let { sortColumn, sortDirection, pageSize, searchTerm, situacao } = this.state;
        return new Observable((observer) => {
            this.service.getConta({ limit: pageSize, offset: this.calculaOffset(), descricao: searchTerm && searchTerm !== '' ? searchTerm : undefined, situacao }).subscribe((res: any) => {
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