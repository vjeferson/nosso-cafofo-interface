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
class EstatisticasService extends __BaseService {
  static readonly getEstatisticasCountAssinantesPath = '/estatisticas/count-assinantes';
  static readonly getEstatisticasCountPagamentosPath = '/estatisticas/count-pagamentos';
  static readonly getEstatisticasUltimaReuniaoPath = '/estatisticas/ultima-reuniao';
  static readonly getEstatisticasPercentualAssinantesPorPlanoPath = '/estatisticas/percentual-assinantes-por-plano';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Número de assinaturas total
   *
   * Rota para consulta do número de assinaturas total. Apenas Administradores Nosso Cafofo.
   */
  getEstatisticasCountAssinantesResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/estatisticas/count-assinantes`,
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
   * Número de assinaturas total
   *
   * Rota para consulta do número de assinaturas total. Apenas Administradores Nosso Cafofo.
   */
  getEstatisticasCountAssinantes(): __Observable<null> {
    return this.getEstatisticasCountAssinantesResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Número de pagamentos total
   *
   * Rota para consulta do número de pagamentos total. Apenas Administradores Nosso Cafofo.
   */
  getEstatisticasCountPagamentosResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/estatisticas/count-pagamentos`,
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
   * Número de pagamentos total
   *
   * Rota para consulta do número de pagamentos total. Apenas Administradores Nosso Cafofo.
   */
  getEstatisticasCountPagamentos(): __Observable<null> {
    return this.getEstatisticasCountPagamentosResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Data da última reunião
   *
   * Rota para consulta data da última reunião cadastrada.
   */
  getEstatisticasUltimaReuniaoResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/estatisticas/ultima-reuniao`,
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
   * Data da última reunião
   *
   * Rota para consulta data da última reunião cadastrada.
   */
  getEstatisticasUltimaReuniao(): __Observable<null> {
    return this.getEstatisticasUltimaReuniaoResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Percentual de assinantes ativos por plano
   *
   * Rota para consulta o percentual de assinantes ativos por plano. Apenas Administradores Nosso Cafofo.
   */
  getEstatisticasPercentualAssinantesPorPlanoResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/estatisticas/percentual-assinantes-por-plano`,
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
   * Percentual de assinantes ativos por plano
   *
   * Rota para consulta o percentual de assinantes ativos por plano. Apenas Administradores Nosso Cafofo.
   */
  getEstatisticasPercentualAssinantesPorPlano(): __Observable<null> {
    return this.getEstatisticasPercentualAssinantesPorPlanoResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
}

module EstatisticasService {
}

export { EstatisticasService }
