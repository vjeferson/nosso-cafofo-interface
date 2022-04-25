import { State } from './state';

export interface IFiltroFestas extends State {
    descricao?: string;
    situacao?: number;
    limit: number;
    offset: number;
}