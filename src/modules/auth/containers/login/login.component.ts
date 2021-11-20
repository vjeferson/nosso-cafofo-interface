import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autenticar } from '@app/api/models';
import { AutenticacaoService } from '@app/api/services';
import { Utilitarios } from '@common/services/utilitarios.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    private formGroup: FormGroup;

    constructor(
        private readonly _autenticacaoService: AutenticacaoService,
        private readonly _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required]],
        });
    }

    ngOnInit() {

    }

    public logar() {
        console.log(this.formGroup);
        if (this.formGroup.valid) {
            const parametros: Autenticar = this.formGroup.value;
            this._autenticacaoService.postAuthenticate(parametros).subscribe(res => { console.log(res) });
        } else {
            Utilitarios.validateAllFormFields(this.formGroup);
        }

    }

}
