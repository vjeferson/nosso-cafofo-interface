import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { PlanosService, RepublicasService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { IFiltroPlanos } from '@app/models/search-planos';
import { IFiltroAssinantes } from '@app/models/search-assinantes';

@Injectable({ providedIn: 'root' })
export class AssinantesTableService extends TableService<RepublicasService, IFiltroAssinantes> {
    constructor(pipe: DecimalPipe, service: RepublicasService) {
        super(pipe, service, {
            page: 1,
            pageSize: 2,
            searchTerm: '',
            sortColumn: '',
            sortDirection: '',
            tipoPlanoAtivo: undefined,
            anoCriacao: undefined,
            dataPagamentoContas: undefined,
            limit: 0,
            offset: 0
        } as IFiltroAssinantes);
    }

    _search(): Observable<SearchResult> {
        let { sortColumn, sortDirection, pageSize, searchTerm, tipoPlanoAtivo, anoCriacao, dataPagamentoContas } = this.state;
        return new Observable((observer) => {
            this.service.getRepublica({
                limit: pageSize,
                offset: this.calculaOffset(),
                nome: searchTerm && searchTerm !== '' ? searchTerm : undefined,
                tipoPlanoAtivo,
                anoCriacao,
                dataPagamentoContas
            }).subscribe((res: any) => {
                observer.next(res);
                observer.complete();
            }, (err: any) => {
                observer.error(err);
                observer.complete();
            });
        });
    }

}
