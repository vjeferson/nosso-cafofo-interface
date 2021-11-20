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
class EstadosService extends __BaseService {
  static readonly getEstadoPath = '/estado';
  static readonly getEstadoIdPath = '/estado/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta Estados
   *
   * Rota para consulta de estados.
   * @param id Identificador(sigla) do estado
   * @param estado Nome do Estado
   */
  getEstadoResponse(id?: string,
    estado?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    if (estado != null) __params = __params.set('estado', estado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/estado`,
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
   * Consulta Estados
   *
   * Rota para consulta de estados.
   * @param id Identificador(sigla) do estado
   * @param estado Nome do Estado
   */
  getEstado(id?: string,
    estado?: string): __Observable<null> {
    return this.getEstadoResponse(id, estado).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta Estado Específico
   *
   * Rota para consulta de estado específico pelo id (identificação/sigla do registro).
   * @param id Identificador/Sigla do registro
   */
  getEstadoIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/estado/${encodeURIComponent(String(id))}`,
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
   * Consulta Estado Específico
   *
   * Rota para consulta de estado específico pelo id (identificação/sigla do registro).
   * @param id Identificador/Sigla do registro
   */
  getEstadoId(id: string): __Observable<null> {
    return this.getEstadoIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module EstadosService {
}

export { EstadosService }
