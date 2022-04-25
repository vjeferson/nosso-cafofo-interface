import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizaMorador, AtualizaReuniao, NovaConta, NovaReuniao } from '@app/api/models';
import { AtualizaConta } from '@app/api/models/atualiza-conta';
import { ContasService, MoradoresService, ReunioesService } from '@app/api/services';
import { IReuniaoResult } from '@app/models/reuniao-result-interface';
import { Utilitarios } from '@app/utils/utils.service';
import moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-festas-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './festas-form.component.html',
    styleUrls: ['./festas-form.component.scss'],
})
export class FestasFormComponent implements OnInit {
    private route: string = '/festas';
    public dadosRegistroFiltrado: any;
    public isNew: boolean = true;
    public formGroup !: FormGroup | any;
    public title!: string;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private _router: Router,
        private readonly _activeRoute: ActivatedRoute,
        public _service: ReunioesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastService: ToastrService,
        private _localeService: BsLocaleService
    ) {
        // this._localeService.use('pt-br');
        // this.formGroup = this._formBuilder.group({
        //     descricao: [null, [Validators.required, Validators.maxLength(50)]],
        //     data: [new Date(), [Validators.required]],
        //     anotacoes: [null, []]
        // });

        // this._activeRoute.data.subscribe(data => {
        //     this.title = data.title;
        // });
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
    //     this._service.getReuniaoId(idRegistro).subscribe((res: any) => {
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

    // private preparaRegistroParaVisualizacao(registro: IReuniaoResult) {
    //     return {
    //         descricao: registro.descricao,
    //         data: new Date(registro.data),
    //         anotacoes: registro.anotacoes
    //     }
    // }

    // public salvar() {
    //     if (this.formGroup.valid) {
    //         if (this.isNew) {
    //             const body: NovaReuniao = this.trataDadosParaCadastro();

    //             this._service.postReuniao(body).subscribe((res: any) => {
    //                 if (res) {
    //                     this._toastService.success('Registro inserido!', "Cadastro", {
    //                         timeOut: 3000,
    //                     });
    //                 } else {
    //                     this._toastService.error('Cadastro não foi feito!', "Cadastro", {
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
    //             const body: AtualizaReuniao = this.trataDadosParaSalvar();
    //             this._service.putReuniaoId(+this.dadosRegistroFiltrado.id, body).subscribe((res: any) => {
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

    // private trataDadosParaSalvar(): AtualizaReuniao {
    //     return {
    //         descricao: this.formGroup.value.descricao,
    //         data: this.formGroup.value.data,
    //         anotacoes: this.formGroup.value.anotacoes
    //     }
    // }

    // private trataDadosParaCadastro(): NovaReuniao {
    //     return {
    //         descricao: this.formGroup.value.descricao,
    //         data: this.formGroup.value.data,
    //         anotacoes: this.formGroup.value.anotacoes
    //     }
    // }

    // public voltar() {
    //     this._router.navigate([this.route]);
    // }

}