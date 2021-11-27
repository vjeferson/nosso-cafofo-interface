import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '@app/api/services';
import { UsuarioLogadoService } from '@common/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    @Input() usuario: any;

    constructor(private _router: Router, private readonly _usuarioLogadoService: UsuarioLogadoService) { }
    ngOnInit() { }

    sair() {
        this._usuarioLogadoService.logout();
        this._router.navigate(['/auth/login']);
    }

}
