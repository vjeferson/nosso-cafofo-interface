import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFiltroAssinantes } from '@app/models/search-assinantes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-filtros-assinantes',
    templateUrl: './filtros-assinantes-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FiltrosAssinantesNgbdModal implements AfterViewInit {
    @ViewChild('content', { static: true }) content!: NgbModal | any;
    @Output() searchOutput = new EventEmitter<any>();
    @Input() filtros!: IFiltroAssinantes;
    formGroup!: FormGroup;

    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            anoCriacao: [null, []],
            dataPagamentoContas: [null, []],
            tipoPlanoAtivo: [null, []],
        });
    }

    ngAfterViewInit() {
        this.formGroup.patchValue(this.filtros);
    }

    open() {
        this.formGroup.patchValue(this.filtros);
        this.modalService.open(this.content, { centered: true });
    }

    search() {
        this.close();
        this.trataFiltrosParaPesquisa();
        this.searchOutput.next();
    }

    private trataFiltrosParaPesquisa() {
        this.filtros.tipoPlanoAtivo = this.formGroup.value.tipoPlanoAtivo ?
            this.formGroup.value.tipoPlanoAtivo.codigoTipoPlano || this.formGroup.value.tipoPlanoAtivo : undefined;
        this.filtros.dataPagamentoContas = this.formGroup.value.dataPagamentoContas;
        this.filtros.anoCriacao = this.formGroup.value.anoCriacao;
    }

    close() {
        this.modalService.dismissAll();
    }

}