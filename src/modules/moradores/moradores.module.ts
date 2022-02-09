/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MoradoresTableService } from './containers/moradores-list/moradores-table.service';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as moradoresComponents from './components';

/* Containers */
import * as moradoresContainers from './containers';

/* Guards */
import * as moradoresGuard from './guards';

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
    providers: [MoradoresTableService   , ...moradoresGuard.guards],
    declarations: [...moradoresContainers.containers, ...moradoresComponents.components],
    exports: [...moradoresContainers.containers, ...moradoresComponents.components],
})
export class MoradoresModule { }