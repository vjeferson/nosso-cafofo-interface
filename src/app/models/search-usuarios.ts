import { State } from './state';

export interface IFiltroUsuarios extends State {
    nome?: string;
    ativo?: boolean;
    limit: number;
    offset: number;
}