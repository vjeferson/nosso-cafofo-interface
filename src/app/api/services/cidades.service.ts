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
class CidadesService extends __BaseService {
  static readonly getCidadePath = '/cidade';
  static readonly getCidadeIdPath = '/cidade/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta Cidades
   *
   * Rota para consulta de cidades.
   * @param params The `CidadesService.GetCidadeParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `estadoId`: Identificador/Sigla do Estado
   *
   * - `cidade`: Nome da Cidade
   */
  getCidadeResponse(params: CidadesService.GetCidadeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.estadoId != null) __params = __params.set('estadoId', params.estadoId.toString());
    if (params.cidade != null) __params = __params.set('cidade', params.cidade.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cidade`,
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
   * Consulta Cidades
   *
   * Rota para consulta de cidades.
   * @param params The `CidadesService.GetCidadeParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `estadoId`: Identificador/Sigla do Estado
   *
   * - `cidade`: Nome da Cidade
   */
  getCidade(params: CidadesService.GetCidadeParams): __Observable<null> {
    return this.getCidadeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Cidade Específica
   *
   * Rota para consulta de cidades específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getCidadeIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cidade/${encodeURIComponent(String(id))}`,
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
   * Consulta Cidade Específica
   *
   * Rota para consulta de cidades específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getCidadeId(id: number): __Observable<null> {
    return this.getCidadeIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CidadesService {

  /**
   * Parameters for getCidade
   */
  export interface GetCidadeParams {

    /**
     * Offset da consulta (para paginação)
     */
    offset?: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros por consulta)
     */
    limit?: number;

    /**
     * Identificador/Sigla do Estado
     */
    estadoId?: string;

    /**
     * Nome da Cidade
     */
    cidade?: string;
  }
}

export { CidadesService }
