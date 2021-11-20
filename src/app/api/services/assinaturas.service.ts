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
class AssinaturasService extends __BaseService {
  static readonly postAssinaturaAssinarPlanoPath = '/assinatura/assinar-plano';
  static readonly getAssinaturaPath = '/assinatura';
  static readonly getAssinaturaIdPath = '/assinatura/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Assinar Plano
   *
   * Rota para assinar plano.
   */
  postAssinaturaAssinarPlanoResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/assinatura/assinar-plano`,
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
   * Assinar Plano
   *
   * Rota para assinar plano.
   */
  postAssinaturaAssinarPlano(): __Observable<null> {
    return this.postAssinaturaAssinarPlanoResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Assinaturas
   *
   * Rota para consulta de assinaturas.
   * @param planoId Identificador(id) do Plano
   * @param ativa Situação da assinatura. Assinatura esta ativa?
   */
  getAssinaturaResponse(planoId?: number,
    ativa?: boolean): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (planoId != null) __params = __params.set('planoId', planoId.toString());
    if (ativa != null) __params = __params.set('ativa', ativa.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/assinatura`,
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
   * Consulta Assinaturas
   *
   * Rota para consulta de assinaturas.
   * @param planoId Identificador(id) do Plano
   * @param ativa Situação da assinatura. Assinatura esta ativa?
   */
  getAssinatura(planoId?: number,
    ativa?: boolean): __Observable<null> {
    return this.getAssinaturaResponse(planoId, ativa).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Assinatura Específica
   *
   * Rota para consulta de assinatura específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getAssinaturaIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/assinatura/${encodeURIComponent(String(id))}`,
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
   * Consulta Assinatura Específica
   *
   * Rota para consulta de assinatura específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getAssinaturaId(id: number): __Observable<null> {
    return this.getAssinaturaIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AssinaturasService {
}

export { AssinaturasService }
