import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizaMorador, NovaConta } from '@app/api/models';
import { AtualizaConta } from '@app/api/models/atualiza-conta';
import { ContasService, MoradoresService } from '@app/api/services';
import { Utilitarios } from '@app/utils/utils.service';
import moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-reunioes-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './reunioes-form.component.html',
    styleUrls: ['./reunioes-form.component.scss'],
})
export class ReunioesFormComponent implements OnInit {
    // private route: string = '/contas';
    // public dadosRegistroFiltrado: any;
    // public isNew: boolean = true;
    // public formGroup !: FormGroup | any;
    public title!: string;
    // public showSelectMorador: boolean = false;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private _router: Router,
        private readonly _activeRoute: ActivatedRoute,
        public _service: ContasService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastService: ToastrService,
        private _localeService: BsLocaleService
    ) {
        // this._localeService.use('pt-br');
        // this.formGroup = this._formBuilder.group({
        //     descricao: [null, [Validators.required, Validators.maxLength(70)]],
        //     situacao: [null, []],
        //     dataConta: [null, [Validators.required]],
        //     mesAnoDivisaoConta: [null, [Validators.required]],
        //     valor: [0, [Validators.required, Validators.min(0.01), Validators.maxLength(15)]],
        //     divisaoPorIgualEntreMoradores: [true, []],
        //     moradorId: [null, []]
        // });

        this._activeRoute.data.subscribe(data => {
            this.title = data.title;
        });

        // if (this._router.url.includes('visualizar')) {
        //     this.formGroup.disable();
        // }
    }

    ngOnInit() {
        // this._activeRoute.params.subscribe(params => {
        //     if (params['id'] && !isNaN(+params['id'])) {
        //         this.loadRegistro(+params['id']);
        //     } else {
        //         this.preparaNovoRegistro();
        //     }
        // });
    }

    // private preparaNovoRegistro() {
    //     this.dadosRegistroFiltrado = {};
    //     this.isNew = true;
    // }

    // private loadRegistro(idRegistro: number) {
    //     this._service.getContaId(idRegistro).subscribe((res: any) => {
    //         if (res) {
    //             this.isNew = false;
    //             this.dadosRegistroFiltrado = res;
    //             this.formGroup.patchValue(this.preparaRegistroParaVisualizacao(this.dadosRegistroFiltrado));
    //             this._changeDetectorRef.detectChanges();
    //         } else {
    //             this._router.navigate([this.route]);
    //             this._toastService.error('Registro para a identificação informada não foi encontrado!', "Busca de registro", {
    //                 timeOut: 3000,
    //             });
    //         }
    //     }, (err: any) => {
    //         this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
    //             err.error && err.error.error ? err.error.error : "Cadastro inválido", {
    //             timeOut: 3000,
    //         });
    //     });
    // }

    // private preparaRegistroParaVisualizacao(registro: any) {
    //     this.changeDivisaoEntreMoradores({
    //         currentTarget: { checked: registro.divisaoPorIgualEntreMoradores }
    //     });
        
    //     return {
    //         descricao: registro.descricao,
    //         situacao: registro.situacao,
    //         dataConta: new Date(registro.dataConta),
    //         mesAnoDivisaoConta: registro.mesAnoDivisaoConta,
    //         valor: registro.valor,
    //         divisaoPorIgualEntreMoradores: registro.divisaoPorIgualEntreMoradores,
    //         moradorId: registro.moradorId
    //     }
    // }

    // public changeDivisaoEntreMoradores(event: any) {
    //     if (event?.currentTarget?.checked) {
    //         this.showSelectMorador = false;
    //         this.formGroup.get('moradorId').setValue(null);
    //         this.formGroup.get('moradorId').clearValidators();
    //         this.formGroup.get('moradorId').updateValueAndValidity();
    //         return;
    //     }
    //     this.formGroup.get('moradorId').setValidators(Validators.required);
    //     this.showSelectMorador = true;
    // }

    // public salvar() {
    //     if (this.formGroup.valid) {
    //         if (this.isNew) {
    //             const body: NovaConta = this.trataDadosParaCadastro();

    //             this._service.postConta(body).subscribe((res: any) => {
    //                 if (res) {
    //                     this._toastService.success('Registro inserido!', "Cadastro", {
    //                         timeOut: 3000,
    //                     });
    //                 } else {
    //                     this._toastService.error('Cadastro da não foi feito!', "Cadastro", {
    //                         timeOut: 3000,
    //                     });
    //                 }
    //                 this._router.navigate([this.route]);
    //             }, (err: any) => {
    //                 this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
    //                     err.error && err.error.error ? err.error.error : "Cadastro inválido", {
    //                     timeOut: 3000,
    //                 });
    //             });
    //         } else {
    //             const body: AtualizaConta = this.trataDadosParaSalvar();
    //             this._service.putContaId(+this.dadosRegistroFiltrado.id, body).subscribe((res: any) => {
    //                 if (res) {
    //                     this._toastService.success('Alterações salvas!', "Atualização", {
    //                         timeOut: 3000,
    //                     });
    //                 } else {
    //                     this._toastService.error('Dados da Conta não foram atualizados!', "Atualização", {
    //                         timeOut: 3000,
    //                     });
    //                 }
    //                 this._router.navigate([this.route]);
    //             }, (err: any) => {
    //                 this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
    //                     err.error && err.error.error ? err.error.error : "Atualização inválida", {
    //                     timeOut: 3000,
    //                 });
    //             });
    //         }
    //     } else {
    //         Utilitarios.validateAllFormFields(this.formGroup);
    //         this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
    //             timeOut: 3000
    //         });
    //     }
    // }

    // private trataDadosParaSalvar(): AtualizaConta {
    //     return {
    //         descricao: this.formGroup.value.descricao,
    //         dataConta: moment(this.formGroup.value.dataConta).format('YYYY-MM-DD'),
    //         mesAnoDivisaoConta: typeof this.formGroup.value.mesAnoDivisaoConta === 'string' ? this.formGroup.value.mesAnoDivisaoConta :
    //             `${String(this.formGroup.value.mesAnoDivisaoConta.getMonth() + 1).padStart(2, '0')}${this.formGroup.value.mesAnoDivisaoConta.getFullYear()}`,
    //         valor: this.formGroup.value.valor,
    //         divisaoPorIgualEntreMoradores: this.formGroup.value.divisaoPorIgualEntreMoradores,
    //         moradorId: this.formGroup.value.moradorId ? this.formGroup.value.moradorId.id : null
    //     }
    // }

    // private trataDadosParaCadastro(): NovaConta {
    //     return {
    //         descricao: this.formGroup.value.descricao,
    //         dataConta: moment(this.formGroup.value.dataConta).format('YYYY-MM-DD'),
    //         mesAnoDivisaoConta:
    //             `${String(this.formGroup.value.mesAnoDivisaoConta.getMonth() + 1).padStart(2, '0')}${this.formGroup.value.mesAnoDivisaoConta.getFullYear()}`,
    //         valor: this.formGroup.value.valor,
    //         divisaoPorIgualEntreMoradores: this.formGroup.value.divisaoPorIgualEntreMoradores,
    //         moradorId: this.formGroup.value.moradorId ? this.formGroup.value.moradorId.id : null
    //     }
    // }

    // voltar() {
    //     this._router.navigate([this.route]);
    // }

}