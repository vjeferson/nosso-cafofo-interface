import { EnumTipoPlano } from "./enums";

export const mapTiposPlanos = {
    [EnumTipoPlano.Mensal]: 'Plano Mensal',
    [EnumTipoPlano.Semestral]: 'Plano Semestral',
    [EnumTipoPlano.Anual]: 'Plano Anual',
    [EnumTipoPlano.PromocionalAnual]: 'Plano Promocional Anual',
    [EnumTipoPlano.Free]: 'Free (Grátis)'
}