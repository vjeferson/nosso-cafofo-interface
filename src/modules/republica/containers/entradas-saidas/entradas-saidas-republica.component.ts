import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '@app/api/services';
import { UsuarioLogadoService } from '@common/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-republica-entradas-saidas',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './entradas-saidas-republica.component.html',
    styleUrls: ['./entradas-saidas-republica.component.scss'],
})
export class EntradasSaidasRepublicaComponent implements OnInit {
    public formGroup !: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly _usuarioService: UsuariosService,
        private readonly _usuarioLogadoService: UsuarioLogadoService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private toastService: ToastrService
    ) { }

    ngOnInit() {
        // this.usuarioAutenticado = this._usuarioLogadoService.getDadosSession().usuario;
        // this.formGroup = this.formBuilder.group({
        //     nome: [this.usuarioAutenticado.nome, [Validators.required, Validators.maxLength(50)]],
        //     email: [this.usuarioAutenticado.email, [Validators.required, Validators.email, Validators.maxLength(70)]],
        //     ano: [this.usuarioAutenticado.anoEntradaRepublica, [Validators.required]]
        // });
    }

}