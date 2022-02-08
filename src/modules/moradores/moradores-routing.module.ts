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
            ],
        } as SBRouteData,
        canActivate: [MoradoresGuard],
        component: moradoresContainers.MoradoresComponent
    }
];

@NgModule({
    imports: [MoradoresModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class MoradoresRoutingModule { }