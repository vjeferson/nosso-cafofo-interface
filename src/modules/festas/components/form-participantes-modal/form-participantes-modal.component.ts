import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoParticipanteFesta } from '@app/api/models';
import { ParticipantesFestaService } from '@app/api/services';
import { EnumLoteFesta, EnumSituacaoPagamentoParticipanteFesta } from '@app/utils/enums';
import { UploadFileService } from '@app/utils/upload-file.service';
import { Utilitarios } from '@app/utils/utils.service';
import { UsuarioLogadoService } from '@common/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ngbd-modal-form-participantes-festa',
    templateUrl: './form-participantes-modal.component.html',
    styleUrls: ['./form-participantes-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormParticipantesFestaNgbdModal implements AfterViewInit {
    public formGroup!: FormGroup;
    public festaId!:number;
    public isNew: boolean = true;

    constructor(
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _service: ParticipantesFestaService,
        private _toastService: ToastrService
    ) {
        this.formGroup = this._formBuilder.group({
            nome: [null, [Validators.required]],
            valor: [null, [Validators.required]],
            lote: [EnumLoteFesta.Primeiro, [Validators.required]],
            situacao: [EnumSituacaoPagamentoParticipanteFesta.EmAberto, [Validators.required]],
            festaId: [null, [Validators.required]]
        });    
    }

    ngAfterViewInit() {
        this.formGroup.patchValue({festaId: this.festaId});
        console.log(this.formGroup.value)
    }

    public salvar() {
        if (this.formGroup.valid) {
            if (this.isNew) {
                const body: NovoParticipanteFesta = this.trataDadosParaCadastro();

                this._service.postParticipantesFesta(body).subscribe((res: any) => {
                    if (res) {
                        this._toastService.success('Participante inserido!', 'Cadastro', {
                            timeOut: 3000,
                        });
                    } else {
                        this._toastService.error('Cadastro não foi feito!', 'Cadastro', {
                            timeOut: 3000,
                        });
                    }
                    this._modalService.dismissAll('cadastro');
                }, (err: any) => {
                    this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                        err.error && err.error.error ? err.error.error : 'Cadastro inválido', {
                        timeOut: 3000,
                    });
                });
            } else {
                // const body: AtualizaFesta = this.trataDadosParaSalvar();
                // this._service.putFestaId(+this.dadosRegistroFiltrado.id, body).subscribe((res: any) => {
                //     if (res) {
                //         this._toastService.success('Alterações salvas!', 'Atualização', {
                //             timeOut: 3000,
                //         });
                //     } else {
                //         this._toastService.error('Dados da Festa não foram atualizados!', 'Atualização', {
                //             timeOut: 3000,
                //         });
                //     }
                //     this._router.navigate([this.route]);
                // }, (err: any) => {
                //     this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                //         err.error && err.error.error ? err.error.error : 'Atualização inválida', {
                //         timeOut: 3000,
                //     });
                // });
            }
        } else {
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error('Por favor preencha corretamente as informações', 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

    // private trataDadosParaSalvar(): AtualizaFesta {
    //     return {
    //         descricao: this.formGroup.value.descricao,
    //         data: this.formGroup.value.data
    //     }
    // }

    private trataDadosParaCadastro(): NovoParticipanteFesta {
        return {
            nome: this.formGroup.value.nome,
            valor: this.formGroup.value.valor,
            lote: this.formGroup.value.lote && this.formGroup.value.lote.descricao ? 
                this.formGroup.value.lote.valor : this.formGroup.value.lote,
            situacao: this.formGroup.value.situacao && this.formGroup.value.situacao.descricao ?
                this.formGroup.value.situacao.valor : this.formGroup.value.situacao,
            festaId: this.formGroup.value.festaId
        }
    }

    close() {
        this._modalService.dismissAll();
    }

}