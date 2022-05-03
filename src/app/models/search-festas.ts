import { State } from './state';

export interface IFiltroFestas extends State {
    descricao?: string;
    situacao?: number;
    data?: Date[];
    limit: number;
    offset: number;
}