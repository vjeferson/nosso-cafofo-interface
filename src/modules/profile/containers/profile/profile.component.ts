import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AtualizaUsuario, InformacaoDesvinculacaoAccountSocial, InformacaoVinculacaoAccountSocial, TrocaSenha } from '@app/api/models';
import { UsuariosService } from '@app/api/services';
import { ContaSocial } from '@app/models/account-social.models';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { Utilitarios } from '@app/utils/utils.service';
import { ConfirmacaoNgbdModal } from '@common/components';
import { UsuarioLogadoService } from '@common/services';
import { ContaSocialService } from '@common/services/conta-social.service';
import { TrocaImagemNgbdModal } from '@modules/profile/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-profile',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    @ViewChild('modalConfirmacao', { static: true }) modalConfirmacao: ConfirmacaoNgbdModal | any;
    //@ViewChild('modalTrocaImagem', { static: true }) modalTrocaImagem: TrocaImagemNgbdModal | any;

    private usuarioAutenticado!: IUsuarioAutenticado;
    public formGroup !: FormGroup;
    public formGroupTrocaSenha !: FormGroup | any;
    public facebookVinculado!: boolean;
    public googleVinculado!: boolean;
    public profileUrlImage!: any;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _usuarioService: UsuariosService,
        private readonly _contaSocialService: ContaSocialService,
        private readonly _usuarioLogadoService: UsuarioLogadoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastService: ToastrService,
        private _modalService: NgbModal
    ) {
        this.prepareInfoUsuario();
    }


    ngOnInit() {

        this.formGroup = this._formBuilder.group({
            nome: [this.usuarioAutenticado.nome, [Validators.required, Validators.maxLength(50)]],
            email: [this.usuarioAutenticado.email, [Validators.required, Validators.email]],
            ano: [this.usuarioAutenticado.anoEntradaRepublica, []]
        });

        this.formGroupTrocaSenha = this._formBuilder.group({
            senhaAtual: [null, [Validators.required, Validators.minLength(8)]],
            novaSenha: [null, [Validators.required, Validators.minLength(8)]],
            confirmarSenha: [null, [Validators.required, Validators.minLength(8), this.confirmaSenha.bind(this)]],
        });
    }

    private prepareInfoUsuario() {
        this.usuarioAutenticado = this._usuarioLogadoService.getDadosSession().usuario;
        this.facebookVinculado = this.usuarioAutenticado.facebookVinculado ? true : false;
        this.googleVinculado = this.usuarioAutenticado.googleVinculado ? true : false;
        this.profileUrlImage = (this.usuarioAutenticado as any)?.profileUrlImage || 'https://nosso-cafofo-public.s3.sa-east-1.amazonaws.com/images/profile/profile-default.png';
    }

    private confirmaSenha(formControl: FormControl) {
        if (!this.formGroupTrocaSenha) {
            return null;
        }

        return (formControl.value === this.formGroupTrocaSenha.get('novaSenha').value) ? null : { confirmar: true };
    }

    private trocaInformacoesUsuarioLogado(tipoConta: string | any = null, vincular: boolean = false) {
        const dadosSession = this._usuarioLogadoService.getDadosSession();
        if (tipoConta) {
            dadosSession.usuario[tipoConta === 'facebook' ? 'facebookVinculado' : 'googleVincualdo'] = vincular;
        } else {
            dadosSession.usuario.email = this.formGroup.value.email;
            dadosSession.usuario.nome = this.formGroup.value.nome;
        }
        this._usuarioLogadoService.setDadosSession(dadosSession);
        this.usuarioAutenticado = dadosSession.usuario;
    }

    private setStatusVinculacoes(tipoConta: string, vincular: boolean) {
        this.trocaInformacoesUsuarioLogado(tipoConta, vincular);
        this.facebookVinculado = this.usuarioAutenticado.facebookVinculado ? true : false;
        this.googleVinculado = this.usuarioAutenticado.googleVinculado ? true : false;
        this._changeDetectorRef.detectChanges();
    }

    private vinculando(infoConta: ContaSocial) {
        const body: InformacaoVinculacaoAccountSocial = {
            id: infoConta.id,
            socialType: infoConta.tipoConta
        };
        this._usuarioService.putUsuarioIdVincularAccountSocial(+this.usuarioAutenticado.id, body).subscribe((result: any) => {
            if (result) {
                this._toastService.success('Conta vinculada com sucesso!', "Vinculação", {
                    timeOut: 3000,
                });
                this.setStatusVinculacoes(infoConta.tipoConta, true);
            }
        }, (err: any) => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Vinculação inválida", {
                timeOut: 3000,
            });
        });
    }

    public vincularContaSocial(tipoConta: string) {
        if (tipoConta === 'facebook') {
            this._contaSocialService.autenticarComContaDoFacebook().then(
                (infoConta: ContaSocial) => {
                    if (infoConta) {
                        this.vinculando(infoConta);
                    }
                }
            );
        }
    }

    public desvincularContaSocial(infoTipoConta: string) {
        this.modalConfirmacao.socialType = infoTipoConta;
        this.modalConfirmacao.open();
    }

    public confirmaDesvinculacao(infoTipoConta: string) {
        this._usuarioService.putUsuarioIdDesvincularAccountSocial(this.usuarioAutenticado.id, {
            socialType: infoTipoConta
        } as InformacaoDesvinculacaoAccountSocial).subscribe((res: any) => {
            if (res) {
                this._toastService.success('Conta desvinculada com sucesso!', "Desvinculação", {
                    timeOut: 3000,
                });
                this.setStatusVinculacoes(infoTipoConta, false);
            }
        }, err => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Desvinculação inválida", {
                timeOut: 3000,
            });
        });
    }

    public trocarImagem() {
        const modalRef = this._modalService.open(TrocaImagemNgbdModal, { centered: true });
        modalRef.componentInstance.profileUrlImage = this.profileUrlImage;

        modalRef.result.then((response) => {
            this.profileUrlImage = null;
            this.prepareInfoUsuario();
            this._changeDetectorRef.detectChanges();
        }, (reason) => {
            this.profileUrlImage = null;
            this.prepareInfoUsuario();
            this._changeDetectorRef.detectChanges();
        });
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

    public salvarTrocaDeSenha() {
        if (this.formGroupTrocaSenha.valid) {
            const body: TrocaSenha = {
                senhaAtual: this.formGroupTrocaSenha.value.senhaAtual,
                novaSenha: this.formGroupTrocaSenha.value.novaSenha,
                confirmarSenha: this.formGroupTrocaSenha.value.confirmarSenha
            }

            this._usuarioService.putUsuarioIdTrocaSenha(+this.usuarioAutenticado.id, body).subscribe((res: any) => {
                if (res) {
                    this._toastService.success('Alterações salvas!', 'Troca de Senha', {
                        timeOut: 3000,
                    });
                } else {
                    this._toastService.error('Senha não foi atualizada!', 'Troca de Senha', {
                        timeOut: 3000,
                    });
                }
                this.formGroupTrocaSenha.patchValue({
                    senhaAtual: '',
                    novaSenha: '',
                    confirmarSenha: ''
                });
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Atualização inválida", {
                    timeOut: 3000,
                });
            });

        } else {
            Utilitarios.validateAllFormFields(this.formGroupTrocaSenha);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

}