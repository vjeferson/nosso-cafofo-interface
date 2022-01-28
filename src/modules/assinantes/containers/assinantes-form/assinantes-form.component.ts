import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssinantesService } from '@app/api/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-assinantes-view-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './assinantes-form.component.html',
    styleUrls: ['./assinantes-form.component.scss'],
})
export class AssinantesFormComponent implements OnInit {
    private route: string = '/assinantes';
    public formGroup !: FormGroup;
    public title!: string;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _activeRoute: ActivatedRoute,
        public _service: AssinantesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastService: ToastrService
    ) {
        this._activeRoute.data.subscribe(data => {
            this.title = data.title;
        });
    }

    ngOnInit() {
        this.formGroup = this._formBuilder.group({
            nome: [null, []],
            anoCriacao: [null, []],
            tipoPlano: [null, []],
            dataPagamentoContas: [null, []]
        });

        this._activeRoute.params.subscribe(params => {
            if (params['id'] && !isNaN(+params['id'])) {
                this.loadRegistro(+params['id']);
            } else {
                this._toastService.error('Código para filtrar registro inválido!',
                    'Visualização inválida', {
                    timeOut: 3000
                });
                this.voltar();
            }
        });
    }

    private loadRegistro(idRegistro: number) {
        this._service.getAssinantesId(idRegistro).subscribe((res: any) => {
            if (res) {
                this.formGroup.patchValue(res);
                this._changeDetectorRef.detectChanges();
            } else {
                this._router.navigate([this.route]);
                this._toastService.error('Registro para a identificação informada não foi encontrado!', "Busca de registro", {
                    timeOut: 3000,
                });
            }
        }, (err: any) => {
            this._toastService.error(err.error && err.error.message ? err.error.message : 'Dados inválidos!',
                err.error && err.error.error ? err.error.error : "Cadastro inválido", {
                timeOut: 3000,
            });
        });
    }

    voltar() {
        this._router.navigate([this.route]);
    }

}