/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AssinaturaAtivaModule } from './assinatura-ativa.module';

/* Containers */
import * as assinaturaAtivaContainers from './containers';

/* Guards */
import { AssinaturaAtivaGuard } from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Informações de Assinatura',
            breadcrumbs: [
                {
                    text: 'Assinatura',
                    active: true
                }
            ],
        } as SBRouteData,
        canActivate: [AssinaturaAtivaGuard],
        component: assinaturaAtivaContainers.AssinaturaAtivaComponent
    }
];

@NgModule({
    imports: [AssinaturaAtivaModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class AssinaturaAtivaRoutingModule { }
