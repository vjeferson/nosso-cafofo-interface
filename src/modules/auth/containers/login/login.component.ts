import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autenticar } from '@app/api/models';
import { AutenticacaoService } from '@app/api/services';
import { ToastrService } from 'ngx-toastr';

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
        private readonly _formBuilder: FormBuilder,
        private readonly _toastService: ToastrService,
        private readonly _changeDetectorService: ChangeDetectorRef
    ) {
        this.formGroup = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            senha: [null, [Validators.required]],
        });
    }

    ngOnInit() { }

    public logar() {
        if (this.formGroup.valid) {
            const parametros: Autenticar = this.formGroup.value;
            this._autenticacaoService.postAuthenticate(parametros).subscribe((res: any) => {
                console.log(res);
            }, (err: any) => {
                debugger;
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Autenticação inválida", {
                    timeOut: 3000,
                });
                //this._changeDetectorService.detectChanges();
            });
        }
    }

}
