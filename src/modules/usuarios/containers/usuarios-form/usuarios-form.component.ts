import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizaUsuario } from '@app/api/models';
import { NovoUsuario } from '@app/api/models/novo-usuario';
import { UsuariosService } from '@app/api/services';
import { IUsuarioResult } from '@app/models/usuario-result-interface';
import { Utilitarios } from '@app/utils/utils.service';
import { SelectMoradorComponent } from '@common/components';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-usuarios-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './usuarios-form.component.html',
    styleUrls: ['./usuarios-form.component.scss'],
})
export class UsuariosFormComponent implements OnInit {
    private route: string = '/usuarios';
    public dadosRegistroFiltrado: any;
    public isNew: boolean = true;
    //public carregamentoInicialFeito: boolean = false;
    public formGroup !: FormGroup | any;
    public title!: string;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private _router: Router,
        private readonly _activeRoute: ActivatedRoute,
        public _service: UsuariosService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastService: ToastrService
    ) {
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
        if (!this.formGroup) {
            return null;
        }

        return (formControl.value === this.formGroup.get('senha').value) ? null : { confirmar: true };
    }

    private preparaNovoRegistro() {
        this.formGroup = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email, Validators.maxLength(70)]],
            senha: [null, [Validators.required, Validators.minLength(8)]],
            confirmarSenha: [null, [Validators.required, Validators.minLength(8), this.confirmaSenha.bind(this)]],
            perfilId: [null, [Validators.required]],
            moradorId: [null, [Validators.required]]
        });
        this.dadosRegistroFiltrado = {};
        this.isNew = true;
        //this.carregamentoInicialFeito = true;
        this._changeDetectorRef.detectChanges();
    }

    private loadRegistro(idRegistro: number) {
        this._service.getUsuarioId(idRegistro).subscribe((res: any) => {
            if (res) {
                this.isNew = false;
                this.dadosRegistroFiltrado = res;
                this.formGroup = this._formBuilder.group({
                    email: [null, []],
                    senha: [null, []],
                    confirmarSenha: [null, []],
                    perfilId: [null, [Validators.required]],
                    moradorId: [null, []],
                    ativo: [false, []]
                });
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
                const body: NovoUsuario = this.trataDadosParaCadastro();

                this._service.postUsuario(body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Registro inserido!', "Cadastro", {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Cadastro do Usuário não foi feito!', "Cadastro", {
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
                const body: AtualizaUsuario = this.trataDadosParaSalvar();
                this._service.putUsuarioId(+this.dadosRegistroFiltrado.id, body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Alterações salvas!', "Atualização", {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Dados do Usuário não foram atualizados!', "Atualização", {
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
        }
    }

    private trataDadosParaAbrirNoFormulario(dados: any): IUsuarioResult {
        dados.dataAssinatura = new Date(dados.dataAssinatura);
        return dados;
    }

    private trataDadosParaSalvar(): AtualizaUsuario {
        debugger
        return {
            email: this.formGroup.value.email,
            nome: this.formGroup.value.moradorId && this.formGroup.value.moradorId.nome ? this.formGroup.value.moradorId.nome : this.dadosRegistroFiltrado.nome,
            perfilId: this.formGroup.value.perfilId && this.formGroup.value.perfilId.id ? this.formGroup.value.perfilId.id : this.dadosRegistroFiltrado.perfilId,
            ativo: this.formGroup.value.ativo
        }
    }

    private trataDadosParaCadastro(): NovoUsuario {
        return {
            email: this.formGroup.value.email,
            senha: this.formGroup.value.senha,
            confirmarSenha: this.formGroup.value.confirmarSenha,
            perfilId: this.formGroup.value.perfilId ? this.formGroup.value.perfilId.id : null,
            moradorId: this.formGroup.value.moradorId ? this.formGroup.value.moradorId.id : null,
            nome: this.formGroup.value.moradorId ? this.formGroup.value.moradorId.nome : null
        }
    }

    voltar() {
        this._router.navigate([this.route]);
    }

}