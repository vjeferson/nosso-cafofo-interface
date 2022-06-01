import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizaFesta} from '@app/api/models';
import { NovaFesta } from '@app/api/models/nova-festa';
import { FestasService} from '@app/api/services';
import { IOpcoesSituacao } from '@app/interfaces/opcoes-situacao.interface';
import { IFestaResult } from '@app/models/festa-result-interface';
import { EnumSituacaoFesta } from '@app/utils/enums';
import { Utilitarios } from '@app/utils/utils.service';
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
    
    public opcoesSituacao: IOpcoesSituacao[] = [
        {
            descricao: 'Em Aberto',
            valor: EnumSituacaoFesta.EmAberto
        },
        {
            descricao: 'Finalizada',
            valor: EnumSituacaoFesta.Finalizada
        },
        {
            descricao: 'Cancelada',
            valor: EnumSituacaoFesta.Cancelada
        }
    ];

    constructor(
        private readonly _formBuilder: FormBuilder,
        private _router: Router,
        private readonly _activeRoute: ActivatedRoute,
        public _service: FestasService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastService: ToastrService,
        private _localeService: BsLocaleService
    ) {
        this._localeService.use('pt-br');
        this.formGroup = this._formBuilder.group({
            descricao: [null, [Validators.required, Validators.maxLength(50)]],
            data: [new Date(), [Validators.required]],
            situacao: [EnumSituacaoFesta.EmAberto, []],
            valorTotal: [null, []]
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

    private preparaNovoRegistro() {
        this.dadosRegistroFiltrado = {};
        this.isNew = true;
    }

    private loadRegistro(idRegistro: number) {
        this._service.getFestaId(idRegistro).subscribe((res: any) => {
            if (res) {
                this.isNew = false;
                this.dadosRegistroFiltrado = res;
                this.formGroup.patchValue(this.preparaRegistroParaVisualizacao(this.dadosRegistroFiltrado));
                this._changeDetectorRef.detectChanges();
            } else {
                this._router.navigate([this.route]);
                this._toastService.error('Registro para a identificação informada não foi encontrado!', 'Busca de registro', {
                    timeOut: 3000,
                });
            }
        }, (err: any) => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : 'Cadastro inválido', {
                timeOut: 3000,
            });
        });
    }

    private preparaRegistroParaVisualizacao(registro: IFestaResult) {
        return {
            descricao: registro.descricao,
            data: new Date(registro.data),
            situacao: registro.situacao,
            vavalorTotal: registro.valorTotal
        }
    }

    public salvar() {
        if (this.formGroup.valid) {
            if (this.isNew) {
                const body: NovaFesta = this.trataDadosParaCadastro();

                this._service.postFesta(body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Registro inicial de festa inserido!', 'Cadastro Inicial', {
                            timeOut: 3000,
                        });
                        this.loadRegistro(res.id);
                    } else {
                        this._toastService.error('Cadastro inicial de festa não foi feito!', 'Cadastro Inicial', {
                            timeOut: 3000,
                        });
                    }
                }, (err: any) => {
                    this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                        err.error && err.error.error ? err.error.error : 'Cadastro inválido', {
                        timeOut: 3000,
                    });
                });
            } else {
                const body: AtualizaFesta = this.trataDadosParaSalvar();
                this._service.putFestaId(+this.dadosRegistroFiltrado.id, body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Alterações salvas!', 'Atualização', {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Dados da Festa não foram atualizados!', 'Atualização', {
                            timeOut: 3000,
                        });
                    }
                    this._router.navigate([this.route]);
                }, (err: any) => {
                    this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                        err.error && err.error.error ? err.error.error : 'Atualização inválida', {
                        timeOut: 3000,
                    });
                });
            }
        } else {
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error('Por favor preencha corretamente as informações', 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

    private trataDadosParaSalvar(): AtualizaFesta {
        return {
            descricao: this.formGroup.value.descricao,
            data: this.formGroup.value.data
        }
    }

    private trataDadosParaCadastro(): NovaFesta {
        return {
            descricao: this.formGroup.value.descricao,
            data: this.formGroup.value.data
        }
    }

    public voltar() {
        this._router.navigate([this.route]);
    }

}