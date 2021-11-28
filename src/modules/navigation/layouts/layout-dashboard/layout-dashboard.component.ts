import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { UsuarioLogadoService } from '@common/services';
import { sideNavItems, sideNavSections } from '@modules/navigation/data';
import { SideNavItems } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { SideNavItem } from '@testing/mocks';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-layout-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-dashboard.component.html',
    styleUrls: ['layout-dashboard.component.scss'],
})
export class LayoutDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    sideNavItems: SideNavItems;
    sideNavItemsData = sideNavItems;
    sideNavSections = sideNavSections;
    sidenavStyle = 'sb-sidenav-principal';
    private usuario: IUsuarioAutenticado;

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        private usuarioLogadoService: UsuarioLogadoService
    ) {
        this.usuario = this.usuarioLogadoService.getDadosSession().usuario;
        this.sideNavItems = this.filtraMenuNavegacaoLateral();
    }

    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.subscription.add(
            this.navigationService.sideNavVisible$().subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private filtraMenuNavegacaoLateral(): SideNavItems {
        const itemsNavegacao = Object.assign({}, this.sideNavItemsData);
        for (const sideNavItemKey in itemsNavegacao) {
            if (!this.deixaSideNavItem(itemsNavegacao[sideNavItemKey])) {
                delete itemsNavegacao[sideNavItemKey];
            }
        }
        return itemsNavegacao;
    }

    private deixaSideNavItem(sideNavItem: SideNavItem): boolean {
        return sideNavItem.tipoPerfil.indexOf(this.usuario.tipoPerfil) > -1;
    }

}
