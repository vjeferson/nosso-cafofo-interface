/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NovoUsuario } from '../models/novo-usuario';
import { AtualizaUsuario } from '../models/atualiza-usuario';
import { TrocaSenha } from '../models/troca-senha';
import { RecuperarSenha } from '../models/recuperar-senha';
import { ValidarCodigoRecuperacaoSenha } from '../models/validar-codigo-recuperacao-senha';
import { TrocaSenhaRecuperacao } from '../models/troca-senha-recuperacao';
import { InformacaoVerificacaoVinculoAccountSocial } from '../models/informacao-verificacao-vinculo-account-social';
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
  static readonly putUsuarioAtivarIdPath = '/usuario/ativar/{id}';
  static readonly putUsuarioDesativarIdPath = '/usuario/desativar/{id}';
  static readonly putUsuarioIdTrocaSenhaPath = '/usuario/{id}/troca-senha';
  static readonly postUsuarioRecuperarSenhaPath = '/usuario/recuperar-senha';
  static readonly postUsuarioValidaCodigoRecuperacaoSenhaPath = '/usuario/valida-codigo-recuperacao-senha';
  static readonly postUsuarioTrocaSenhaRecuperacaoPath = '/usuario/troca-senha-recuperacao';
  static readonly postUsuarioVerificaVinculoAccountSocialPath = '/usuario/verifica-vinculo-account-social';
  static readonly putUsuarioIdVincularAccountSocialPath = '/usuario/{id}/vincular-account-social';
  static readonly putUsuarioIdDesvincularAccountSocialPath = '/usuario/{id}/desvincular-account-social';
  static readonly postUsuarioTrocaImagemProfilePath = '/usuario/troca-imagem-profile';

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
   * @param body Informações do novo usuário
   */
  postUsuarioResponse(body: NovoUsuario): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
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
   * @param body Informações do novo usuário
   */
  postUsuario(body: NovoUsuario): __Observable<null> {
    return this.postUsuarioResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Usuários
   *
   * Rota para consulta de usuários.
   * @param params The `UsuariosService.GetUsuarioParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `nome`: Nome do usuário para busca
   *
   * - `ativo`: Buscar usuários ativos?
   */
  getUsuarioResponse(params: UsuariosService.GetUsuarioParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.nome != null) __params = __params.set('nome', params.nome.toString());
    if (params.ativo != null) __params = __params.set('ativo', params.ativo.toString());
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
   * @param params The `UsuariosService.GetUsuarioParams` containing the following parameters:
   *
   * - `offset`: Offset da consulta (para paginação)
   *
   * - `limit`: Limit da consulta (para paginação: máximo de 50 registros por consulta)
   *
   * - `nome`: Nome do usuário para busca
   *
   * - `ativo`: Buscar usuários ativos?
   */
  getUsuario(params: UsuariosService.GetUsuarioParams): __Observable<null> {
    return this.getUsuarioResponse(params).pipe(
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
   * Ativar Usuários
   *
   * Rota para ativação de usuários.
   * @param id Identificador do registro
   */
  putUsuarioAtivarIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/usuario/ativar/${encodeURIComponent(String(id))}`,
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
   * Ativar Usuários
   *
   * Rota para ativação de usuários.
   * @param id Identificador do registro
   */
  putUsuarioAtivarId(id: number): __Observable<null> {
    return this.putUsuarioAtivarIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Desativar Usuário
   *
   * Rota para desativação de usuário.
   * @param id Identificador do registro
   */
  putUsuarioDesativarIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/usuario/desativar/${encodeURIComponent(String(id))}`,
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
   * Desativar Usuário
   *
   * Rota para desativação de usuário.
   * @param id Identificador do registro
   */
  putUsuarioDesativarId(id: number): __Observable<null> {
    return this.putUsuarioDesativarIdResponse(id).pipe(
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
   * Recuperar Senha
   *
   * Rota para geração do código de recuperação de senha.
   * @param body Informações de recuperação
   */
  postUsuarioRecuperarSenhaResponse(body: RecuperarSenha): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/recuperar-senha`,
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
   * Recuperar Senha
   *
   * Rota para geração do código de recuperação de senha.
   * @param body Informações de recuperação
   */
  postUsuarioRecuperarSenha(body: RecuperarSenha): __Observable<null> {
    return this.postUsuarioRecuperarSenhaResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Valida Código Recuperação de Senha
   *
   * Rota para validação do código de recuperação de senha.
   * @param body Informações de validação
   */
  postUsuarioValidaCodigoRecuperacaoSenhaResponse(body: ValidarCodigoRecuperacaoSenha): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/valida-codigo-recuperacao-senha`,
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
   * Valida Código Recuperação de Senha
   *
   * Rota para validação do código de recuperação de senha.
   * @param body Informações de validação
   */
  postUsuarioValidaCodigoRecuperacaoSenha(body: ValidarCodigoRecuperacaoSenha): __Observable<null> {
    return this.postUsuarioValidaCodigoRecuperacaoSenhaResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Troca de Senha da Recuperação
   *
   * Rota para trocar a senha no processo de recuperação da mesma.
   * @param body Novas informações de senha
   */
  postUsuarioTrocaSenhaRecuperacaoResponse(body: TrocaSenhaRecuperacao): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/troca-senha-recuperacao`,
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
   * Troca de Senha da Recuperação
   *
   * Rota para trocar a senha no processo de recuperação da mesma.
   * @param body Novas informações de senha
   */
  postUsuarioTrocaSenhaRecuperacao(body: TrocaSenhaRecuperacao): __Observable<null> {
    return this.postUsuarioTrocaSenhaRecuperacaoResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Verifica Vinculo Conta Social
   *
   * Rota para verificação de vinculaçao de algum usuário a conta social informada.
   * @param body Informações de vinculo
   */
  postUsuarioVerificaVinculoAccountSocialResponse(body: InformacaoVerificacaoVinculoAccountSocial): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/verifica-vinculo-account-social`,
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
   * Verifica Vinculo Conta Social
   *
   * Rota para verificação de vinculaçao de algum usuário a conta social informada.
   * @param body Informações de vinculo
   */
  postUsuarioVerificaVinculoAccountSocial(body: InformacaoVerificacaoVinculoAccountSocial): __Observable<null> {
    return this.postUsuarioVerificaVinculoAccountSocialResponse(body).pipe(
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

  /**
   * Troca de Imagem de Profile
   *
   * Rota para trocar a imagem de Profile (Perfil).
   * @param body Arquivo de imagem
   */
  postUsuarioTrocaImagemProfileResponse(body: {avatar?: Blob}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (body != null) { __formData.append('body', body as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/troca-imagem-profile`,
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
   * Troca de Imagem de Profile
   *
   * Rota para trocar a imagem de Profile (Perfil).
   * @param body Arquivo de imagem
   */
  postUsuarioTrocaImagemProfile(body: {avatar?: Blob}): __Observable<null> {
    return this.postUsuarioTrocaImagemProfileResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UsuariosService {

  /**
   * Parameters for getUsuario
   */
  export interface GetUsuarioParams {

    /**
     * Offset da consulta (para paginação)
     */
    offset: number;

    /**
     * Limit da consulta (para paginação: máximo de 50 registros por consulta)
     */
    limit: number;

    /**
     * Nome do usuário para busca
     */
    nome?: string;

    /**
     * Buscar usuários ativos?
     */
    ativo?: boolean;
  }
}

export { UsuariosService }
