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
class PerfisService extends __BaseService {
  static readonly getPerfilPath = '/perfil';
  static readonly getPerfilIdPath = '/perfil/{id}';
  static readonly putPerfilIdPath = '/perfil/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta Perfis
   *
   * Rota para consulta de perfis.
   * @param tipoPerfil Tipo de perfil
   * @param descricao Descrição do perfil
   */
  getPerfilResponse(tipoPerfil?: number,
    descricao?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (tipoPerfil != null) __params = __params.set('tipoPerfil', tipoPerfil.toString());
    if (descricao != null) __params = __params.set('descricao', descricao.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/perfil`,
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
   * Consulta Perfis
   *
   * Rota para consulta de perfis.
   * @param tipoPerfil Tipo de perfil
   * @param descricao Descrição do perfil
   */
  getPerfil(tipoPerfil?: number,
    descricao?: string): __Observable<null> {
    return this.getPerfilResponse(tipoPerfil, descricao).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Perfil Específico
   *
   * Rota para consulta de perfil específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getPerfilIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/perfil/${encodeURIComponent(String(id))}`,
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
   * Consulta Perfil Específico
   *
   * Rota para consulta de perfil específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getPerfilId(id: number): __Observable<null> {
    return this.getPerfilIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Perfil
   *
   * Rota para alteração de perfil. Apenas Administradores Nosso Cafofo.
   * @param id Identificador do registro
   */
  putPerfilIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/perfil/${encodeURIComponent(String(id))}`,
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
   * Alterar Perfil
   *
   * Rota para alteração de perfil. Apenas Administradores Nosso Cafofo.
   * @param id Identificador do registro
   */
  putPerfilId(id: number): __Observable<null> {
    return this.putPerfilIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PerfisService {
}

export { PerfisService }
