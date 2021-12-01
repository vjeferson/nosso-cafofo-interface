import { BaseTableComponent } from './base-table/base-table.component';
import { ButtonCadastroComponent } from './button-cadastro/button-cadastro.component';
import { ButtonFiltrosComponent } from './button-filtros/button-filtros.component';
import { CardViewDetailsComponent } from './card-view-details/card-view-details.component';
import { CardComponent } from './card/card.component';
import { ErroInputComponent } from './erro-input/erro-input.component';
import { SelectCidadeComponent } from './select-cidade/select-cidade.component';
import { SelectEstadoComponent } from './select-estado/select-estado.component';
import { SelectTiposPlanosComponent } from './select-tipo-plano/select-tipo-plano.component';

export const components = [
    CardComponent,
    CardViewDetailsComponent,
    ErroInputComponent,
    SelectEstadoComponent,
    SelectCidadeComponent,
    SelectTiposPlanosComponent,
    BaseTableComponent,
    ButtonCadastroComponent,
    ButtonFiltrosComponent
];

export * from './card/card.component';
export * from './card-view-details/card-view-details.component';
export * from './erro-input/erro-input.component';
export * from './select-estado/select-estado.component';
export * from './select-cidade/select-cidade.component';
export * from './select-tipo-plano/select-tipo-plano.component';
export * from './base-table/base-table.component';
export * from './button-cadastro/button-cadastro.component';
export * from './button-filtros/button-filtros.component';