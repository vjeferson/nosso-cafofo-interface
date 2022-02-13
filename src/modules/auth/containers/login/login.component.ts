import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autenticar } from '@app/api/models';
import { AutenticarContaSocial } from '@app/api/models/autenticar-conta-social';
import { AutenticacaoService } from '@app/api/services';
import { ContaSocial } from '@app/models/account-social.models';
import { Utilitarios } from '@app/utils/utils.service';
import { UsuarioLogadoService } from '@common/services';
import { ContaSocialService } from '@common/services/conta-social.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(
        private readonly _autenticacaoService: AutenticacaoService,
        private readonly _formBuilder: FormBuilder,
        private readonly _toastService: ToastrService,
        private readonly _changeDetectorService: ChangeDetectorRef,
        private readonly _contaSocialService: ContaSocialService,
        private readonly _router: Router,
        private readonly _usuarioLogadoService: UsuarioLogadoService
    ) {
        this.formGroup = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            senha: [null, [Validators.required, Validators.minLength(8)]],
        });
    }

    ngOnInit() { }

    public logar() {
        if (this.formGroup.valid) {
            const parametros: Autenticar = this.formGroup.value;
            this._autenticacaoService.postAuthenticate(parametros).subscribe((res: any) => {
                this._usuarioLogadoService.setDadosSession(res);
                this._router.navigate(['/']);
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Autenticação inválida", {
                    timeOut: 3000,
                });
            });
        } else {
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

    public logarComContaSocial(socialType: string) {
        if (socialType === 'facebook') {
            this._contaSocialService.autenticarComContaDoFacebook().then(
                (infoContaSocial: ContaSocial) => {
                    if (infoContaSocial) {
                        const parametros: AutenticarContaSocial = {
                            idContaSocial: infoContaSocial.id,
                            socialType: infoContaSocial.tipoConta
                        };
                        this._autenticacaoService.postAuthenticateContaSocial(parametros).subscribe((res: any) => {
                            this._usuarioLogadoService.setDadosSession(res);
                            this._router.navigate(['/']);
                        }, (err: any) => {
                            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                                err.error && err.error.error ? err.error.error : "Autenticação inválida", {
                                timeOut: 3000,
                            });
                        });
                    }
                }
            );
        }
    }

}
