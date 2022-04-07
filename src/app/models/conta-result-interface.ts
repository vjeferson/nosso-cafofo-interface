export interface IContaResult {
    id?: number;
    descricao: string;
    valor: number;
    situacao: number;
    mesAnoConta: string;
    divisaoPorIgualEntreMoradores?: boolean;
    republicaId: number;
}