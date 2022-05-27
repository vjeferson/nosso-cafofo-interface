import { Component, ElementRef, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOpcoesSituacao } from '@app/interfaces/opcoes-situacao.interface';

@Component({
    selector: 'form-select-situacao-custom',
    templateUrl: './select-situacao-custom.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectSituacaoCustomComponent),
            multi: true
        }
    ]
})
export class SelectSituacaoCustomComponent implements OnInit, ControlValueAccessor {
    @Input() opcoes: IOpcoesSituacao[];
    @Input() _readonly: boolean;
    @Input() required: boolean = false;
    _value: any;
    _onChange: any;
    _onTouched: any;

    constructor(private injector: Injector, private element: ElementRef) {
        this._onChange = (_: any) => { };
        this._onTouched = (_: any) => { };
        this._readonly = false;
        this.opcoes = [];
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
