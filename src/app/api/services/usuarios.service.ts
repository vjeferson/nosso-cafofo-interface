/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AtualizaUsuario } from '../models/atualiza-usuario';
import { TrocaSenha } from '../models/troca-senha';
import { InformacaoVinculacaoAccountSocial } from '../models/informacao-vinculacao-account-social';
import { InformacaoDesvinculacaoAccountSocial } from '../models/informacao-desvinculacao-account-social';
@Injectable({
  providedIn: 'root',
})
class UsuariosService extends __BaseService {
  static readonly postUsuarioPath = '/usuario';
  static readonly getUsuarioPath = '/usuario';
  static readonly getUsuarioIdPath = '/usuario/{id}';
  static readonly putUsuarioIdPath = '/usuario/{id}';
  static readonly putUsuarioIdTrocaSenhaPath = '/usuario/{id}/troca-senha';
  static readonly putUsuarioIdVincularAccountSocialPath = '/usuario/{id}/vincular-account-social';
  static readonly putUsuarioIdDesvincularAccountSocialPath = '/usuario/{id}/desvincular-account-social';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Usuário
   *
   * Rota para criação de usuários no sistema.
   */
  postUsuarioResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario`,
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
   * Cadastro de Usuário
   *
   * Rota para criação de usuários no sistema.
   */
  postUsuario(): __Observable<null> {
    return this.postUsuarioResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Usuários
   *
   * Rota para consulta de usuários.
   * @param nome Nome do usuário para busca
   */
  getUsuarioResponse(nome?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (nome != null) __params = __params.set('nome', nome.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario`,
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
   * Consulta Usuários
   *
   * Rota para consulta de usuários.
   * @param nome Nome do usuário para busca
   */
  getUsuario(nome?: string): __Observable<null> {
    return this.getUsuarioResponse(nome).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Usuário Específico
   *
   * Rota para consulta de usuário específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getUsuarioIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario/${encodeURIComponent(String(id))}`,
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
   * Consulta Usuário Específico
   *
   * Rota para consulta de usuário específico pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getUsuarioId(id: number): __Observable<null> {
    return this.getUsuarioIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Usuário
   *
   * Rota para alteração de usuário.
   * @param id Identificador do registro
   * @param body Novas informações do Usuário
   */
  putUsuarioIdResponse(id: number,
    body: AtualizaUsuario): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/usuario/${encodeURIComponent(String(id))}`,
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
   * Alterar Usuário
   *
   * Rota para alteração de usuário.
   * @param id Identificador do registro
   * @param body Novas informações do Usuário
   */
  putUsuarioId(id: number,
    body: AtualizaUsuario): __Observable<null> {
    return this.putUsuarioIdResponse(id, body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Trocar Senha de Usuário
   *
   * Rota para alteração de senha de usuário.
   * @param id Identificador do usuário
   * @param body Novas informações de senha
   */
  putUsuarioIdTrocaSenhaResponse(id: number,
    body: TrocaSenha): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/usuario/${encodeURIComponent(String(id))}/troca-senha`,
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
   * Trocar Senha de Usuário
   *
   * Rota para alteração de senha de usuário.
   * @param id Identificador do usuário
   * @param body Novas informações de senha
   */
  putUsuarioIdTrocaSenha(id: number,
    body: TrocaSenha): __Observable<null> {
    return this.putUsuarioIdTrocaSenhaResponse(id, body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Vincular Conta Social
   *
   * Rota para vinculação de conta social ao usuário.
   * @param id Identificador do usuário
   * @param body Informações de vinculação
   */
  putUsuarioIdVincularAccountSocialResponse(id: number,
    body: InformacaoVinculacaoAccountSocial): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/usuario/${encodeURIComponent(String(id))}/vincular-account-social`,
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
   * Vincular Conta Social
   *
   * Rota para vinculação de conta social ao usuário.
   * @param id Identificador do usuário
   * @param body Informações de vinculação
   */
  putUsuarioIdVincularAccountSocial(id: number,
    body: InformacaoVinculacaoAccountSocial): __Observable<null> {
    return this.putUsuarioIdVincularAccountSocialResponse(id, body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Desvincular Conta Social
   *
   * Rota para desvinculação de conta social ao usuário.
   * @param id Identificador do usuário
   * @param body Informações de desvinculação
   */
  putUsuarioIdDesvincularAccountSocialResponse(id: number,
    body: InformacaoDesvinculacaoAccountSocial): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/usuario/${encodeURIComponent(String(id))}/desvincular-account-social`,
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
   * Desvincular Conta Social
   *
   * Rota para desvinculação de conta social ao usuário.
   * @param id Identificador do usuário
   * @param body Informações de desvinculação
   */
  putUsuarioIdDesvincularAccountSocial(id: number,
    body: InformacaoDesvinculacaoAccountSocial): __Observable<null> {
    return this.putUsuarioIdDesvincularAccountSocialResponse(id, body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UsuariosService {
}

export { UsuariosService }
