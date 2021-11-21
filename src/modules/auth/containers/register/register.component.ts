import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '@app/api/services';
import { SelectCidadeComponent } from '@common/components';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
    @ViewChild('selectCidade', { static: true }) selectCidade: SelectCidadeComponent | any;
    private formGroup: FormGroup;
    public estadoId: string | any;

    constructor(
        private readonly _clienteService: ClientesService,
        private readonly _formBuilder: FormBuilder,
        private readonly _toastService: ToastrService,
        private readonly _router: Router
    ) {
        this.formGroup = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email, Validators.maxLength(70)]],
            senha: [null, [Validators.required, Validators.minLength(8)]],
            confirmaSenha: [null, [Validators.required, Validators.minLength(8)]],
            nome: [null, [Validators.required, Validators.maxLength(50)]],
            nomeRepublica: [null, [Validators.required, Validators.maxLength(50)]],
            anoCriacaoRepublica: [null, [Validators.required, Validators.maxLength(8)]],
            diaPagamentoContas: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
            numero: [null, [Validators.required]],
            logradouro: [null, [Validators.required, Validators.maxLength(70)]],
            complemento: [null, [Validators.maxLength(45)]],
            estadoId: [null, [Validators.required]],
            cidadeId: [null, [Validators.required]],
            anoEntradaMorador: [null, [Validators.required]],
            planoId: [null, [Validators.required]]
        });
    }

    ngOnInit() { }

    public cadastrar() {
        if (this.formGroup.valid) {
            // const parametros: Autenticar = this.formGroup.value;
            // this._autenticacaoService.postAuthenticate(parametros).subscribe((res: any) => {
            //     this._router.navigate(['/']);
            // }, (err: any) => {
            //     this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
            //         err.error && err.error.error ? err.error.error : "Autenticação inválida", {
            //         timeOut: 3000,
            //     });
            // });
        } else {
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000,
            });
        }
    }

    getEstadoSelecionado(estado: any) {
        this.estadoId = estado ? estado.id : null;
        this.formGroup.get('cidadeId')?.setValue(null);
        if (this.selectCidade) {
            this.selectCidade.estadoId = estado ? estado.id : null;
            this.selectCidade.pesquisa(null);
        }
    }

}
