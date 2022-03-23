import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EstadosService } from '@app/api/services';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'form-select-estado',
    templateUrl: './select-estado.component.html',
    styleUrls: ['select-estado.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectEstadoComponent),
            multi: true
        }
    ]
})
export class SelectEstadoComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @ViewChild('select', { static: true }) select: NgSelectComponent | any;
    @Output() escolheEstado = new EventEmitter<any>();
    @Input() required: boolean = false;
    _onChange: any;
    _onTouched: any;
    control: any;
    _value: any;
    _disabled: boolean;
    _loading: boolean;
    _readonly: boolean;
    public filtro$ = new Subject<string | null>();

    estados: Observable<any[]> | any;

    constructor(private injector: Injector, private element: ElementRef, private readonly _estadosService: EstadosService,
        private readonly _cd: ChangeDetectorRef) {
        this._disabled = false;
        this._loading = true;
        this._readonly = false;
        this._onChange = (_: any) => { };
        this._onTouched = (_: any) => { };

        this.filtro$.subscribe((filtro) => {
            this.pesquisa(filtro)
        });
    }

    ngOnInit() {
        this.control = this.injector.get(NgControl);
        this.pesquisa(null);
    }

    ngAfterViewInit() {
        this.select.changeEvent.subscribe((event: any) => {
            this.escolheEstado.next(event);
        });
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this._value = obj;
    }

    pesquisa(filtro: string | any = null) {
        this._loading = true;
        this._estadosService.getEstado(undefined, filtro).subscribe((res: any) => {
            this._loading = false;
            this.estados = res;
            this._cd.detectChanges();
        });
    }

}
