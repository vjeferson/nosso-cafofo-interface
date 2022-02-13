/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Autenticar } from '../models/autenticar';
import { AutenticarContaSocial } from '../models/autenticar-conta-social';
@Injectable({
  providedIn: 'root',
})
class AutenticacaoService extends __BaseService {
  static readonly postAuthenticatePath = '/authenticate';
  static readonly postAuthenticateContaSocialPath = '/authenticate-conta-social';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Rota para autenticação na API
   *
   * Rota para autenticar e validar o usuário para acesso.
   * @param parametros Parametros para Autenticação
   */
  postAuthenticateResponse(parametros: Autenticar): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametros;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/authenticate`,
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
   * Rota para autenticação na API
   *
   * Rota para autenticar e validar o usuário para acesso.
   * @param parametros Parametros para Autenticação
   */
  postAuthenticate(parametros: Autenticar): __Observable<null> {
    return this.postAuthenticateResponse(parametros).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Rota para autenticação na API usando Conta Social (Facebook/Google)
   *
   * Rota para autenticar e validar o usuário para acesso usando uma conta social.
   * @param parametros Parametros para Autenticação
   */
  postAuthenticateContaSocialResponse(parametros: AutenticarContaSocial): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametros;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/authenticate-conta-social`,
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
   * Rota para autenticação na API usando Conta Social (Facebook/Google)
   *
   * Rota para autenticar e validar o usuário para acesso usando uma conta social.
   * @param parametros Parametros para Autenticação
   */
  postAuthenticateContaSocial(parametros: AutenticarContaSocial): __Observable<null> {
    return this.postAuthenticateContaSocialResponse(parametros).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AutenticacaoService {
}

export { AutenticacaoService }
