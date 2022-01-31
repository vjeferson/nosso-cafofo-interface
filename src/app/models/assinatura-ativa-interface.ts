export interface IAssinaturaAtiva {
    id: number
    validadePlano: string
    dataAssinatura: string
    ativa: boolean
    planoId: number
    republicaId: number
    tipoPlano: number
    descricao: string
    recorrencia: string
    numeroMaximoParcelasPagamento: number
    valorPlano: number
}