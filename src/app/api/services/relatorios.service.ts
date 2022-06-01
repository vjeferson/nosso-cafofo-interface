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
class RelatoriosService extends __BaseService {
  static readonly getRelatoriosAssinantesPath = '/relatorios/assinantes';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Gerar Relatório de Assinantes (PDF)
   *
   * Rota para gerar Relatório de Assinantes (PDF).
   */
  getRelatoriosAssinantesResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/relatorios/assinantes`,
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
   * Gerar Relatório de Assinantes (PDF)
   *
   * Rota para gerar Relatório de Assinantes (PDF).
   */
  getRelatoriosAssinantes(): __Observable<null> {
    return this.getRelatoriosAssinantesResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
}

module RelatoriosService {
}

export { RelatoriosService }
