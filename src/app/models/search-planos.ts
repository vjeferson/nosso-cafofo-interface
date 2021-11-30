import { State } from "./state";

export interface IFiltroPlanos extends State {
    tipoPlano?: number
    ativo?: boolean;
    limit: number;
    offset: number;
}