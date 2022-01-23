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
}