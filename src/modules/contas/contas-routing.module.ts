/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ContasModule } from './contas.module';

/* Containers */
import * as contasContainers from './containers';

/* Guards */
import { ContasGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Contas',
            breadcrumbs: [
                {
                    text: 'Contas',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [ContasGuard],
        component: contasContainers.ContasComponent
    },
    {
        path: 'cadastro',
        data: {
            title: 'Cadastro de Contas',
            breadcrumbs: [
                {
                    text: 'Contas',
                    link: '/contas',
                },
                {
                    text: 'Cadastro',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [ContasGuard],
        component: contasContainers.ContasFormComponent
    },
    {
        path: 'edicao',
        data: {
            title: 'Edição de Contas',
            breadcrumbs: [
                {
                    text: 'Contas',
                    link: '/contas',
                },
                {
                    text: 'Edição',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [ContasGuard],
        component: contasContainers.ContasFormComponent
    }
];

@NgModule({
    imports: [ContasModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ContasRoutingModule { }