import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { IFiltroPlanos } from '@app/models/search-planos';
import { EnumTipoPlano } from '@app/utils/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-filtros-planos',
    templateUrl: './filtros-planos-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FiltrosPlanosNgbdModal implements AfterViewInit {
    @ViewChild('content', { static: true }) content!: NgbModal | any;
    @Output() searchOutput = new EventEmitter<any>();
    @Input() filtros!: IFiltroPlanos;
    formGroup!: FormGroup;

    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            tipoPlano: [null, []]
        });
    }

    ngAfterViewInit() {
        this.formGroup.patchValue(this.filtros);
    }

    open() {
        this.modalService.open(this.content, { centered: true });
        this.formGroup.patchValue(this.filtros);
    }

    search() {
        this.close();
        this.trataFiltrosParaPesquisa();
        this.searchOutput.next();
    }

    private trataFiltrosParaPesquisa() {
        this.filtros.tipoPlano = this.formGroup.value.tipoPlano ?
            this.formGroup.value.tipoPlano.codigoTipoPlano || this.formGroup.value.tipoPlano : undefined;
    }

    close() {
        this.modalService.dismissAll();
    }

}