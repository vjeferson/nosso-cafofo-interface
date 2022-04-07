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
    // {
    //     path: 'cadastro',
    //     data: {
    //         title: 'Cadastro de Morador',
    //         breadcrumbs: [
    //             {
    //                 text: 'Moradores',
    //                 link: '/moradores',
    //             },
    //             {
    //                 text: 'Cadastro',
    //                 active: true
    //             }
    //         ]
    //     } as SBRouteData,
    //     canActivate: [ContasGuard],
    //     component: contasContainers.MoradoresFormComponent
    // },
    // {
    //     path: 'edicao',
    //     data: {
    //         title: 'Edição de Morador',
    //         breadcrumbs: [
    //             {
    //                 text: 'Moradores',
    //                 link: '/moradores',
    //             },
    //             {
    //                 text: 'Edição',
    //                 active: true
    //             }
    //         ]
    //     } as SBRouteData,
    //     canActivate: [ContasGuard],
    //     component: contasContainers.MoradoresFormComponent
    // }
];

@NgModule({
    imports: [ContasModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ContasRoutingModule { }