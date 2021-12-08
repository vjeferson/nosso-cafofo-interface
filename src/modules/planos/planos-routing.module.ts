/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { PlanosModule } from './planos.module';

/* Containers */
import * as planosContainers from './containers';

/* Guards */
import { PlanosGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Planos',
            breadcrumbs: [
                {
                    text: 'Planos',
                    active: true,
                }
            ],
        } as SBRouteData,
        canActivate: [PlanosGuard],
        component: planosContainers.PlanosComponent
    },
    {
        path: 'cadastro',
        data: {
            title: 'Cadastro de Planos',
            breadcrumbs: [
                {
                    text: 'Planos',
                    link: '/planos',
                },
                {
                    text: 'Cadastro',
                    active: true,
                }
            ],
        } as SBRouteData,
        canActivate: [PlanosGuard],
        component: planosContainers.PlanosFormComponent
    },
    {
        path: 'edicao',
        data: {
            title: 'Edição de Planos',
            breadcrumbs: [
                {
                    text: 'Planos',
                    link: '/planos',
                },
                {
                    text: 'Edição',
                    active: true,
                }
            ],
        } as SBRouteData,
        canActivate: [PlanosGuard],
        component: planosContainers.PlanosFormComponent
    }
];

@NgModule({
    imports: [PlanosModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PlanosRoutingModule { }
