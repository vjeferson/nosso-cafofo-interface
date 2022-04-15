/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NovaConta } from '../models/nova-conta';
import { AtualizaConta } from '../models/atualiza-conta';
@Injectable({
  providedIn: 'root',
})
class ContasService extends __BaseService {
  static readonly postContaPath = '/conta';
  static readonly getContaPath = '/conta';
  static readonly getContaIdPath = '/conta/{id}';
  static readonly putContaIdPath = '/conta/{id}';
  static readonly deleteContaIdPath = '/conta/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Conta
   *
   * Rota para criação de contas no sistema.
   * @param body Informações do nova conta
   */
  postContaResponse(body: NovaConta): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/conta`,
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
   * Cadastro de Conta
   *
   * Rota para criação de contas no sistema.
   * @param body Informações do nova conta
   */
  postConta(body: NovaConta): __Observable<null> {
    return this.postContaResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Contas
   *
   * Rota para consulta de contas.
   * @param params The `ContasService.GetContaParams` containing the following parameters:
   *
   * - `situacao`: Código situação
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   *
   * - `descricao`: Descrição da Conta
   */
  getContaResponse(params: ContasService.GetContaParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.situacao != null) __params = __params.set('situacao', params.situacao.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.descricao != null) __params = __params.set('descricao', params.descricao.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/conta`,
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
   * Consulta Contas
   *
   * Rota para consulta de contas.
   * @param params The `ContasService.GetContaParams` containing the following parameters:
   *
   * - `situacao`: Código situação
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   *
   * - `descricao`: Descrição da Conta
   */
  getConta(params: ContasService.GetContaParams): __Observable<null> {
    return this.getContaResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Conta Específica
   *
   * Rota para consulta de conta específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getContaIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/conta/${encodeURIComponent(String(id))}`,
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
   * Consulta Conta Específica
   *
   * Rota para consulta de conta específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getContaId(id: number): __Observable<null> {
    return this.getContaIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Conta
   *
   * Rota para alteração de conta.
   * @param id Identificador do registro
   * @param body Novas informações da Conta
   */
  putContaIdResponse(id: number,
    body: AtualizaConta): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/conta/${encodeURIComponent(String(id))}`,
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
   * Alterar Conta
   *
   * Rota para alteração de conta.
   * @param id Identificador do registro
   * @param body Novas informações da Conta
   */
  putContaId(id: number,
    body: AtualizaConta): __Observable<null> {
    return this.putContaIdResponse(id, body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deleta Conta
   *
   * Rota para deletar/remover uma conta pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteContaIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/conta/${encodeURIComponent(String(id))}`,
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
   * Deleta Conta
   *
   * Rota para deletar/remover uma conta pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteContaId(id: number): __Observable<null> {
    return this.deleteContaIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ContasService {

  /**
   * Parameters for getConta
   */
  export interface GetContaParams {

    /**
     * Código situação
     */
    situacao?: 0 | 1 | 2;

    /**
     * Offset da consulta (para paginação: padrão 0)
     */
    offset?: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
     */
    limit?: number;

    /**
     * Descrição da Conta
     */
    descricao?: string;
  }
}

export { ContasService }
