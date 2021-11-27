import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { UsuarioLogadoService } from '@common/services';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    public usuario: IUsuarioAutenticado;

    constructor(private navigationService: NavigationService,
        private readonly _usuarioLogadoService: UsuarioLogadoService
    ) {
        this.usuario = this._usuarioLogadoService.getDadosSession().usuario;
    }

    ngOnInit() { }

    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }

}
