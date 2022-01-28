/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class AssinantesService extends __BaseService {
  static readonly getAssinantesPath = '/assinantes';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta Assinantes
   *
   * Rota para consulta de assinantes. Apenas Administradores Nosso Cafofo.
   * @param params The `AssinantesService.GetAssinantesParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `tipoPlanoAtivo`: Tipo de plano assinado/ativo
   *
   * - `nome`: Nome da república
   *
   * - `dataPagamentoContas`: Dia (número) de pagamento das contas
   *
   * - `anoCriacao`: Ano de criação
   */
  getAssinantesResponse(params: AssinantesService.GetAssinantesParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.tipoPlanoAtivo != null) __params = __params.set('tipoPlanoAtivo', params.tipoPlanoAtivo.toString());
    if (params.nome != null) __params = __params.set('nome', params.nome.toString());
    if (params.dataPagamentoContas != null) __params = __params.set('dataPagamentoContas', params.dataPagamentoContas.toString());
    if (params.anoCriacao != null) __params = __params.set('anoCriacao', params.anoCriacao.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/assinantes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Consulta Assinantes
   *
   * Rota para consulta de assinantes. Apenas Administradores Nosso Cafofo.
   * @param params The `AssinantesService.GetAssinantesParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `tipoPlanoAtivo`: Tipo de plano assinado/ativo
   *
   * - `nome`: Nome da república
   *
   * - `dataPagamentoContas`: Dia (número) de pagamento das contas
   *
   * - `anoCriacao`: Ano de criação
   */
  getAssinantes(params: AssinantesService.GetAssinantesParams): __Observable<null> {
    return this.getAssinantesResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AssinantesService {

  /**
   * Parameters for getAssinantes
   */
  export interface GetAssinantesParams {

    /**
     * Offset da consulta (para paginação)
     */
    offset: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros por consulta)
     */
    limit: number;

    /**
     * Tipo de plano assinado/ativo
     */
    tipoPlanoAtivo?: number;

    /**
     * Nome da república
     */
    nome?: string;

    /**
     * Dia (número) de pagamento das contas
     */
    dataPagamentoContas?: number;

    /**
     * Ano de criação
     */
    anoCriacao?: number;
  }
}

export { AssinantesService }
