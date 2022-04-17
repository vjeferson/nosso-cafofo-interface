import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFiltroMoradores } from '@app/models/search-moradores';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-filtros-moradores',
    templateUrl: './filtros-moradores-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FiltrosMoradoresNgbdModal implements AfterViewInit {
    @ViewChild('content', { static: true }) content!: NgbModal | any;
    @Output() searchOutput = new EventEmitter<any>();
    @Input() filtros!: IFiltroMoradores;
    formGroup!: FormGroup;

    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            anoEntrada: [null, []],
            ativo: [null, []]
        });
    }

    ngAfterViewInit() {
        this.formGroup.patchValue(this.filtros);
    }

    open() {
        if (this.filtros.ativo == null) {
            (this.filtros as any).ativo = 'todos';
        }
        this.formGroup.patchValue(this.filtros);
        this.modalService.open(this.content, { centered: true });
    }

    search() {
        this.close();
        this.trataFiltrosParaPesquisa();
        this.searchOutput.next();
    }

    private trataFiltrosParaPesquisa() {
        this.filtros.anoEntrada = this.formGroup.value.anoEntrada;
        this.filtros.ativo = this.formGroup.value.ativo && this.formGroup.value.ativo.valor !== 'todos' ?
            this.formGroup.value.ativo.valor : undefined;
    }

    close() {
        this.modalService.dismissAll();
    }

}