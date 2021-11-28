import { NgModule } from '@angular/core';
import { PercentPipe, CurrencyPipe, CommonModule } from '@angular/common';
import { NumeralCustomPipe } from './numeral-custom.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        CurrencyPipe,
        PercentPipe,
        NumeralCustomPipe
    ],
    declarations: [
        NumeralCustomPipe
    ],
    exports: [
        CurrencyPipe,
        PercentPipe,
        NumeralCustomPipe
    ]
})
export class PipesModule { }
