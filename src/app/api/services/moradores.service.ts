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
class MoradoresService extends __BaseService {
  static readonly postMoradorPath = '/morador';
  static readonly getMoradorPath = '/morador';
  static readonly getMoradorIdPath = '/morador/{id}';
  static readonly putMoradorIdPath = '/morador/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Morador
   *
   * Rota para criação de moradores no sistema.
   */
  postMoradorResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/morador`,
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
   * Cadastro de Morador
   *
   * Rota para criação de moradores no sistema.
   */
  postMorador(): __Observable<null> {
    return this.postMoradorResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Moradores
   *
   * Rota para consulta de moradores.
   * @param nome Nome do morador
   * @param ativo Situação do morador. Morador esta ativo?
   * @param anoEntrada Ano de entrada do morador
   */
  getMoradorResponse(nome?: string,
    ativo?: boolean,
    anoEntrada?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (nome != null) __params = __params.set('nome', nome.toString());
    if (ativo != null) __params = __params.set('ativo', ativo.toString());
    if (anoEntrada != null) __params = __params.set('anoEntrada', anoEntrada.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/morador`,
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
   * Consulta Moradores
   *
   * Rota para consulta de moradores.
   * @param nome Nome do morador
   * @param ativo Situação do morador. Morador esta ativo?
   * @param anoEntrada Ano de entrada do morador
   */
  getMorador(nome?: string,
    ativo?: boolean,
    anoEntrada?: number): __Observable<null> {
    return this.getMoradorResponse(nome, ativo, anoEntrada).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Morador Específico
   *
   * Rota para consulta de morador específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getMoradorIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/morador/${encodeURIComponent(String(id))}`,
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
   * Consulta Morador Específico
   *
   * Rota para consulta de morador específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getMoradorId(id: number): __Observable<null> {
    return this.getMoradorIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Morador
   *
   * Rota para alteração de morador.
   * @param id Identificador do registro
   */
  putMoradorIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/morador/${encodeURIComponent(String(id))}`,
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
   * Alterar Morador
   *
   * Rota para alteração de morador.
   * @param id Identificador do registro
   */
  putMoradorId(id: number): __Observable<null> {
    return this.putMoradorIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module MoradoresService {
}

export { MoradoresService }
