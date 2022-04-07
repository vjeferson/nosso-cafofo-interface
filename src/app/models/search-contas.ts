import { State } from './state';

export interface IFiltroContas extends State {
    descricao?: string;
    situacao?: number;
    limit: number;
    offset: number;
}