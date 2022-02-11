/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { MoradoresModule } from './moradores.module';

/* Containers */
import * as moradoresContainers from './containers';

/* Guards */
import { MoradoresGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Moradores',
            breadcrumbs: [
                {
                    text: 'Moradores',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [MoradoresGuard],
        component: moradoresContainers.MoradoresComponent
    },
    {
        path: 'cadastro',
        data: {
            title: 'Cadastro de Morador',
            breadcrumbs: [
                {
                    text: 'Moradores',
                    link: '/moradores',
                },
                {
                    text: 'Cadastro',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [MoradoresGuard],
        component: moradoresContainers.MoradoresFormComponent
    },
    {
        path: 'edicao',
        data: {
            title: 'Edição de Morador',
            breadcrumbs: [
                {
                    text: 'Moradores',
                    link: '/moradores',
                },
                {
                    text: 'Edição',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [MoradoresGuard],
        component: moradoresContainers.MoradoresFormComponent
    }
];

@NgModule({
    imports: [MoradoresModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class MoradoresRoutingModule { }