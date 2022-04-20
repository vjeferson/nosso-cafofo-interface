import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ContasService, ReunioesService } from '@app/api/services';
import { IFiltroContas } from '@app/models/search-contas';
import { IFiltroMoradores } from '@app/models/search-moradores';
import { SearchResult } from '@app/models/search-result';
import { IFiltroReunioes } from '@app/models/search-reunioes';
import { _PAGE_SIZE } from '@app/utils/consts';
import { TableService } from '@common/services/table.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReunioesTableService extends TableService<ReunioesService, IFiltroReunioes> {
    constructor(
        pipe: DecimalPipe,
        service: ReunioesService,
        private readonly _toastService: ToastrService
    ) {
        super(pipe, service, {
            page: 1,
            pageSize: _PAGE_SIZE,
            searchTerm: '',
            sortColumn: '',
            sortDirection: '',
            data: undefined,
            limit: 0,
            offset: 0
        } as IFiltroReunioes);
    }

    _search(): Observable<SearchResult> {
        debugger
        let { sortColumn, sortDirection, pageSize, searchTerm, data } = this.state;
        return new Observable((observer) => {
            this.service.getReuniao({ limit: pageSize, offset: this.calculaOffset(), descricao: searchTerm && searchTerm !== '' ? searchTerm : undefined, data }).subscribe((res: any) => {
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