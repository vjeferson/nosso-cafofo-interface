import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { SortDirection } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { State } from '@app/models/state';
import { SearchResult } from '@app/models/search-result';

@Injectable()
export abstract class TableService<Service, Model>{
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _registros$ = new BehaviorSubject<Country[]>([]);
    private _count$ = new BehaviorSubject<number>(0);

    private _state: Model | any;

    constructor(private pipe: DecimalPipe, protected service: Service, state: Model) {
        this._state = state;
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(120),
                switchMap(() => this._search()),
                delay(120),
                tap(() => this._loading$.next(false))
            )
            .subscribe((result: any) => {
                debugger
                this._registros$.next(result.rows);
                this._count$.next(result.count);
            });

        this._search$.next();
    }

    get registros$() {
        return this._registros$.asObservable();
    }
    get count$() {
        return this._count$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get state() {
        return this._state;
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get searchTerm() {
        return this._state.searchTerm;
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    abstract _search(): Observable<SearchResult>;

    calculaOffset(): number {
        return this.page > 1 ? (this.pageSize * (this.page - 1)) : 0;
    }

}
