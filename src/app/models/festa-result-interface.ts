export interface IFestaResult {
    id?: number;
    descricao: string;
    data: Date | string;
    situacao: number;
    valorTotal: number;
    republicaId: number;
}