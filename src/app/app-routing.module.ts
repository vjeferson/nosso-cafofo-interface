import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard',
    },
    {
        path: 'charts',
        loadChildren: () =>
            import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('modules/dashboard/dashboard-routing.module').then(
                m => m.DashboardRoutingModule
            ),
    },
    {
        path: 'assinantes',
        loadChildren: () =>
            import('modules/assinantes/assinantes-routing.module').then(
                m => m.AssinantesRoutingModule
            )
    },
    {
        path: 'planos',
        loadChildren: () =>
            import('modules/planos/planos-routing.module').then(
                m => m.PlanosRoutingModule
            )
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('modules/profile/profile-routing.module').then(
                m => m.ProfileRoutingModule
            )
    },
    {
        path: 'assinatura',
        loadChildren: () =>
            import('modules/assinatura/assinatura-ativa-routing.module').then(
                m => m.AssinaturaAtivaRoutingModule
            )
    },
    {
        path: 'republica',
        loadChildren: () =>
            import('modules/republica/republica-routing.module').then(
                m => m.RepublicaRoutingModule
            )
    },
    {
        path: 'moradores',
        loadChildren: () =>
            import('modules/moradores/moradores-routing.module').then(
                m => m.MoradoresRoutingModule
            )
    },
    {
        path: 'usuarios',
        loadChildren: () =>
            import('modules/usuarios/usuarios-routing.module').then(
                m => m.UsuariosRoutingModule
            )
    },
    {
        path: 'contas',
        loadChildren: () =>
            import('modules/contas/contas-routing.module').then(
                m => m.ContasRoutingModule
            )
    },
    {
        path: 'reunioes',
        loadChildren: () =>
            import('modules/reunioes/reunioes-routing.module').then(
                m => m.ReunioesRoutingModule
            )
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: 'tables',
        loadChildren: () =>
            import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
