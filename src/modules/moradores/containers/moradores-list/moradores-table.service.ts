import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { MoradoresService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { IFiltroMoradores } from '@app/models/search-moradores';

@Injectable({ providedIn: 'root' })
export class MoradoresTableService extends TableService<MoradoresService, IFiltroMoradores> {
    constructor(pipe: DecimalPipe, service: MoradoresService) {
        super(pipe, service, {
            page: 1,
            pageSize: 2,
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
                observer.error(err);
                observer.complete();
            });
        });
    }

}