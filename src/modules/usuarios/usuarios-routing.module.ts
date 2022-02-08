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
    }
];

@NgModule({
    imports: [UsuariosModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }