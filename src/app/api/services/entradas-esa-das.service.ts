/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NovaFesta } from '../models/nova-festa';
@Injectable({
  providedIn: 'root',
})
class EntradasESaDasService extends __BaseService {
  static readonly postEntradaSaidaPath = '/entrada-saida';
  static readonly getEntradaSaidaPath = '/entrada-saida';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Entradas e Saídas
   *
   * Rota para criação de Entradas e Saídas no sistema.
   * @param body Informações da nova festa
   */
  postEntradaSaidaResponse(body: NovaFesta): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/entrada-saida`,
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
   * Cadastro de Entradas e Saídas
   *
   * Rota para criação de Entradas e Saídas no sistema.
   * @param body Informações da nova festa
   */
  postEntradaSaida(body: NovaFesta): __Observable<null> {
    return this.postEntradaSaidaResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Entradas e Saídas
   *
   * Rota para consulta de entradas e saídas.
   * @param params The `EntradasESaDasService.GetEntradaSaidaParams` containing the following parameters:
   *
   * - `tipoMovimento`: Tipo de Movimento (0 - Entrada ou 1 - Saída)
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `moradorId`: Identificação do Morador
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   *
   * - `descricao`: Descrição
   */
  getEntradaSaidaResponse(params: EntradasESaDasService.GetEntradaSaidaParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.tipoMovimento != null) __params = __params.set('tipoMovimento', params.tipoMovimento.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.moradorId != null) __params = __params.set('moradorId', params.moradorId.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.descricao != null) __params = __params.set('descricao', params.descricao.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/entrada-saida`,
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
   * Consulta Entradas e Saídas
   *
   * Rota para consulta de entradas e saídas.
   * @param params The `EntradasESaDasService.GetEntradaSaidaParams` containing the following parameters:
   *
   * - `tipoMovimento`: Tipo de Movimento (0 - Entrada ou 1 - Saída)
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `moradorId`: Identificação do Morador
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   *
   * - `descricao`: Descrição
   */
  getEntradaSaida(params: EntradasESaDasService.GetEntradaSaidaParams): __Observable<null> {
    return this.getEntradaSaidaResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module EntradasESaDasService {

  /**
   * Parameters for getEntradaSaida
   */
  export interface GetEntradaSaidaParams {

    /**
     * Tipo de Movimento (0 - Entrada ou 1 - Saída)
     */
    tipoMovimento?: 0 | 1;

    /**
     * Offset da consulta (para paginação: padrão 0)
     */
    offset?: number;

    /**
     * Identificação do Morador
     */
    moradorId?: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
     */
    limit?: number;

    /**
     * Descrição
     */
    descricao?: string;
  }
}

export { EntradasESaDasService }
