/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Containers */
import * as republicaContainer from './containers';

/* Guards */
import { RepublicaGuard } from './guards';
import { RepublicaModule } from './republica.module';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'info-cadastro'
    },
    {
        path: 'caixa',
        data: {
            title: 'Caixinha da Casa',
            breadcrumbs: [
                {
                    text: 'República',
                    active: true
                },
                {
                    text: 'Caixa',
                    active: true
                }
            ],
        } as SBRouteData,
        canActivate: [RepublicaGuard],
        component: republicaContainer.CaixaRepublicaComponent
    },
    {
        path: 'entradas-saidas',
        data: {
            title: 'Registros de Entradas e Saídas do Caixa',
            breadcrumbs: [
                {
                    text: 'República',
                    active: true
                },
                {
                    text: 'Entradas e Saídas',
                    active: true
                }
            ],
        } as SBRouteData,
        canActivate: [RepublicaGuard],
        component: republicaContainer.EntradasSaidasRepublicaComponent
    },
    {
        path: 'info-cadastro',
        data: {
            title: 'Informaçõe de Cadastro e Acesso',
            breadcrumbs: [
                {
                    text: 'República',
                    active: true
                },
                {
                    text: 'Info. Cadastro',
                    active: true
                }
            ],
        } as SBRouteData,
        canActivate: [RepublicaGuard],
        component: republicaContainer.InformacoesCadastroRepublicaComponent
    }
];

@NgModule({
    imports: [RepublicaModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class RepublicaRoutingModule { }