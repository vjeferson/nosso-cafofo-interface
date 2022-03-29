import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { AssinantesService, AssinaturasService, PlanosService, RepublicasService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { IFiltroPlanos } from '@app/models/search-planos';
import { IFiltroAssinantes } from '@app/models/search-assinantes';
import { ToastrService } from 'ngx-toastr';
import { _PAGE_SIZE } from '@app/utils/consts';

@Injectable({ providedIn: 'root' })
export class AssinantesTableService extends TableService<AssinantesService, IFiltroAssinantes> {
    constructor(pipe: DecimalPipe, service: AssinantesService, private readonly _toastService: ToastrService) {
        super(pipe, service, {
            page: 1,
            pageSize: _PAGE_SIZE,
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
            this.service.getAssinantes({
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
