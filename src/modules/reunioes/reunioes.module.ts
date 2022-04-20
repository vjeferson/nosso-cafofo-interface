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
import { ReunioesTableService } from './containers/reunioes-list/reunioes-table.service';

/* Components */
import * as pageComponents from './components';

/* Containers */
import * as pageContainers from './containers';

/* Guards */
import * as guard from './guards';

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
    providers: [ReunioesTableService, ...guard.guards],
    declarations: [...pageContainers.containers, ...pageComponents.components],
    exports: [...pageContainers.containers, ...pageComponents.components],
})
export class ReunioesModule { }