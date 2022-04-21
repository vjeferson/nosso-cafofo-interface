/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ReunioesModule } from './reunioes.module';

/* Containers */
import * as containers from './containers';

/* Guards */
import { ReunioesGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Reuniões',
            breadcrumbs: [
                {
                    text: 'Reuniões',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [ReunioesGuard],
        component: containers.ReunioesComponent
    },
    {
        path: 'cadastro',
        data: {
            title: 'Cadastro de Reuniões',
            breadcrumbs: [
                {
                    text: 'Reuniões',
                    link: '/reunioes',
                },
                {
                    text: 'Cadastro',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [ReunioesGuard],
        component: containers.ReunioesFormComponent
    },
    {
        path: 'edicao',
        data: {
            title: 'Edição de Reuniões',
            breadcrumbs: [
                {
                    text: 'Reuniões',
                    link: '/reunioes',
                },
                {
                    text: 'Edição',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [ReunioesGuard],
        component: containers.ReunioesFormComponent
    }
];

@NgModule({
    imports: [ReunioesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ReunioesRoutingModule { }