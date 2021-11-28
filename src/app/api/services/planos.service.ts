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
class PlanosService extends __BaseService {
  static readonly getPlanoTipoPlanosPath = '/plano/tipo-planos';
  static readonly postPlanoPath = '/plano';
  static readonly getPlanoPath = '/plano';
  static readonly getPlanoIdPath = '/plano/{id}';
  static readonly putPlanoIdPath = '/plano/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta Tipos de Planos
   *
   * Rota para consulta de tipos de planos.
   */
  getPlanoTipoPlanosResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plano/tipo-planos`,
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
   * Consulta Tipos de Planos
   *
   * Rota para consulta de tipos de planos.
   */
  getPlanoTipoPlanos(): __Observable<null> {
    return this.getPlanoTipoPlanosResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Cadastro de Plano
   *
   * Rota para criação de planos no sistema. Apenas Administradores Nosso Cafofo.
   */
  postPlanoResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/plano`,
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
   * Cadastro de Plano
   *
   * Rota para criação de planos no sistema. Apenas Administradores Nosso Cafofo.
   */
  postPlano(): __Observable<null> {
    return this.postPlanoResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Planos
   *
   * Rota para consulta de Planos.
   * @param params The `PlanosService.GetPlanoParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `tipoPlano`: Código/Tipo do plano
   *
   * - `descricao`: Descrição do plano
   *
   * - `ativo`: Situação do plano. Plano esta ativo?
   */
  getPlanoResponse(params: PlanosService.GetPlanoParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.tipoPlano != null) __params = __params.set('tipoPlano', params.tipoPlano.toString());
    if (params.descricao != null) __params = __params.set('descricao', params.descricao.toString());
    if (params.ativo != null) __params = __params.set('ativo', params.ativo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plano`,
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
   * Consulta Planos
   *
   * Rota para consulta de Planos.
   * @param params The `PlanosService.GetPlanoParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `tipoPlano`: Código/Tipo do plano
   *
   * - `descricao`: Descrição do plano
   *
   * - `ativo`: Situação do plano. Plano esta ativo?
   */
  getPlano(params: PlanosService.GetPlanoParams): __Observable<null> {
    return this.getPlanoResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Plano Específico
   *
   * Rota para consulta de plano específico pelo id (identificação/sigla do registro).
   * @param id Identificador/Sigla do registro
   */
  getPlanoIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plano/${encodeURIComponent(String(id))}`,
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
   * Consulta Plano Específico
   *
   * Rota para consulta de plano específico pelo id (identificação/sigla do registro).
   * @param id Identificador/Sigla do registro
   */
  getPlanoId(id: string): __Observable<null> {
    return this.getPlanoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Plano
   *
   * Rota para alteração de plano. Apenas Administradores Nosso Cafofo.
   * @param id Identificador do registro
   */
  putPlanoIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/plano/${encodeURIComponent(String(id))}`,
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
   * Alterar Plano
   *
   * Rota para alteração de plano. Apenas Administradores Nosso Cafofo.
   * @param id Identificador do registro
   */
  putPlanoId(id: number): __Observable<null> {
    return this.putPlanoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PlanosService {

  /**
   * Parameters for getPlano
   */
  export interface GetPlanoParams {

    /**
     * Offset da consulta (para paginação)
     */
    offset: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros por consulta)
     */
    limit: number;

    /**
     * Código/Tipo do plano
     */
    tipoPlano?: number;

    /**
     * Descrição do plano
     */
    descricao?: string;

    /**
     * Situação do plano. Plano esta ativo?
     */
    ativo?: boolean;
  }
}

export { PlanosService }
