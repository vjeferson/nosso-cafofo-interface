import { State } from './state';

export interface IFiltroReunioes extends State {
    descricao?: string;
    data?: Date[];
    limit: number;
    offset: number;
}