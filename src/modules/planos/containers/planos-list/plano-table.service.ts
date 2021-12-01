import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { PlanosService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { IFiltroPlanos } from '@app/models/search-planos';

@Injectable({ providedIn: 'root' })
export class PlanoTableService extends TableService<PlanosService, IFiltroPlanos> {
    constructor(pipe: DecimalPipe, service: PlanosService) {
        super(pipe, service, {
            page: 1,
            pageSize: 2,
            searchTerm: '',
            sortColumn: '',
            sortDirection: '',
            tipoPlano: undefined,
            ativo: undefined,
            limit: 0,
            offset: 0
        } as IFiltroPlanos);
    }

    _search(): Observable<SearchResult> {
        let { sortColumn, sortDirection, pageSize, searchTerm, tipoPlano, ativo } = this.state;
        return new Observable((observer) => {
            this.service.getPlano({ limit: pageSize, offset: this.calculaOffset(), descricao: searchTerm && searchTerm !== '' ? searchTerm : undefined, tipoPlano, ativo }).subscribe((res: any) => {
                observer.next(res);
                observer.complete();
            }, (err: any) => {
                observer.error(err);
                observer.complete();
            });
        });
    }

}
