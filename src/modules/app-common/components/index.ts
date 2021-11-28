import { BaseTableComponent } from './base-table/base-table.component';
import { CardViewDetailsComponent } from './card-view-details/card-view-details.component';
import { CardComponent } from './card/card.component';
import { ErroInputComponent } from './erro-input/erro-input.component';
import { SelectCidadeComponent } from './select-cidade/select-cidade.component';
import { SelectEstadoComponent } from './select-estado/select-estado.component';

export const components = [CardComponent, CardViewDetailsComponent, ErroInputComponent, SelectEstadoComponent, SelectCidadeComponent, BaseTableComponent];

export * from './card/card.component';
export * from './card-view-details/card-view-details.component';
export * from './erro-input/erro-input.component';
export * from './select-estado/select-estado.component';
export * from './select-cidade/select-cidade.component';
export * from './base-table/base-table.component';