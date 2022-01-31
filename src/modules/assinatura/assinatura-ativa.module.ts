/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as assinaturaAtivaComponents from './components';

/* Containers */
import * as assinaturaAtivaContainers from './containers';

/* Guards */
import * as assinaturaAtivaGuards from './guards';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule
    ],
    providers: [...assinaturaAtivaGuards.guards],
    declarations: [...assinaturaAtivaContainers.containers, ...assinaturaAtivaComponents.components],
    exports: [...assinaturaAtivaContainers.containers, ...assinaturaAtivaComponents.components],
})
export class AssinaturaAtivaModule { }
