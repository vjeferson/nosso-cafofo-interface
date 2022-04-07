import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrocaSenhaRecuperacao, ValidarCodigoRecuperacaoSenha } from '@app/api/models';
import { RecuperarSenha } from '@app/api/models/recuperar-senha';
import { UsuariosService } from '@app/api/services';
import { Utilitarios } from '@app/utils/utils.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss', '../login/login.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    public formGroup!: FormGroup;
    public formGroupCodigo!: FormGroup;
    public formGroupSenha!: FormGroup;

    public showRecoveryPassword: boolean;
    public showRecoveryCodeValidation: boolean;
    public showNewPasswordDefinition: boolean;

    constructor(
        private readonly _router: Router,
        private readonly _formBuilder: FormBuilder,
        private readonly _usuarioService: UsuariosService,
        private readonly _toastService: ToastrService,
        private readonly _cd: ChangeDetectorRef
    ) {
        this.showRecoveryPassword = true;
        this.showRecoveryCodeValidation = false;
        this.showNewPasswordDefinition = false;

        this.formGroup = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]]
        });

        this.formGroupCodigo = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            codigo: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
        });

        this.formGroupSenha = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            codigo: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
            senha: [null, [Validators.required, Validators.minLength(8)]],
            confirmaSenha: [null, [Validators.required, Validators.minLength(8), this.confirmaSenha.bind(this)]]
        });
    }

    ngOnInit() { }

    private confirmaSenha(formControl: FormControl) {
        if (!this.formGroupSenha) {
            return null;
        }

        return (formControl.value === this.formGroupSenha?.get('senha')?.value) ? null : { confirmar: true };
    }

    public recuperar() {
        if (this.formGroup.valid) {
            const parametros: RecuperarSenha = this.formGroup.value;
            this._usuarioService.postUsuarioRecuperarSenha(parametros).subscribe((res: any) => {
                if (res) {
                    this.formGroupCodigo.get('email')?.setValue(parametros.email);
                    this.formGroupSenha.get('email')?.setValue(parametros.email);
                    this.showRecoveryPassword = false;
                    this.showRecoveryCodeValidation = true;
                    this.showNewPasswordDefinition = false;
                }
                this._cd.detectChanges();
                this._toastService.success('Código gerado e enviado para o e-mail inserido!', "Recuperação", {
                    timeOut: 3000
                });
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Recuperação inválida", {
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

    public validarCodigo() {
        debugger
        if (this.formGroupCodigo.valid && this.showRecoveryCodeValidation) {
            const parametros: ValidarCodigoRecuperacaoSenha = this.formGroupCodigo.value;
            this._usuarioService.postUsuarioValidaCodigoRecuperacaoSenha(parametros).subscribe((res: any) => {
                if (res) {
                    this.formGroupSenha.get('codigo')?.setValue(parametros.codigo);
                    this.showRecoveryPassword = false;
                    this.showRecoveryCodeValidation = false;
                    this.showNewPasswordDefinition = true;
                }
                this._cd.detectChanges();
                this._toastService.success('Código validado!', "Validação", {
                    timeOut: 3000
                });
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Validação inválida", {
                    timeOut: 3000,
                });
            });
        } else {
            Utilitarios.validateAllFormFields(this.formGroupCodigo);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

    public redefinir() {
        if (this.formGroupSenha.valid && this.showNewPasswordDefinition) {
            const parametros: TrocaSenhaRecuperacao = this.formGroupSenha.value;
            this._usuarioService.postUsuarioTrocaSenhaRecuperacao(parametros).subscribe((res: any) => {
                if (res) {
                    this._router.navigate(['/auth/login']);
                    this._toastService.success('Senha redefinida!', "Redefinição", {
                        timeOut: 3000
                    });
                }
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Redefinição inválida", {
                    timeOut: 3000,
                });
            });
        } else {
            Utilitarios.validateAllFormFields(this.formGroupSenha);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

}
