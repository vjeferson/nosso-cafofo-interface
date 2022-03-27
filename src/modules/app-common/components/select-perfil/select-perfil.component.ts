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
import { PerfisService, PlanosService } from '@app/api/services';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'form-select-perfil',
    templateUrl: './select-perfil.component.html',
    styleUrls: ['select-perfil.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectPerfilComponent),
            multi: true
        }
    ]
})
export class SelectPerfilComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @ViewChild('select', { static: true }) select: NgSelectComponent | any;
    @Input() required: boolean = false;
    _onChange: any;
    _onTouched: any;
    control: any;
    _value: any;
    _disabled: boolean;
    _loading: boolean;
    _readonly: boolean;
    public filtro$ = new Subject<string | null>();

    perfis: Observable<any[]> | any;

    constructor(
        private injector: Injector,
        private readonly _perfisService: PerfisService,
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
        this._perfisService.getPerfil(undefined, filtro).subscribe((res: any) => {
            this._loading = false;
            this.perfis = res;
            this._cd.detectChanges();
        });
    }

}
