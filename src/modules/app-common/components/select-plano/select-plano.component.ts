import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Injector,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PlanosService } from '@app/api/services';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'form-select-plano',
    templateUrl: './select-plano.component.html',
    styleUrls: ['select-plano.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectPlanoComponent),
            multi: true
        }
    ]
})
export class SelectPlanoComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @ViewChild('select', { static: true }) select: NgSelectComponent | any;
    @Input() apenasPlanosAtivos: boolean = false;
    _onChange: any;
    _onTouched: any;
    control: any;
    _value: any;
    _disabled: boolean;
    _loading: boolean;
    _readonly: boolean;
    public filtro$ = new Subject<string | null>();

    planos: Observable<any[]> | any;

    constructor(
        private injector: Injector,
        private readonly _planosService: PlanosService,
        private readonly _cd: ChangeDetectorRef
    ) {
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

    ngAfterViewInit() { }

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
        const params = {
            ativo: this.apenasPlanosAtivos ? true : undefined,
            limit: 30,
            offset: 0
        }
        this._planosService.getPlano(params).subscribe((res: any) => {
            this._loading = false;
            this.planos = res;
            this._cd.detectChanges();
        });
    }

}
