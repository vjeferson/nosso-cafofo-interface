import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '@common/services/table.service';
import { UsuariosService } from '@app/api/services';
import { DecimalPipe } from '@angular/common';
import { SearchResult } from '@app/models/search-result';
import { IFiltroUsuarios } from '@app/models/search-usuarios';

@Injectable({ providedIn: 'root' })
export class UsuariosTableService extends TableService<UsuariosService, IFiltroUsuarios> {
    constructor(pipe: DecimalPipe, service: UsuariosService) {
        super(pipe, service, {
            page: 1,
            pageSize: 2,
            searchTerm: '',
            sortColumn: '',
            sortDirection: '',
            ativo: undefined,
            limit: 0,
            offset: 0
        } as IFiltroUsuarios);
    }

    _search(): Observable<SearchResult> {
        let { sortColumn, sortDirection, pageSize, searchTerm, anoEntrada, ativo } = this.state;
        return new Observable((observer) => {
            this.service.getUsuario({ limit: pageSize, offset: this.calculaOffset(), nome: searchTerm && searchTerm !== '' ? searchTerm : undefined, ativo }).subscribe((res: any) => {
                observer.next(res);
                observer.complete();
            }, (err: any) => {
                observer.error(err);
                observer.complete();
            });
        });
    }

}