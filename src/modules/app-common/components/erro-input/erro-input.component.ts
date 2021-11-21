import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'show-erro-input',
    templateUrl: './erro-input.component.html',
    styleUrls: ['erro-input.component.scss'],
})
export class ErroInputComponent implements OnInit {
    @Input() inputName: string | any;
    @Input() formGroup: FormGroup | any;
    @Input() validationName: string | any;
    @Input() mensagemDeErro: string = 'Campo obrigatório';

    constructor() { }
    ngOnInit() { }

}
