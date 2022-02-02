import { Injectable } from '@angular/core';
import { AccountSocial } from '@app/models/account-social.models';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
declare var FB: any;
declare var gapi: any;

@Injectable({
    providedIn: 'root'
})
class AccountSocialService {
    private readonly accountSocial: AccountSocial;
    private loginFacebookEnabled = false;
    private loginGoogleEnabled = false;
    private authGoogleInstance: any;

    constructor(
        private readonly _toastService: ToastrService
    ) {
        this.configuraFacebook();
        //this.configuraGoogle();
        this.accountSocial = {
            id: null,
            name: null,
            email: null,
            telefone: null,
            socialType: null
        } as any;
    }

    private configuraFacebook() {
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

            this.loginFacebookEnabled = true;
        }
    }

    // private configuraGoogle(): Promise<void> {
    //     if (environment.googleClientId) {
    //         const pload = new Promise(resolve => {
    //             gapi.load('auth2', resolve);
    //         });
    //         return pload.then(async () => {
    //             await gapi.auth2
    //                 .init({ client_id: environment.googleClientId })
    //                 .then((auth: any) => {
    //                     this.authGoogleInstance = auth;
    //                     this.loginGoogleEnabled = true;
    //                 });
    //         });
    //     }
    // }

    public get accountSocialValue(): AccountSocial {
        return this.accountSocial;
    }

    public authenticateFacebook(): Promise<AccountSocial> {
        return new Promise(async (resolve, reject) => {
            if (this.loginFacebookEnabled) {
                this.accountSocial.socialType = 'facebook';
                this.verificaStatusLoginFacebook().then(
                    response => {
                        if (response.status === 'connected') {
                            this.buscaDadosUsuarioFacebook().then(
                                (accountSocial: AccountSocial) => {
                                    resolve(accountSocial);
                                }
                            );
                        } else {
                            this.loginUsuarioFacebook().then(
                                (responseLogin: any) => {
                                    if (responseLogin.status === 'connected') {
                                        this.buscaDadosUsuarioFacebook().then(
                                            (accountSocial: AccountSocial) => {
                                                resolve(accountSocial);
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
                this._toastService.error('Erro: Login com Facebook está temporariamente desativado!', 'Erro');
                reject();
            }
        });
    }

    private verificaStatusLoginFacebook(): Promise<any> {
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

    private loginUsuarioFacebook(): Promise<any> {
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

    private buscaDadosUsuarioFacebook(): Promise<AccountSocial> {
        return new Promise<AccountSocial>((resolve, reject) => {
            FB.api('/me', 'GET', { 'fields': 'id,name,email' }, (response: any) => {
                if (response) {
                    Object.assign(this.accountSocial, response);
                    resolve(this.accountSocial);
                } else {
                    reject();
                }
            });
        });
    }

    public authenticateGoogle(): Promise<AccountSocial> {
        return new Promise(async (resolve, reject) => {
            if (this.loginGoogleEnabled) {
                this.accountSocial.socialType = 'google';
                await this.authGoogleInstance.signIn({
                    scope: 'profile email'
                }).then(
                    (user: any) => {
                        if (user) {
                            this.accountSocial.id = user.getBasicProfile().getId();
                            this.accountSocial.name = user.getBasicProfile().getName();
                            this.accountSocial.email = user.getBasicProfile().getEmail();
                            resolve(this.accountSocial)
                        }
                    }, (error: any) => {
                        resolve(null as any);
                    }
                );
            } else {
                this._toastService.error('Erro: Login com Google está temporariamente desativado!', 'Erro');
                reject();
            }
        });
    }
}

module AccountSocialService { }
export { AccountSocialService };