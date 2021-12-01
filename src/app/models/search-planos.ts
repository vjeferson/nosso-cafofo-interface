import { EnumTipoPlano } from "@app/utils/enums";
import { State } from "./state";

export interface ITipoPlano {
    descricao: string;
    codigoTipoPlano: EnumTipoPlano;
}

export interface IFiltroPlanos extends State {
    tipoPlano?: ITipoPlano;
    ativo?: boolean;
    limit: number;
    offset: number;
}