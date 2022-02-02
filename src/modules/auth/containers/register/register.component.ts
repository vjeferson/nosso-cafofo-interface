import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovoCliente } from '@app/api/models';
import { ClientesService } from '@app/api/services';
import { Utilitarios } from '@app/utils/utils.service';
import { SelectCidadeComponent } from '@common/components';
import { UsuarioLogadoService } from '@common/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
    @ViewChild('selectCidade', { static: true }) selectCidade: SelectCidadeComponent | any;
    public formGroup: FormGroup | any;
    public estadoId: string | any;
    public mensagemAnoMaximoAnoCriacao: string;

    constructor(
        private readonly _clienteService: ClientesService,
        private readonly _formBuilder: FormBuilder,
        private readonly _toastService: ToastrService,
        private readonly _router: Router,
        private readonly _usuarioLogadoService: UsuarioLogadoService
    ) {
        this.mensagemAnoMaximoAnoCriacao = `Valor máximo: ${(new Date()).getFullYear()}`;
        this.formGroup = this._formBuilder.group({
            nome: [null, [Validators.required, Validators.maxLength(50)]],
            nomeRepublica: [null, [Validators.required, Validators.maxLength(50)]],
            anoCriacaoRepublica: [null, [Validators.required, Validators.min(1900), Validators.max((new Date()).getFullYear())]],
            diaPagamentoContas: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
            anoEntradaMorador: [null, [Validators.required, this.validaAnoEntrada.bind(this)]],
            logradouro: [null, [Validators.required, Validators.maxLength(70)]],
            complemento: [null, [Validators.maxLength(45)]],
            numero: [null, [Validators.required, Validators.maxLength(10)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(70)]],
            senha: [null, [Validators.required, Validators.minLength(8)]],
            confirmaSenha: [null, [Validators.required, Validators.minLength(8), this.confirmaSenha.bind(this)]],
            estadoId: [null, [Validators.required]],
            cidadeId: [null, [Validators.required]],
            planoId: [14, []]
        });
    }

    ngOnInit() { }

    private validaAnoEntrada(formControl: FormControl) {
        if (!this.formGroup) {
            return null;
        }

        return (formControl.value >= this.formGroup.get('anoCriacaoRepublica').value) ? null : { anoEntradaInvalido: true };
    }
    
    private confirmaSenha(formControl: FormControl) {
        if (!this.formGroup) {
            return null;
        }

        return (formControl.value === this.formGroup.get('senha').value) ? null : { confirmar: true };
    }

    private trataDadosParaCadastro(): NovoCliente {
        return {
            anoCriacaoRepublica: this.formGroup.value.anoCriacaoRepublica,
            anoEntradaMorador: this.formGroup.value.anoEntradaMorador,
            cidadeId: this.formGroup.value.cidadeId ? this.formGroup.value.cidadeId.id : this.formGroup.value.cidadeId,
            complemento: this.formGroup.value.complemento,
            diaPagamentoContas: this.formGroup.value.diaPagamentoContas,
            email: this.formGroup.value.email,
            estadoId: this.formGroup.value.estadoId ? this.formGroup.value.estadoId.id : this.formGroup.value.estadoId,
            logradouro: this.formGroup.value.logradouro,
            nome: this.formGroup.value.nome,
            nomeRepublica: this.formGroup.value.nomeRepublica,
            numero: this.formGroup.value.numero,
            senha: this.formGroup.value.senha,
            planoId: this.formGroup.value.planoId ? this.formGroup.value.planoId.id : null
        }
    }

    public cadastrar() {
        if (this.formGroup.valid) {
            const parametros: NovoCliente = this.trataDadosParaCadastro();
            this._clienteService.postCliente(parametros).subscribe((res: any) => {
                if (res) {
                    this._usuarioLogadoService.setDadosSession(res);
                    this._router.navigate(['/']);
                }
            }, (err: any) => {
                this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                    err.error && err.error.error ? err.error.error : "Autenticação inválida", {
                    timeOut: 3000,
                });
            });
        } else {
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000,
            });
        }
    }

    public getEstadoSelecionado(estado: any) {
        this.estadoId = estado ? estado.id : null;
        this.formGroup.get('cidadeId')?.setValue(null);
        if (this.selectCidade) {
            this.selectCidade.estadoId = estado ? estado.id : null;
            this.selectCidade.pesquisa(null);
        }
    }

}
