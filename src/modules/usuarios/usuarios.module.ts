/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as usuariosComponents from './components';

/* Containers */
import * as usuariosContainers from './containers';

/* Guards */
import * as usuariosGuard from './guards';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule
    ],
    providers: [...usuariosGuard.guards],
    declarations: [...usuariosContainers.containers, ...usuariosComponents.components],
    exports: [...usuariosContainers.containers, ...usuariosComponents.components],
})
export class UsuariosModule { }