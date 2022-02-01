import { Component, Output, EventEmitter, Input, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-confirmacao',
    templateUrl: './modal-confirm.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ConfirmacaoNgbdModal {
    @ViewChild('content', { static: true }) content!: NgbModal | any;
    @Output() confirma = new EventEmitter<any>();
    @Input() titulo!: string;
    @Input() conteudo!: string;
    
    public socialType!: string;

    constructor(
        private _modalService: NgbModal
    ) { }

    open() {
        this._modalService.open(this.content, { centered: true });
    }

    confirmar() {
        this.close();
        this.confirma.next(this.socialType ? this.socialType : null);
    }

    close() {
        this._modalService.dismissAll();
    }

}