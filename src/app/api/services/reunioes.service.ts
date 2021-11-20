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
class ReunioesService extends __BaseService {
  static readonly postReuniaoPath = '/reuniao';
  static readonly getReuniaoPath = '/reuniao';
  static readonly getReuniaoIdPath = '/reuniao/{id}';
  static readonly putReuniaoIdPath = '/reuniao/{id}';
  static readonly deleteReuniaoIdPath = '/reuniao/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Reunião
   *
   * Rota para criação de reuniões no sistema.
   */
  postReuniaoResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/reuniao`,
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
   * Cadastro de Reunião
   *
   * Rota para criação de reuniões no sistema.
   */
  postReuniao(): __Observable<null> {
    return this.postReuniaoResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Reuniões
   *
   * Rota para consulta de reuniões.
   * @param descricao Descrição da reunião
   * @param data Data e hora da reunião
   */
  getReuniaoResponse(descricao?: string,
    data?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (descricao != null) __params = __params.set('descricao', descricao.toString());
    if (data != null) __params = __params.set('data', data.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/reuniao`,
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
   * Consulta Reuniões
   *
   * Rota para consulta de reuniões.
   * @param descricao Descrição da reunião
   * @param data Data e hora da reunião
   */
  getReuniao(descricao?: string,
    data?: string): __Observable<null> {
    return this.getReuniaoResponse(descricao, data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Reunião Específica
   *
   * Rota para consulta de reunião específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getReuniaoIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/reuniao/${encodeURIComponent(String(id))}`,
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
   * Consulta Reunião Específica
   *
   * Rota para consulta de reunião específica pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  getReuniaoId(id: number): __Observable<null> {
    return this.getReuniaoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Alterar Reunião
   *
   * Rota para alteração de reunião.
   * @param id Identificador do registro
   */
  putReuniaoIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/reuniao/${encodeURIComponent(String(id))}`,
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
   * Alterar Reunião
   *
   * Rota para alteração de reunião.
   * @param id Identificador do registro
   */
  putReuniaoId(id: number): __Observable<null> {
    return this.putReuniaoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Deleta Reunião
   *
   * Rota para deletar/remover uma reunião pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteReuniaoIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/reuniao/${encodeURIComponent(String(id))}`,
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
   * Deleta Reunião
   *
   * Rota para deletar/remover uma reunião pelo id (identificação do registro).
   * @param id Identificador do registro
   */
  deleteReuniaoId(id: number): __Observable<null> {
    return this.deleteReuniaoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ReunioesService {
}

export { ReunioesService }
