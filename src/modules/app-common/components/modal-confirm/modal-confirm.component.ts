import { Component, Output, EventEmitter, Input, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { EnumAcoesModalConfirmacao } from "@app/utils/enums";
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
    @Input() acao!: EnumAcoesModalConfirmacao;

    public socialType!: string;
    public idRegistro!: number;

    constructor(
        private _modalService: NgbModal
    ) { }

    open() {
        this._modalService.open(this.content, { centered: true });
    }

    confirmar() {
        this.close();
        this.confirma.next(this.preparaEventoRetorno());
    }

    private preparaEventoRetorno(): any{
        switch(this.acao){
            case EnumAcoesModalConfirmacao.Exclusao:
                return this.idRegistro;
            default:
                return this.socialType;
        }
    }

    close() {
        this._modalService.dismissAll();
    }

}