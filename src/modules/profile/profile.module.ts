/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as profileComponents from './components';

/* Containers */
import * as profileContainers from './containers';

/* Guards */
import * as profileGuard from './guards';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule
    ],
    providers: [...profileGuard.guards],
    declarations: [...profileContainers.containers, ...profileComponents.components],
    exports: [...profileContainers.containers, ...profileComponents.components],
})
export class ProfileModule { }
