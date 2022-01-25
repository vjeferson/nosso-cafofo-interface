import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AtualizaUsuario } from '@app/api/models';
import { UsuariosService } from '@app/api/services';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { Utilitarios } from '@app/utils/utils.service';
import { UsuarioLogadoService } from '@common/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-profile',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    public formGroup !: FormGroup;
    private usuarioAutenticado!: IUsuarioAutenticado;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _usuarioService: UsuariosService,
        private readonly _usuarioLogadoService: UsuarioLogadoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _toastService: ToastrService
    ) { }

    ngOnInit() {
        this.usuarioAutenticado = this._usuarioLogadoService.getDadosSession().usuario;
        this.formGroup = this._formBuilder.group({
            nome: [this.usuarioAutenticado.nome, [Validators.required, Validators.maxLength(50)]],
            email: [this.usuarioAutenticado.email, [Validators.required, Validators.email]],
            ano: [this.usuarioAutenticado.anoEntradaRepublica, []]
        });
    }

    private trocaInformacoesUsuarioLogado() {
        const dadosSession = this._usuarioLogadoService.getDadosSession();
        dadosSession.usuario.email = this.formGroup.value.email;
        dadosSession.usuario.nome = this.formGroup.value.nome;
        this._usuarioLogadoService.setDadosSession(dadosSession);
    }

    public trocarImagem() {

    }

    public salvarDetalhesDoUsuario() {
        if (this.formGroup.valid) {
            const body: AtualizaUsuario = {
                nome: this.formGroup.value.nome,
                email: this.formGroup.value.email
            }

            this._usuarioService.putUsuarioId(+this.usuarioAutenticado.id, body).subscribe((res: any) => {
                if (res) {
                    this.trocaInformacoesUsuarioLogado();
                    this._toastService.success('Alterações salvas!', "Atualização Detalhes da Conta", {
                        timeOut: 3000,
                    });
                } else {
                    this._toastService.error('Dados do Usuário não foram atualizados!', "Atualização Detalhes da Conta", {
                        timeOut: 3000,
                    });
                }
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Atualização inválida", {
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



}