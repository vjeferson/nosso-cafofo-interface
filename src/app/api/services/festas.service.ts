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
class FestasService extends __BaseService {
  static readonly postFestaPath = '/festa';
  static readonly getFestaPath = '/festa';
  static readonly getFestaIdPath = '/festa/{id}';
  static readonly putFestaIdPath = '/festa/{id}';
  static readonly deleteFestaIdPath = '/festa/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Festa
   *
   * Rota para criação de festas no sistema.
   */
  postFestaResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/festa`,
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
   * Cadastro de Festa
   *
   * Rota para criação de festas no sistema.
   */
  postFesta(): __Observable<null> {
    return this.postFestaResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Festas
   *
   * Rota para consulta de festas.
   * @param situacao Código situação
   * @param descricao Descrição da reunião
   */
  getFestaResponse(situacao?: number,
    descricao?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (situacao != null) __params = __params.set('situacao', situacao.toString());
    if (descricao != null) __params = __params.set('descricao', descricao.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/festa`,
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
   * Consulta Festas
   *
   * Rota para consulta de festas.
   * @param situacao Código situação
   * @param descricao Descrição da reunião
   */
  getFesta(situacao?: number,
    descricao?: string): __Observable<null> {
    return this.getFestaResponse(situacao, descricao).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Festa Específica
   *
   * Rota para consulta de festa específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getFestaIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/festa/${encodeURIComponent(String(id))}`,
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
   * Consulta Festa Específica
   *
   * Rota para consulta de festa específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getFestaId(id: number): __Observable<null> {
    return this.getFestaIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Festa
   *
   * Rota para alteração de festa.
   * @param id Identificador do registro
   */
  putFestaIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/festa/${encodeURIComponent(String(id))}`,
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
   * Alterar Festa
   *
   * Rota para alteração de festa.
   * @param id Identificador do registro
   */
  putFestaId(id: number): __Observable<null> {
    return this.putFestaIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deleta Festa
   *
   * Rota para deletar/remover uma festa pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteFestaIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/festa/${encodeURIComponent(String(id))}`,
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
   * Deleta Festa
   *
   * Rota para deletar/remover uma festa pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteFestaId(id: number): __Observable<null> {
    return this.deleteFestaIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module FestasService {
}

export { FestasService }
