/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NovaReuniao } from '../models/nova-reuniao';
@Injectable({
  providedIn: 'root',
})
class ReunioesService extends __BaseService {
  static readonly postReuniaoPath = '/reuniao';
  static readonly getReuniaoPath = '/reuniao';
  static readonly getReuniaoIdPath = '/reuniao/{id}';
  static readonly putReuniaoIdPath = '/reuniao/{id}';
  static readonly deleteReuniaoIdPath = '/reuniao/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Reunião
   *
   * Rota para criação de reuniões no sistema.
   * @param body Informações do nova reunião
   */
  postReuniaoResponse(body: NovaReuniao): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/reuniao`,
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
   * Cadastro de Reunião
   *
   * Rota para criação de reuniões no sistema.
   * @param body Informações do nova reunião
   */
  postReuniao(body: NovaReuniao): __Observable<null> {
    return this.postReuniaoResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Reuniões
   *
   * Rota para consulta de reuniões.
   * @param params The `ReunioesService.GetReuniaoParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   *
   * - `descricao`: Descrição da reunião
   *
   * - `data`: Data e hora da reunião
   */
  getReuniaoResponse(params: ReunioesService.GetReuniaoParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.descricao != null) __params = __params.set('descricao', params.descricao.toString());
    if (params.data != null) __params = __params.set('data', params.data.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/reuniao`,
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
   * Consulta Reuniões
   *
   * Rota para consulta de reuniões.
   * @param params The `ReunioesService.GetReuniaoParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   *
   * - `descricao`: Descrição da reunião
   *
   * - `data`: Data e hora da reunião
   */
  getReuniao(params: ReunioesService.GetReuniaoParams): __Observable<null> {
    return this.getReuniaoResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Reunião Específica
   *
   * Rota para consulta de reunião específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getReuniaoIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/reuniao/${encodeURIComponent(String(id))}`,
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
   * Consulta Reunião Específica
   *
   * Rota para consulta de reunião específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getReuniaoId(id: number): __Observable<null> {
    return this.getReuniaoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Reunião
   *
   * Rota para alteração de reunião.
   * @param id Identificador do registro
   */
  putReuniaoIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/reuniao/${encodeURIComponent(String(id))}`,
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
   * Alterar Reunião
   *
   * Rota para alteração de reunião.
   * @param id Identificador do registro
   */
  putReuniaoId(id: number): __Observable<null> {
    return this.putReuniaoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deleta Reunião
   *
   * Rota para deletar/remover uma reunião pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteReuniaoIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/reuniao/${encodeURIComponent(String(id))}`,
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
   * Deleta Reunião
   *
   * Rota para deletar/remover uma reunião pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteReuniaoId(id: number): __Observable<null> {
    return this.deleteReuniaoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ReunioesService {

  /**
   * Parameters for getReuniao
   */
  export interface GetReuniaoParams {

    /**
     * Offset da consulta (para paginação: padrão 0)
     */
    offset?: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
     */
    limit?: number;

    /**
     * Descrição da reunião
     */
    descricao?: string;

    /**
     * Data e hora da reunião
     */
    data?: string;
  }
}

export { ReunioesService }
