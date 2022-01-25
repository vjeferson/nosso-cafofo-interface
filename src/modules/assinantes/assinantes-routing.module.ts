/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AssinantesModule } from './assinantes.module';

/* Containers */
import * as assinantesContainers from './containers';

/* Guards */
import { AssinantesGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Informações dos Assinantes',
            breadcrumbs: [
                {
                    text: 'Assinantes',
                    active: true
                }
            ],
        } as SBRouteData,
        canActivate: [AssinantesGuard],
        component: assinantesContainers.AssinantesComponent
    }
];

@NgModule({
    imports: [AssinantesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AssinantesRoutingModule { }
