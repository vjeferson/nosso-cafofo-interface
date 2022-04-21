import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFiltroReunioes } from '@app/models/search-reunioes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-filtros-reunioes',
    templateUrl: './filtros-reunioes-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FiltrosReunioesNgbdModal implements AfterViewInit {
    @ViewChild('content', { static: true }) content!: NgbModal | any;
    @Output() searchOutput = new EventEmitter<any>();
    @Input() filtros!: IFiltroReunioes;
    formGroup!: FormGroup;

    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            data: [null, []]
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
        this.filtros.data = this.formGroup.value.data;
    }

    close() {
        this.modalService.dismissAll();
    }

}