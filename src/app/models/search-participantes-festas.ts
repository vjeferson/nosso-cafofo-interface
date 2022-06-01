import { State } from './state';

export interface IFiltroParticipantesFestas extends State {
    festaId: number;
    nome?: string;
    situacao?: number;
    limit: number;
    offset: number;
}