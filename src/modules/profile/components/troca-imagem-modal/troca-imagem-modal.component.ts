import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '@app/api/services';
import { Utilitarios } from '@app/utils/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ngbd-modal-troca-imagem',
    templateUrl: './troca-imagem-modal.component.html',
    styleUrls: ['./troca-imagem-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TrocaImagemNgbdModal implements AfterViewInit {
    @Output() emitChildrenEvent = new EventEmitter<any>();
    @Input() profileUrlImage!: string;

    public formGroup!: FormGroup;

    constructor(
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _usuarioService: UsuariosService,
        private _toastService: ToastrService
    ) {
        this.formGroup = this._formBuilder.group({
            file: [null, [Validators.required]],
            fileSource: [null, [Validators.required]]
        });
    }

    ngAfterViewInit() {}

    salvar() {
        if (this.formGroup.valid) {
            const formData = new FormData();
            formData.append('profileImage', this.formGroup.value.fileSource);
          
            this._usuarioService.postUsuarioTrocaImagemProfile(formData).subscribe((res: any) => {
                if (res) {
                    this._modalService.dismissAll(res);
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
            Utilitarios.validateAllFormFields(this.formGroup);
            this._toastService.error("Por favor preencha corretamente as informações", 'Formulário inválido!', {
                timeOut: 3000
            });
        }
    }

    public changeImage(event:any){
        console.log(event)

        const reader = new FileReader();
    
        if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        
        reader.onload = () => {
                this.profileUrlImage = reader.result as string;
            
                this.formGroup.patchValue({
                    fileSource: reader.result
                });
            };
        }
    }

    // private trataFiltrosParaPesquisa() {
    //     this.filtros.anoEntrada = this.formGroup.value.anoEntrada;
    //     this.filtros.ativo = this.formGroup.value.ativo && this.formGroup.value.ativo.valor !== 'todos' ?
    //         this.formGroup.value.ativo.valor : undefined;
    // }

    close() {
        this._modalService.dismissAll();
    }

}