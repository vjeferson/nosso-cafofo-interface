import { ButtonCadastroComponent } from './button-cadastro/button-cadastro.component';
import { ButtonFiltrosComponent } from './button-filtros/button-filtros.component';
import { CardViewDetailsComponent } from './card-view-details/card-view-details.component';
import { CardComponent } from './card/card.component';
import { CustomLabelComponent } from './custom-label/custom-label.component';
import { ErroInputComponent } from './erro-input/erro-input.component';
import { ConfirmacaoNgbdModal } from './modal-confirm/modal-confirm.component';
import { SelectCidadeComponent } from './select-cidade/select-cidade.component';
import { SelectEstadoComponent } from './select-estado/select-estado.component';
import { SelectMoradorComponent } from './select-morador/select-morador.component';
import { SelectPerfilComponent } from './select-perfil/select-perfil.component';
import { SelectSituacaoContaComponent } from './select-situacao-conta/select-situacao-conta.component';
import { SelectSituacaoRegistroComponent } from './select-situacao-registro-default/select-situacao-registro-default.component';
import { SelectTiposPlanosComponent } from './select-tipo-plano/select-tipo-plano.component';

export const components = [
    CardComponent,
    CardViewDetailsComponent,
    ErroInputComponent,
    SelectEstadoComponent,
    SelectCidadeComponent,
    SelectTiposPlanosComponent,
    ButtonCadastroComponent,
    ButtonFiltrosComponent,
    ConfirmacaoNgbdModal,
    SelectSituacaoRegistroComponent,
    SelectPerfilComponent,
    SelectMoradorComponent,
    CustomLabelComponent,
    SelectSituacaoContaComponent
];

export * from './card/card.component';
export * from './card-view-details/card-view-details.component';
export * from './custom-label/custom-label.component';
export * from './erro-input/erro-input.component';
export * from './select-estado/select-estado.component';
export * from './select-cidade/select-cidade.component';
export * from './select-tipo-plano/select-tipo-plano.component';
export * from './button-cadastro/button-cadastro.component';
export * from './button-filtros/button-filtros.component';
export * from './modal-confirm/modal-confirm.component';
export * from './select-situacao-registro-default/select-situacao-registro-default.component';
export * from './select-perfil/select-perfil.component';
export * from './select-morador/select-morador.component';
export * from './select-situacao-conta/select-situacao-conta.component';
