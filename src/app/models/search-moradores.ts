import { State } from './state';

export interface IFiltroMoradores extends State {
    nome?: string;
    anoEntrada?: number;
    ativo?: boolean;
    limit: number;
    offset: number;
}