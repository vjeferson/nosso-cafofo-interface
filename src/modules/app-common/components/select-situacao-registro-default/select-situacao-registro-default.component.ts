import { Component, ElementRef, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'form-select-situacao-registro-default',
    templateUrl: './select-situacao-registro-default.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectSituacaoRegistroComponent),
            multi: true
        }
    ]
})
export class SelectSituacaoRegistroComponent implements OnInit, ControlValueAccessor {
    @Input() _readonly: boolean;
    _value: any;
    _onChange: any;
    _onTouched: any;

    opcoes = [
        {
            descricao: 'Todos/Ambos',
            valor: 'todos'
        },
        {
            descricao: 'Ativos',
            valor: true
        },
        {
            descricao: 'Desativos',
            valor: false
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
