import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { PlanosService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';

@Injectable({ providedIn: 'root' })
export class PlanoTableService extends TableService<PlanosService> {
    constructor(pipe: DecimalPipe, service: PlanosService) {
        super(pipe, service);
    }

    _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this.state;
        return new Observable((observer) => {
            debugger;
            this.service.getPlano({ limit: pageSize, offset: this.calculaOffset(), descricao: searchTerm && searchTerm !== '' ? searchTerm : undefined }).subscribe((res: any) => {
                observer.next(res);
                observer.complete();
            }, (err: any) => {
                observer.error(err);
                observer.complete();
            });
        });
    }

}
