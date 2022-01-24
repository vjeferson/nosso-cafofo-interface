/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as republicaComponents from './components';

/* Containers */
import * as republicaContainers from './containers';

/* Guards */
import * as republicaGuard from './guards';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule
    ],
    providers: [...republicaGuard.guards],
    declarations: [...republicaContainers.containers, ...republicaComponents.components],
    exports: [...republicaContainers.containers, ...republicaComponents.components],
})
export class RepublicaModule { }
