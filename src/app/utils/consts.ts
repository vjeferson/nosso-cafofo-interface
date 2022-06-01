import { environment } from 'environments/environment';
import { EnumAcoesModalConfirmacao, EnumLoteFesta, EnumSituacaoConta, EnumSituacaoFesta, EnumSituacaoPagamentoParticipanteFesta, EnumTipoPerfil, EnumTipoPlano } from './enums';

export const _PAGE_SIZE = 6;
export const debug = (...args: any) => {
    if (environment.debug) {
        console.info(...args);
    }
}

export const mapTiposPlanos: { [key: number]: string } = {
    [EnumTipoPlano.Mensal]: 'Plano Mensal',
    [EnumTipoPlano.Semestral]: 'Plano Semestral',
    [EnumTipoPlano.Anual]: 'Plano Anual',
    [EnumTipoPlano.PromocionalAnual]: 'Plano Promocional Anual',
    [EnumTipoPlano.Free]: 'Free (Grátis)'
};

export const mapDescricaoTiposPlanos: { [key: string]: number } = {
    'PlanoMensal': EnumTipoPlano.Mensal,
    'PlanoSemestral': EnumTipoPlano.Semestral,
    'PlanoAnual': EnumTipoPlano.Anual,
    'PlanoPromocionalAnual': EnumTipoPlano.PromocionalAnual,
    'Free': EnumTipoPlano.Free
};

export const mapTiposPerfis: { [key: number]: string } = {
    [EnumTipoPerfil.AdministradorNossoCafofo]: 'Administrador',
    [EnumTipoPerfil.MoradorAdministrador]: 'Morador Adm.',
    [EnumTipoPerfil.Morador]: 'Morador'
};

export const mapSituacaoConta: { [key: number]: string } = {
    [EnumSituacaoConta.EmAberto]: 'Em Aberto',
    [EnumSituacaoConta.PagamentoParcial]: 'Pagamento Parcial',
    [EnumSituacaoConta.Pago]: 'Pago'
};

export const mapDescricaoAcoesModalConfirmacao: { [key: string]: number } = {
    'exclusao': EnumAcoesModalConfirmacao.Exclusao,
    'desvinculacaoContaSocial': EnumAcoesModalConfirmacao.DesvinculacaoContaSocial
};

export const mapSituacaoFesta: { [key: number]: string } = {
    [EnumSituacaoFesta.EmAberto]: 'Em Aberto',
    [EnumSituacaoFesta.Finalizada]: 'Finalizada',
    [EnumSituacaoFesta.Cancelada]: 'Cancelada'
};

export const mapSituacaoPagamentoParticipanteFesta: { [key: number]: string } = {
    [EnumSituacaoPagamentoParticipanteFesta.EmAberto]: 'Em Aberto',
    [EnumSituacaoPagamentoParticipanteFesta.Pago]: 'Pago',
    [EnumSituacaoPagamentoParticipanteFesta.Devolvido]: 'Devolvido'
};

export const mapLoteFesta: { [key: number]: string } = {
    [EnumLoteFesta.Promocional]: 'Promocional',
    [EnumLoteFesta.Primeiro]: 'Primeiro',
    [EnumLoteFesta.Segundo]: 'Segundo',
    [EnumLoteFesta.Terceiro]: 'Terceiro',
    [EnumLoteFesta.Quarto]: 'Quarto',
    [EnumLoteFesta.Quinto]: 'Quinto',
    [EnumLoteFesta.Extra]: 'Extra'
};