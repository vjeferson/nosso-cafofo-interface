import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizaPlano, NovoPlano } from '@app/api/models';
import { PlanosService } from '@app/api/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-planos-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './planos-form.component.html',
    styleUrls: ['./planos-form.component.scss'],
})
export class PlanosFormComponent implements OnInit {
    private routePlanos: string = '/planos';
    public dadosRegistroFiltrado: any;
    public isNew: boolean = true;
    public formGroup !: FormGroup;
    public title!: string;

    constructor(
        private readonly formBuilder: FormBuilder,
        private router: Router,
        private readonly activeRoute: ActivatedRoute,
        public service: PlanosService,
        private changeDetectorRef: ChangeDetectorRef,
        private toastService: ToastrService
    ) {
        this.activeRoute.data.subscribe(data => {
            this.title = data.title;
        });
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            descricao: [null, [Validators.required, Validators.maxLength(70)]],
            recorrencia: [null, [Validators.required, Validators.maxLength(70)]],
            tipoPlano: [null, [Validators.required]],
            numeroMaximoParcelasPagamento: [null, [Validators.required]],
            valorPlano: [null, [Validators.required]],
            ativo: [false, []]
        });

        this.activeRoute.params.subscribe(params => {
            if (params['id'] && !isNaN(+params['id'])) {
                this.loadRegistro(+params['id']);
            } else {
                this.preparaNovoRegistro();
            }
        });
    }

    private preparaNovoRegistro() {
        this.dadosRegistroFiltrado = {};
        this.isNew = true;
    }

    private loadRegistro(idRegistro: number) {
        this.service.getPlanoId(idRegistro).subscribe((res: any) => {
            if (res) {
                this.isNew = false;
                this.dadosRegistroFiltrado = res;
                this.formGroup.patchValue(this.dadosRegistroFiltrado);
                this.changeDetectorRef.detectChanges();
            } else {
                this.router.navigate([this.routePlanos]);
                this.toastService.error('Registro para a identificação informada não foi encontrado!', "Busca de registro", {
                    timeOut: 3000,
                });
            }
        }, (err: any) => {
            this.toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Cadastro inválido", {
                timeOut: 3000,
            });
        });
    }

    private trataDadosParaAbrirNoFormulario() {

    }

    salvar() {
        if (this.formGroup.valid) {
            if (this.isNew) {
                const body: NovoPlano = this.trataDadosParaCadastro();
                this.service.postPlano(body).subscribe((res: any) => {
                    if (res) {
                        this.toastService.success('Registro inserido!', "Cadastro", {
                            timeOut: 3000,
                        });
                    } else {
                        this.toastService.error('Cadastro do Plano não foi feito!', "Cadastro", {
                            timeOut: 3000,
                        });
                    }
                    this.router.navigate([this.routePlanos]);
                }, (err: any) => {
                    this.toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                        err.error && err.error.error ? err.error.error : "Cadastro inválido", {
                        timeOut: 3000,
                    });
                });
            } else {
                const body: AtualizaPlano = this.trataDadosParaSalvar();
                this.service.putPlanoId(+this.dadosRegistroFiltrado.id, body).subscribe((res: any) => {
                    if (res) {
                        this.toastService.success('Alterações salvas!', "Atualização", {
                            timeOut: 3000,
                        });
                    } else {
                        this.toastService.error('Dados do Plano não foram atualizados!', "Atualização", {
                            timeOut: 3000,
                        });
                    }
                    this.router.navigate([this.routePlanos]);
                }, (err: any) => {
                    this.toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                        err.error && err.error.error ? err.error.error : "Atualização inválida", {
                        timeOut: 3000,
                    });
                });
            }
        }
    }

    private trataDadosParaSalvar(): AtualizaPlano {
        return {
            recorrencia: this.formGroup.value.recorrencia,
            descricao: this.formGroup.value.descricao
        }
    }

    private trataDadosParaCadastro(): NovoPlano {
        return {
            recorrencia: this.formGroup.value.recorrencia,
            descricao: this.formGroup.value.descricao,
            tipoPlano: this.formGroup.value.tipoPlano ?
                this.formGroup.value.tipoPlano.codigoTipoPlano || this.formGroup.value.tipoPlano : this.formGroup.value.tipoPlano,
            numeroMaximoParcelasPagamento: this.formGroup.value.numeroMaximoParcelasPagamento,
            valorPlano: this.formGroup.value.valorPlano
        }
    }

    voltar() {
        this.router.navigate([this.routePlanos]);
    }

}