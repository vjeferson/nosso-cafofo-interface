import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFiltroUsuarios } from '@app/models/search-usuarios';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-filtros-usuarios',
    templateUrl: './filtros-usuarios-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FiltrosUsuariosNgbdModal implements AfterViewInit {
    @ViewChild('content', { static: true }) content!: NgbModal | any;
    @Output() searchOutput = new EventEmitter<any>();
    @Input() filtros!: IFiltroUsuarios;
    formGroup!: FormGroup;

    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this.formGroup = this._formBuilder.group({
            ativo: [null, []]
        });
    }

    ngAfterViewInit() {
        this.formGroup.patchValue(this.filtros);
    }

    open() {
        this.modalService.open(this.content, { centered: true });
        if (this.filtros.ativo == null) {
            (this.filtros as any).ativo = 'todos';
        }
        this.formGroup.patchValue(this.filtros);
    }

    search() {
        this.close();
        this.trataFiltrosParaPesquisa();
        this.searchOutput.next();
    }

    private trataFiltrosParaPesquisa() {
        this.filtros.ativo = this.formGroup.value.ativo && this.formGroup.value.ativo.valor !== 'todos' ?
            this.formGroup.value.ativo.valor : undefined;
    }

    close() {
        this.modalService.dismissAll();
    }

}