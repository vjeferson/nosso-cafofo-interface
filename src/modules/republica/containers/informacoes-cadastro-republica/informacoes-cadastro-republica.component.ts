import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AtualizaRepublica } from '@app/api/models';
import { RepublicasService } from '@app/api/services';
import { Utilitarios } from '@app/utils/utils.service';
import { SelectCidadeComponent } from '@common/components';
import { UsuarioLogadoService } from '@common/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-republica-informacoes-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './informacoes-cadastro-republica.component.html',
    styleUrls: ['./informacoes-cadastro-republica.component.scss'],
})
export class InformacoesCadastroRepublicaComponent implements OnInit {
    @ViewChild('selectCidade', { static: true }) selectCidade: SelectCidadeComponent | any;

    private republicaId: number;

    public estadoId: string | any;
    public formGroup !: FormGroup;
    public mensagemAnoMaximoAnoCriacao: string;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _republicaService: RepublicasService,
        private readonly _usuarioLogadoService: UsuarioLogadoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _toastService: ToastrService
    ) {
        this.republicaId = this._usuarioLogadoService.getDadosSession()?.usuario?.republicaId;
        this.mensagemAnoMaximoAnoCriacao = `Valor máximo: ${(new Date()).getFullYear()}`;
    }

    ngOnInit() {
        this.loadRegistro(this.republicaId);
        this.formGroup = this._formBuilder.group({
            nome: [null, [Validators.required, Validators.maxLength(50)]],
            logradouro: [null, [Validators.required, Validators.maxLength(70)]],
            complemento: [null, [Validators.maxLength(45)]],
            numero: [null, [Validators.required]],
            estadoId: [null, [Validators.required]],
            cidadeId: [null, [Validators.required]],
            anoCriacao: [null, [Validators.required, Validators.min(1900), Validators.max((new Date()).getFullYear())]],
            dataPagamentoContas: [null, [Validators.required, Validators.min(1), Validators.max(31)]]
        });
    }

    private loadRegistro(idRegistro: number) {
        this._republicaService.getRepublicaInformacoesCadastroId(idRegistro).subscribe((res: any) => {
            if (res) {
                const dadosTratados = this.trataDadosParaAbrirNoFormulario(res)
                this.formGroup.patchValue(dadosTratados);
                this._changeDetectorRef.detectChanges();
            } else {
                this._router.navigate(['/']);
                this._toastService.error('Registro da República não foi encontrado!', "Busca de registro", {
                    timeOut: 3000
                });
            }
        }, (err: any) => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Cadastro inválido", {
                timeOut: 3000
            });
        });
    }

    private trataDadosParaAbrirNoFormulario(dados: any): any {
        if (dados.estado) {
            this.estadoId = dados.estado.id;
            dados.estadoId = dados.estado;
        }
        dados.cidadeId = dados.cidade ? dados.cidade : dados.cidadeId;
        return dados;
    }

    private trataDadosParaSalvar(): AtualizaRepublica {
        const dados = this.formGroup.value;
        return {
            nome: dados.nome,
            anoCriacao: dados.anoCriacao,
            dataPagamentoContas: dados.dataPagamentoContas,
            logradouro: dados.logradouro,
            numero: dados.numero,
            complemento: dados.complemento,
            estadoId: dados.estadoId ? dados.estadoId.id : dados.estadoId,
            cidadeId: dados.cidadeId ? dados.cidadeId.id : dados.cidadeId
        };
    }

    public getEstadoSelecionado(estado: any) {
        this.estadoId = estado ? estado.id : null;
        this.formGroup.get('cidadeId')?.setValue(null);
        if (this.selectCidade) {
            this.selectCidade.estadoId = estado ? estado.id : null;
            this.selectCidade.pesquisa(null);
        }
    }

    public salvar() {
        debugger
        if (this.formGroup.valid) {
            const body: AtualizaRepublica = this.trataDadosParaSalvar();
            debugger;
            this._republicaService.putRepublicaId(+this.republicaId, body).subscribe((res: any) => {
                if (res) {
                    this._toastService.success('Alterações salvas!', "Atualização", {
                        timeOut: 3000,
                    });
                } else {
                    this._toastService.error('Dados da República não foram atualizados!', "Atualização", {
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