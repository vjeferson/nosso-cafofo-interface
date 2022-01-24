/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Containers */
import * as profileContainer from './containers';

/* Guards */
import { ProfileGuard } from './guards';
import { ProfileModule } from './profile.module';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Informaçõe de Cadastro e Acesso',
            breadcrumbs: [
                {
                    text: 'Profile',
                    active: true
                }
            ],
        } as SBRouteData,
        canActivate: [ProfileGuard],
        component: profileContainer.ProfileComponent
    }
];

@NgModule({
    imports: [ProfileModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ProfileRoutingModule { }