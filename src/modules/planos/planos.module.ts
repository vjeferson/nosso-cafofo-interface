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
import * as planosComponents from './components';

/* Containers */
import * as planosContainers from './containers';

/* Guards */
import * as planosGuards from './guards';
import { PlanoTableService } from './containers/planos-list/plano-table.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule,
    ],
    providers: [PlanoTableService, ...planosGuards.guards],
    declarations: [...planosContainers.containers, ...planosComponents.components],
    exports: [...planosContainers.containers, ...planosComponents.components],
})
export class PlanosModule { }
