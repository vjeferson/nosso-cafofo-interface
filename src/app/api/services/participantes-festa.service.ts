/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NovoParticipanteFesta } from '../models/novo-participante-festa';
import { AtualizaParticipanteFesta } from '../models/atualiza-participante-festa';
@Injectable({
  providedIn: 'root',
})
class ParticipantesFestaService extends __BaseService {
  static readonly postParticipantesFestaPath = '/participantes-festa';
  static readonly getParticipantesFestaFestaIdPath = '/participantes-festa/{festaId}';
  static readonly getParticipantesFestaIdFestaFestaIdPath = '/participantes-festa/{id}/festa/{festaId}';
  static readonly putParticipantesFestaIdFestaFestaIdPath = '/participantes-festa/{id}/festa/{festaId}';
  static readonly deleteParticipantesFestaIdFestaFestaIdPath = '/participantes-festa/{id}/festa/{festaId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Participantes na Festa
   *
   * Rota para criação de participantes nas festas no sistema.
   * @param body Informações do participante
   */
  postParticipantesFestaResponse(body: NovoParticipanteFesta): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/participantes-festa`,
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
   * Cadastro de Participantes na Festa
   *
   * Rota para criação de participantes nas festas no sistema.
   * @param body Informações do participante
   */
  postParticipantesFesta(body: NovoParticipanteFesta): __Observable<null> {
    return this.postParticipantesFestaResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Participantes da Festa
   *
   * Rota para consulta de participantes da festa.
   * @param params The `ParticipantesFestaService.GetParticipantesFestaFestaIdParams` containing the following parameters:
   *
   * - `festaId`: Identificador do registro da Festa
   *
   * - `situacao`: Situação de pagamento
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `nome`: Nome do participante
   *
   * - `lote`: Identificador do Lote
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   */
  getParticipantesFestaFestaIdResponse(params: ParticipantesFestaService.GetParticipantesFestaFestaIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.situacao != null) __params = __params.set('situacao', params.situacao.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.nome != null) __params = __params.set('nome', params.nome.toString());
    if (params.lote != null) __params = __params.set('lote', params.lote.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/participantes-festa/${encodeURIComponent(String(params.festaId))}`,
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
   * Consulta Participantes da Festa
   *
   * Rota para consulta de participantes da festa.
   * @param params The `ParticipantesFestaService.GetParticipantesFestaFestaIdParams` containing the following parameters:
   *
   * - `festaId`: Identificador do registro da Festa
   *
   * - `situacao`: Situação de pagamento
   *
   * - `offset`: Offset da consulta (para paginação: padrão 0)
   *
   * - `nome`: Nome do participante
   *
   * - `lote`: Identificador do Lote
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
   */
  getParticipantesFestaFestaId(params: ParticipantesFestaService.GetParticipantesFestaFestaIdParams): __Observable<null> {
    return this.getParticipantesFestaFestaIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Participante Específico
   *
   * Rota para consulta de participante específico da festa pelo id (identificação do registro).
   * @param id Identificador do registro
   * @param festaId Identificador do registro da festa
   */
  getParticipantesFestaIdFestaFestaIdResponse(id: number,
    festaId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/participantes-festa/${encodeURIComponent(String(id))}/festa/${encodeURIComponent(String(festaId))}`,
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
   * Consulta Participante Específico
   *
   * Rota para consulta de participante específico da festa pelo id (identificação do registro).
   * @param id Identificador do registro
   * @param festaId Identificador do registro da festa
   */
  getParticipantesFestaIdFestaFestaId(id: number,
    festaId: number): __Observable<null> {
    return this.getParticipantesFestaIdFestaFestaIdResponse(id, festaId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Participante
   *
   * Rota para alteração de participante da festa.
   * @param id Identificador do registro
   * @param festaId Identificador do registro da festa
   * @param body Novas informações do participante
   */
  putParticipantesFestaIdFestaFestaIdResponse(id: number,
    festaId: number,
    body: AtualizaParticipanteFesta): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/participantes-festa/${encodeURIComponent(String(id))}/festa/${encodeURIComponent(String(festaId))}`,
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
   * Alterar Participante
   *
   * Rota para alteração de participante da festa.
   * @param id Identificador do registro
   * @param festaId Identificador do registro da festa
   * @param body Novas informações do participante
   */
  putParticipantesFestaIdFestaFestaId(id: number,
    festaId: number,
    body: AtualizaParticipanteFesta): __Observable<null> {
    return this.putParticipantesFestaIdFestaFestaIdResponse(id, festaId, body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deleta Participante
   *
   * Rota para deletar/remover um participante da festa pelo id (identificação do registro).
   * @param id Identificador do registro
   * @param festaId Identificador do registro da festa
   */
  deleteParticipantesFestaIdFestaFestaIdResponse(id: number,
    festaId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/participantes-festa/${encodeURIComponent(String(id))}/festa/${encodeURIComponent(String(festaId))}`,
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
   * Deleta Participante
   *
   * Rota para deletar/remover um participante da festa pelo id (identificação do registro).
   * @param id Identificador do registro
   * @param festaId Identificador do registro da festa
   */
  deleteParticipantesFestaIdFestaFestaId(id: number,
    festaId: number): __Observable<null> {
    return this.deleteParticipantesFestaIdFestaFestaIdResponse(id, festaId).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ParticipantesFestaService {

  /**
   * Parameters for getParticipantesFestaFestaId
   */
  export interface GetParticipantesFestaFestaIdParams {

    /**
     * Identificador do registro da Festa
     */
    festaId: number;

    /**
     * Situação de pagamento
     */
    situacao?: number;

    /**
     * Offset da consulta (para paginação: padrão 0)
     */
    offset?: number;

    /**
     * Nome do participante
     */
    nome?: string;

    /**
     * Identificador do Lote
     */
    lote?: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros padrão por consulta)
     */
    limit?: number;
  }
}

export { ParticipantesFestaService }
