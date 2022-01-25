/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AtualizaRepublica } from '../models/atualiza-republica';
@Injectable({
  providedIn: 'root',
})
class RepublicasService extends __BaseService {
  static readonly getRepublicaPath = '/republica';
  static readonly getRepublicaIdPath = '/republica/{id}';
  static readonly putRepublicaIdPath = '/republica/{id}';
  static readonly getRepublicaInformacoesCadastroIdPath = '/republica/informacoes-cadastro/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta Repúblicas
   *
   * Rota para consulta de repúblicas. Apenas Administradores Nosso Cafofo.
   * @param params The `RepublicasService.GetRepublicaParams` containing the following parameters:
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
  getRepublicaResponse(params: RepublicasService.GetRepublicaParams): __Observable<__StrictHttpResponse<null>> {
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
      this.rootUrl + `/republica`,
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
   * Consulta Repúblicas
   *
   * Rota para consulta de repúblicas. Apenas Administradores Nosso Cafofo.
   * @param params The `RepublicasService.GetRepublicaParams` containing the following parameters:
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
  getRepublica(params: RepublicasService.GetRepublicaParams): __Observable<null> {
    return this.getRepublicaResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta República Específico
   *
   * Rota para consulta de república específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getRepublicaIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/republica/${encodeURIComponent(String(id))}`,
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
   * Consulta República Específico
   *
   * Rota para consulta de república específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getRepublicaId(id: number): __Observable<null> {
    return this.getRepublicaIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar República
   *
   * Rota para alteração de república.
   * @param id Identificador do registro
   * @param body Novas informações da República
   */
  putRepublicaIdResponse(id: number,
    body: AtualizaRepublica): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/republica/${encodeURIComponent(String(id))}`,
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
   * Alterar República
   *
   * Rota para alteração de república.
   * @param id Identificador do registro
   * @param body Novas informações da República
   */
  putRepublicaId(id: number,
    body: AtualizaRepublica): __Observable<null> {
    return this.putRepublicaIdResponse(id, body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta informações de Cadastro da República Específico trazendo informações adicionais
   *
   * Rota para consulta de república específica pelo id (identificação do registro), trazendo informações adicionais de cadastro.
   * @param id Identificador do registro
   */
  getRepublicaInformacoesCadastroIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/republica/informacoes-cadastro/${encodeURIComponent(String(id))}`,
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
   * Consulta informações de Cadastro da República Específico trazendo informações adicionais
   *
   * Rota para consulta de república específica pelo id (identificação do registro), trazendo informações adicionais de cadastro.
   * @param id Identificador do registro
   */
  getRepublicaInformacoesCadastroId(id: number): __Observable<null> {
    return this.getRepublicaInformacoesCadastroIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module RepublicasService {

  /**
   * Parameters for getRepublica
   */
  export interface GetRepublicaParams {

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

export { RepublicasService }
