import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-usuarios',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() { }

}