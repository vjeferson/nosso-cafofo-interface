import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssinantesService, PlanosService } from '@app/api/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-assinatura-ativa',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './assinatura-ativa.component.html',
    styleUrls: ['./assinatura-ativa.component.scss'],
})
export class AssinaturaAtivaComponent implements OnInit {
    constructor(
        private readonly _assinaturaService: AssinantesService,
        private readonly _planosService: PlanosService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _toastService: ToastrService
    ) { }

    ngOnInit() {

    }

}