/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

/* Third Party */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@modules/icons/icons.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from './pipes/pipes.module';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

const thirdParty = [IconsModule, NgbModule, NgSelectModule, PipesModule, CurrencyMaskModule];

/* Containers */
import * as appCommonContainers from './containers';
/* Components */
import * as appCommonComponents from './components';
/* Guards */
import * as appCommonGuards from './guards';
/* Services */
import * as appCommonServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        ...thirdParty
    ],
    providers: [
        ...appCommonServices.services,
        ...appCommonGuards.guards,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        BsLocaleService
    ],
    declarations: [
        ...appCommonContainers.containers,
        ...appCommonComponents.components
    ],
    exports: [
        ...appCommonContainers.containers,
        ...appCommonComponents.components,
        BsDatepickerModule,
        ...thirdParty
    ]
})
export class AppCommonModule { }
