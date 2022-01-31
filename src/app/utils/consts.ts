import { environment } from "environments/environment";
import { EnumTipoPlano } from "./enums";

export const debug = (...args: any) => {
    if (environment.debug) {
        console.info(...args);
    }
}

export const mapTiposPlanos = {
    [EnumTipoPlano.Mensal]: 'Plano Mensal',
    [EnumTipoPlano.Semestral]: 'Plano Semestral',
    [EnumTipoPlano.Anual]: 'Plano Anual',
    [EnumTipoPlano.PromocionalAnual]: 'Plano Promocional Anual',
    [EnumTipoPlano.Free]: 'Free (Grátis)'
};

export const mapDescricaoTiposPlanos = {
    'PlanoMensal': EnumTipoPlano.Mensal,
    'PlanoSemestral': EnumTipoPlano.Semestral,
    'PlanoAnual': EnumTipoPlano.Anual,
    'PlanoPromocionalAnual': EnumTipoPlano.PromocionalAnual,
    'Free': EnumTipoPlano.Free
};