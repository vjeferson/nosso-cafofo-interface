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
class ClientesService extends __BaseService {
  static readonly postClientePath = '/cliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Cadastro de Novos Cliente (Padrão).
   *
   * Rota para cadastro de novos clientes no sistema usando email e senha como informações de acesso
   */
  postClienteResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cliente`,
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
   * Cadastro de Novos Cliente (Padrão).
   *
   * Rota para cadastro de novos clientes no sistema usando email e senha como informações de acesso
   */
  postCliente(): __Observable<null> {
    return this.postClienteResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ClientesService {
}

export { ClientesService }
