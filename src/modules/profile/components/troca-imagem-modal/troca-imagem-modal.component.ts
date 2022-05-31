import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '@app/api/services';
import { IRetornoAutenticacao } from '@app/models/retorno-autenticacao';
import { UploadFileService } from '@app/utils/upload-file.service';
import { Utilitarios } from '@app/utils/utils.service';
import { UsuarioLogadoService } from '@common/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ngbd-modal-troca-imagem',
    templateUrl: './troca-imagem-modal.component.html',
    styleUrls: ['./troca-imagem-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TrocaImagemNgbdModal implements AfterViewInit {
    private dadosSession: IRetornoAutenticacao;
    
    public profileUrlImage!: string;
    public formGroup!: FormGroup;

    constructor(
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _uploadFileService: UploadFileService,
        private _toastService: ToastrService,
        private _usuarioLogadoService: UsuarioLogadoService
    ) {
        this.dadosSession = this._usuarioLogadoService.getDadosSession();
        this.formGroup = this._formBuilder.group({
            file: [null, [Validators.required]],
            fileSource: [null, [Validators.required]]
        });
    }

    ngAfterViewInit() { }

    salvar() {
        if (this.formGroup.valid) {
            this._uploadFileService.upload(this.formGroup.value).subscribe((res: any) => {
                if (res) {
                    this.dadosSession.usuario.profileUrlImage = res;
                    this._usuarioLogadoService.setDadosSession(this.dadosSession);
                    this._uploadFileService.changeImage.next();
                    this.close();
                } else {
                    this._toastService.error('Senha não foi atualizada!', 'Troca de Senha', {
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
            debugger
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

    public changeImage(event: any) {
        console.log(event)

        const reader = new FileReader();

        if (event.target.value) {
            this.formGroup.patchValue({
                fileSource: <File>event.target.files[0]
            });
            const [file] = event.target.files;

            reader.readAsDataURL(file);
            reader.onload = () => { this.profileUrlImage = reader.result as string; };
        }
    }

    close() {
        this._modalService.dismissAll();
    }

}