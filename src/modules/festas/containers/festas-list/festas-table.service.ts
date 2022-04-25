import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { FestasService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { ToastrService } from 'ngx-toastr';
import { _PAGE_SIZE } from '@app/utils/consts';
import { IFiltroFestas } from '@app/models/search-festas';

@Injectable({ providedIn: 'root' })
export class FestasTableService extends TableService<FestasService, IFiltroFestas> {
    constructor(
        pipe: DecimalPipe,
        service: FestasService,
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
        } as IFiltroFestas);
    }

    _search(): Observable<SearchResult> {
        let { sortColumn, sortDirection, pageSize, searchTerm, situacao } = this.state;
        return new Observable((observer) => {
            this.service.getFesta({
                limit: pageSize, offset: this.calculaOffset(),
                descricao: searchTerm && searchTerm !== '' ? searchTerm : undefined, situacao
            }).subscribe((res: any) => {
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