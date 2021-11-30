import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sb-button-filtros',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './button-filtros.component.html',
    styleUrls: ['button-filtros.component.scss']
})
export class ButtonFiltrosComponent implements OnInit {
    @Output() openDialogFiltrar = new EventEmitter<any>();

    constructor() { }
    ngOnInit() { }

    filtrar() {
        console.log('open filtros');
        this.openDialogFiltrar.next();
    }

}
