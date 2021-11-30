import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-button-cadastro',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './button-cadastro.component.html',
    styleUrls: ['button-cadastro.component.scss'],
})
export class ButtonCadastroComponent implements OnInit {
    @Input() route: string | any;

    constructor(private readonly router: Router) { }
    ngOnInit() { }

}
