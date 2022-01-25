import { ITipoPlano } from "./search-planos";
import { State } from "./state";

export interface IFiltroAssinantes extends State {
    anoCriacao?: number;
    dataPagamentoContas?: number;
    tipoPlanoAtivo?: ITipoPlano;
    limit: number;
    offset: number;
}