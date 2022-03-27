import { Component, ElementRef, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EnumTipoPlano } from '@app/utils/enums';

@Component({
    selector: 'form-select-tipo-plano',
    templateUrl: './select-tipo-plano.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectTiposPlanosComponent),
            multi: true
        }
    ]
})
export class SelectTiposPlanosComponent implements OnInit, ControlValueAccessor {
    @Input() _readonly: boolean;
    @Input() required: boolean = false;
    _value: any;
    _onChange: any;
    _onTouched: any;

    tipos = [
        {
            descricao: 'Plano Grátis',
            codigoTipoPlano: EnumTipoPlano.Free
        },
        {
            descricao: 'Plano Mensal',
            codigoTipoPlano: EnumTipoPlano.Mensal
        },
        {
            descricao: 'Plano Semestal',
            codigoTipoPlano: EnumTipoPlano.Semestral
        },
        {
            descricao: 'Plano Anual',
            codigoTipoPlano: EnumTipoPlano.Anual
        },
        {
            descricao: 'Plano Promocional Anual',
            codigoTipoPlano: EnumTipoPlano.PromocionalAnual
        }
    ];


    constructor(private injector: Injector, private element: ElementRef) {
        this._onChange = (_: any) => { };
        this._onTouched = (_: any) => { };
        this._readonly = false;
    }

    ngOnInit() { }

    change() { }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    writeValue(obj: any): void {
        this._value = obj;
    }

}
