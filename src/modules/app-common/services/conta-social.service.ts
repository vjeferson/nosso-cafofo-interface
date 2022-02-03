import { Injectable } from '@angular/core';
import { ContaSocial } from '@app/models/account-social.models';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
declare var FB: any;

@Injectable({
    providedIn: 'root'
})
export class ContaSocialService {
    private readonly contaSocial: ContaSocial;
    private loginComFacebookLiberado = false;

    constructor(
        private readonly _toastService: ToastrService
    ) {
        this.contaSocial = {
            id: null,
            name: null,
            email: null,
            tipoConta: null
        } as any;
        this.configurarApiFacebook();
    }

    private configurarApiFacebook() {
        if (environment.appIdFacebook && environment.appSecretFacebook) {
            (window as any).fbAsyncInit = function () {
                FB.init({
                    appId: environment.appIdFacebook,
                    appSecret: environment.appSecretFacebook,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    autoLogAppEvents: true,
                    version: 'v12.0'
                });
            };

            (function (d) {
                let js;
                const id = 'facebook-jssdk',
                    ref: any = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = '//connect.facebook.net/pt_BR/all.js';
                ref.parentNode.insertBefore(js, ref);
            }(document));

            this.loginComFacebookLiberado = true;
        }
    }

    public get contaSocialValue(): ContaSocial {
        return this.contaSocial;
    }

    private verificaStatusLoginDoFacebook(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            FB.getLoginStatus((response: any) => {
                if (response) {
                    resolve(response);
                } else {
                    reject();
                }
            });
        });
    }

    private loginComContaDoFacebook(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            FB.login((responseLogin: any) => {
                if (responseLogin) {
                    resolve(responseLogin);
                } else {
                    reject();
                }
            }, { scope: 'public_profile, email' });
        });
    }

    private buscaDadosUsuarioFacebook(): Promise<ContaSocial> {
        return new Promise<ContaSocial>((resolve, reject) => {
            FB.api('/me', 'GET', { 'fields': 'id,name,email' }, (response: any) => {
                if (response) {
                    Object.assign(this.contaSocial, response);
                    resolve(this.contaSocial);
                } else {
                    reject();
                }
            });
        });
    }

    public autenticarComContaDoFacebook(): Promise<ContaSocial> {
        return new Promise(async (resolve, reject) => {
            if (this.loginComFacebookLiberado) {
                this.contaSocial.tipoConta = 'facebook';
                this.verificaStatusLoginDoFacebook().then(
                    response => {
                        if (response.status === 'connected') {
                            this.buscaDadosUsuarioFacebook().then(
                                (conta: ContaSocial) => {
                                    resolve(conta);
                                }
                            );
                        } else {
                            this.loginComContaDoFacebook().then(
                                (responseLogin: any) => {
                                    if (responseLogin.status === 'connected') {
                                        this.buscaDadosUsuarioFacebook().then(
                                            (conta: ContaSocial) => {
                                                resolve(conta);
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                ).catch(err => {
                    this._toastService.error(err.message, 'Erro');
                });
            } else {
                this._toastService.error('Login com Facebook está temporariamente indisponível!', 'Erro');
                reject();
            }
        });
    }

}