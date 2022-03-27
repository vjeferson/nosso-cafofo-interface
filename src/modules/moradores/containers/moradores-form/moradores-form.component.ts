import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizaMorador } from '@app/api/models/atualiza-morador';
import { NovoMorador } from '@app/api/models/novo-morador';
import { MoradoresService } from '@app/api/services';
import { Utilitarios } from '@app/utils/utils.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-moradores-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './moradores-form.component.html',
    styleUrls: ['./moradores-form.component.scss'],
})
export class MoradoresFormComponent implements OnInit {
    private route: string = '/moradores';
    public dadosRegistroFiltrado: any;
    public isNew: boolean = true;
    public formGroup !: FormGroup | any;
    public formGroupCadastroUsuario !: FormGroup | any;
    public title!: string;
    public mensagemAnoMaximoEntrada: string;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private _router: Router,
        private readonly _activeRoute: ActivatedRoute,
        public _service: MoradoresService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastService: ToastrService
    ) {
        this.mensagemAnoMaximoEntrada = `Valor máximo: ${(new Date()).getFullYear()}`;

        this.formGroup = this._formBuilder.group({
            nome: [null, [Validators.required, Validators.maxLength(50)]],
            anoEntrada: [null, [Validators.required, Validators.min(1900), Validators.max((new Date()).getFullYear())]],
            ativo: [false, []],
            realizarCadastroDeUsuario: [false, []]
        });

        this.formGroupCadastroUsuario = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email, Validators.maxLength(70)]],
            senha: [null, [Validators.required, Validators.minLength(8)]],
            confirmarSenha: [null, [Validators.required, Validators.minLength(8), this.confirmaSenha.bind(this)]],
            perfilId: [null, [Validators.required]]
        });

        this._activeRoute.data.subscribe(data => {
            this.title = data.title;
        });
    }

    ngOnInit() {
        this._activeRoute.params.subscribe(params => {
            if (params['id'] && !isNaN(+params['id'])) {
                this.loadRegistro(+params['id']);
            } else {
                this.preparaNovoRegistro();
            }
        });
    }

    private confirmaSenha(formControl: FormControl) {
        if (!this.formGroupCadastroUsuario) {
            return null;
        }

        return (formControl.value === this.formGroupCadastroUsuario.get('senha').value) ? null : { confirmar: true };
    }

    private preparaNovoRegistro() {
        this.dadosRegistroFiltrado = {};
        this.isNew = true;
    }

    private loadRegistro(idRegistro: number) {
        this._service.getMoradorId(idRegistro).subscribe((res: any) => {
            if (res) {
                this.isNew = false;
                this.dadosRegistroFiltrado = res;
                this.formGroup.patchValue(this.dadosRegistroFiltrado);
                this._changeDetectorRef.detectChanges();
            } else {
                this._router.navigate([this.route]);
                this._toastService.error('Registro para a identificação informada não foi encontrado!', "Busca de registro", {
                    timeOut: 3000,
                });
            }
        }, (err: any) => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Cadastro inválido", {
                timeOut: 3000,
            });
        });
    }

    salvar() {
        if (this.formGroup.valid) {
            if (this.isNew) {
                const body: NovoMorador = this.trataDadosParaCadastro();

                if (body.realizarCadastroDeUsuario && !this.formGroupCadastroUsuario.valid) {
                    Utilitarios.validateAllFormFields(this.formGroupCadastroUsuario);
                    this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                        timeOut: 3000
                    });
                    return;
                }

                this._service.postMorador(body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Registro inserido!', "Cadastro", {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Cadastro do Morador não foi feito!', "Cadastro", {
                            timeOut: 3000,
                        });
                    }
                    this._router.navigate([this.route]);
                }, (err: any) => {
                    this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                        err.error && err.error.error ? err.error.error : "Cadastro inválido", {
                        timeOut: 3000,
                    });
                });
            } else {
                const body: AtualizaMorador = this.trataDadosParaSalvar();
                this._service.putMoradorId(+this.dadosRegistroFiltrado.id, body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Alterações salvas!', "Atualização", {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Dados do Morador não foram atualizados!', "Atualização", {
                            timeOut: 3000,
                        });
                    }
                    this._router.navigate([this.route]);
                }, (err: any) => {
                    this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                        err.error && err.error.error ? err.error.error : "Atualização inválida", {
                        timeOut: 3000,
                    });
                });
            }
        } else {
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000
            });

            if (this.formGroup.get('realizarCadastroDeUsuario').value && !this.formGroupCadastroUsuario.valid) {
                Utilitarios.validateAllFormFields(this.formGroupCadastroUsuario);
            }
        }
    }

    private trataDadosParaSalvar(): AtualizaMorador {
        return {
            nome: this.formGroup.value.nome,
            anoEntrada: this.formGroup.value.anoEntrada,
            ativo: this.formGroup.value.ativo
        }
    }

    private trataDadosParaCadastro(): NovoMorador {
        return {
            nome: this.formGroup.value.nome,
            anoEntrada: this.formGroup.value.anoEntrada,
            realizarCadastroDeUsuario: this.formGroup.value.realizarCadastroDeUsuario,
            email: this.formGroupCadastroUsuario.value.email,
            senha: this.formGroupCadastroUsuario.value.senha,
            confirmarSenha: this.formGroupCadastroUsuario.value.confirmarSenha,
            perfilId: this.formGroupCadastroUsuario.value.perfilId ? this.formGroupCadastroUsuario.value.perfilId.id : null
        }
    }

    voltar() {
        this._router.navigate([this.route]);
    }

}