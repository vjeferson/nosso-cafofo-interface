/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { FestasModule } from './festas.module';

/* Containers */
import * as containers from './containers';

/* Guards */
import { FestasGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Festas',
            breadcrumbs: [
                {
                    text: 'Festas',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [FestasGuard],
        component: containers.FestasComponent
    },
    {
        path: 'cadastro',
        data: {
            title: 'Cadastro de Festas',
            breadcrumbs: [
                {
                    text: 'Festas',
                    link: '/festas',
                },
                {
                    text: 'Cadastro',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [FestasGuard],
        component: containers.FestasFormComponent
    },
    {
        path: 'edicao',
        data: {
            title: 'Edição de Festas',
            breadcrumbs: [
                {
                    text: 'Festas',
                    link: '/festas',
                },
                {
                    text: 'Edição',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [FestasGuard],
        component: containers.FestasFormComponent
    },
    {
        path: 'visualizar',
        data: {
            title: 'Visualização de Contas',
            breadcrumbs: [
                {
                    text: 'Contas',
                    link: '/festas',
                },
                {
                    text: 'Visualização',
                    active: true
                }
            ]
        } as SBRouteData,
        canActivate: [FestasGuard],
        component: containers.FestasFormComponent
    }
];

@NgModule({
    imports: [FestasModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class FestasRoutingModule { }