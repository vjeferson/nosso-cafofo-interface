
import { Injectable } from '@angular/core';
import { IRetornoAutenticacao } from '@app/models/retorno-autenticacao';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioLogadoService {
    protected static instance: UsuarioLogadoService;

    constructor() {
        UsuarioLogadoService.instance = this;
    }

    private static dadosSession: IRetornoAutenticacao | any;

    public static observer: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public static get(): UsuarioLogadoService {
        return UsuarioLogadoService.instance;
    }

    isLogado() {
        if (!UsuarioLogadoService.dadosSession) {
            this.loadDadosSession();
        }
        return UsuarioLogadoService.dadosSession && !!UsuarioLogadoService.dadosSession.token
            && (new Date(UsuarioLogadoService.dadosSession.expiresIn) > new Date()) && !!UsuarioLogadoService.dadosSession.usuario;
    }

    setDadosSession(dadosSession: IRetornoAutenticacao) {
        UsuarioLogadoService.dadosSession = dadosSession;
        sessionStorage.setItem('session-information', JSON.stringify(UsuarioLogadoService.dadosSession));
        UsuarioLogadoService.observer.next(UsuarioLogadoService.dadosSession);
    }

    private loadDadosSession() {
        const dados = sessionStorage.getItem('session-information');
        if (dados) {
            UsuarioLogadoService.dadosSession = JSON.parse(dados);
        }
    }

    getDadosSession(): IRetornoAutenticacao | any {
        if (this.isLogado()) {
            return UsuarioLogadoService.dadosSession;
        } else {
            this.logout();
        }
    }

    logout() {
        sessionStorage.removeItem('session-information');
        UsuarioLogadoService.dadosSession = null;
    }

}
