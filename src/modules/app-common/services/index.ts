import { AppCommonService } from './app-common.service';
import { UsuarioLogadoService } from './usuario-logado.service';

export const services = [AppCommonService, UsuarioLogadoService];

export * from './app-common.service';
export * from './usuario-logado.service';