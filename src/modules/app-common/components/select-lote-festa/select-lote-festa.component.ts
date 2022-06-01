import { Component, ElementRef, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EnumLoteFesta } from '@app/utils/enums';

@Component({
    selector: 'form-select-lote-festa',
    templateUrl: './select-lote-festa.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectLoteFestaComponent),
            multi: true
        }
    ]
})
export class SelectLoteFestaComponent implements OnInit, ControlValueAccessor {
    @Input() _readonly: boolean;
    @Input() required: boolean = false;
    _value: any;
    _onChange: any;
    _onTouched: any;

    opcoes = [
        {
            descricao: 'Promocional',
            valor: EnumLoteFesta.Promocional
        },
        {
            descricao: 'Primeiro',
            valor: EnumLoteFesta.Primeiro
        },
        {
            descricao: 'Segundo',
            valor: EnumLoteFesta.Segundo
        },
        {
            descricao: 'Terceiro',
            valor: EnumLoteFesta.Terceiro
        },
        {
            descricao: 'Quarto',
            valor: EnumLoteFesta.Quarto
        },
        {
            descricao: 'Quinto',
            valor: EnumLoteFesta.Quinto
        },
        {
            descricao: 'Extra',
            valor: EnumLoteFesta.Extra
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
