import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFiltroContas } from '@app/models/search-contas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-filtros-contas',
    templateUrl: './filtros-contas-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FiltrosContasNgbdModal implements AfterViewInit {
    @ViewChild('content', { static: true }) content!: NgbModal | any;
    @Output() searchOutput = new EventEmitter<any>();
    @Input() filtros!: IFiltroContas;
    formGroup!: FormGroup;

    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            situacao: [null, []]
        });
    }

    ngAfterViewInit() {
        this.formGroup.patchValue(this.filtros);
    }

    open() {
        this.modalService.open(this.content, { centered: true });
        if (this.filtros.situacao == null) {
            (this.filtros as any).situacao = 'todos';
        }
        this.formGroup.patchValue(this.filtros);
    }

    search() {
        this.close();
        this.trataFiltrosParaPesquisa();
        this.searchOutput.next();
    }

    private trataFiltrosParaPesquisa() {
        this.filtros.situacao = this.formGroup.value.situacao && this.formGroup.value.situacao.valor !== 'todos' ?
        this.formGroup.value.situacao.valor : undefined;
    }

    close() {
        this.modalService.dismissAll();
    }

}