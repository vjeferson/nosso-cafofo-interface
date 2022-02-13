/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { UsuariosModule } from './usuarios.module';

/* Containers */
import * as usuariosContainers from './containers';

/* Guards */
import { UsuariosGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Usuários',
            breadcrumbs: [
                {
                    text: 'Usuários',
                    active: true
                }
            ],
        } as SBRouteData,
        canActivate: [UsuariosGuard],
        component: usuariosContainers.UsuariosComponent
    },
    {
        path: 'cadastro',
        data: {
            title: 'Cadastro de Usuário',
            breadcrumbs: [
                {
                    text: 'Usuários',
                    link: '/usuarios',
                },
                {
                    text: 'Cadastro',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [UsuariosGuard],
        component: usuariosContainers.UsuariosFormComponent
    },
    {
        path: 'edicao',
        data: {
            title: 'Edição de Usuário',
            breadcrumbs: [
                {
                    text: 'Usuários',
                    link: '/usuarios',
                },
                {
                    text: 'Edição',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [UsuariosGuard],
        component: usuariosContainers.UsuariosFormComponent
    }
];

@NgModule({
    imports: [UsuariosModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }