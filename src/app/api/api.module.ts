/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AutenticacaoService } from './services/autenticacao.service';
import { EstadosService } from './services/estados.service';
import { CidadesService } from './services/cidades.service';
import { PlanosService } from './services/planos.service';
import { ClientesService } from './services/clientes.service';
import { PerfisService } from './services/perfis.service';
import { UsuariosService } from './services/usuarios.service';
import { RepublicasService } from './services/republicas.service';
import { AssinaturasService } from './services/assinaturas.service';
import { AssinantesService } from './services/assinantes.service';
import { MoradoresService } from './services/moradores.service';
import { ReunioesService } from './services/reunioes.service';
import { FestasService } from './services/festas.service';
import { ParticipantesFestaService } from './services/participantes-festa.service';
import { ContasService } from './services/contas.service';
import { EntradasESaDasService } from './services/entradas-esa-das.service';
import { EstatisticasService } from './services/estatisticas.service';
import { RelatoriosService } from './services/relatorios.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AutenticacaoService,
    EstadosService,
    CidadesService,
    PlanosService,
    ClientesService,
    PerfisService,
    UsuariosService,
    RepublicasService,
    AssinaturasService,
    AssinantesService,
    MoradoresService,
    ReunioesService,
    FestasService,
    ParticipantesFestaService,
    ContasService,
    EntradasESaDasService,
    EstatisticasService,
    RelatoriosService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
