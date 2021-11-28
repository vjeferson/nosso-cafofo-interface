/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* Third Party */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@modules/icons/icons.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from './pipes/pipes.module';
const thirdParty = [IconsModule, NgbModule, NgSelectModule, PipesModule];

/* Containers */
import * as appCommonContainers from './containers';
/* Components */
import * as appCommonComponents from './components';
/* Guards */
import * as appCommonGuards from './guards';
/* Services */
import * as appCommonServices from './services';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ...thirdParty],
    providers: [...appCommonServices.services, ...appCommonGuards.guards],
    declarations: [...appCommonContainers.containers, ...appCommonComponents.components],
    exports: [...appCommonContainers.containers, ...appCommonComponents.components, ...thirdParty],
})
export class AppCommonModule { }
