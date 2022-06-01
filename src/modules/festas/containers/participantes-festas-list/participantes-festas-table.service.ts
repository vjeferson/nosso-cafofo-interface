import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { ParticipantesFestaService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { ToastrService } from 'ngx-toastr';
import { _PAGE_SIZE } from '@app/utils/consts';
import { IFiltroParticipantesFestas } from '@app/models/search-participantes-festas';

@Injectable({ providedIn: 'root' })
export class ParticipantesFestasTableService extends TableService<ParticipantesFestaService, IFiltroParticipantesFestas> {
    constructor(
        pipe: DecimalPipe,
        service: ParticipantesFestaService,
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
        } as IFiltroParticipantesFestas);
    }

    _search(): Observable<SearchResult> {
        let { sortColumn, sortDirection, pageSize, searchTerm, situacao, festaId } = this.state;
        return new Observable((observer) => {
            this.service.getParticipantesFestaFestaId({
                festaId,
                limit: pageSize, offset: this.calculaOffset(),
                nome: searchTerm && searchTerm !== '' ? searchTerm : undefined, 
                situacao
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