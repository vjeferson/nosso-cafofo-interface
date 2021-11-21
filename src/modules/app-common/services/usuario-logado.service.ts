
import { Injectable } from '@angular/core';
import { RetornoAutenticacao } from '@app/models/retorno-autenticacao';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsuarioLogadoService {

    protected static instance: UsuarioLogadoService;

    constructor(
    ) {
        UsuarioLogadoService.instance = this;
    }

    private static dadosSession: any = null;
    private static isLoaded = false;

    public static observer: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public static get(): UsuarioLogadoService {
        return UsuarioLogadoService.instance;
    }

    isLogado() {
        debugger;
        if (!UsuarioLogadoService.dadosSession) {
            this.loadeDadosSession();
        }
        return UsuarioLogadoService.dadosSession && !!UsuarioLogadoService.dadosSession.token && (new Date(UsuarioLogadoService.dadosSession.expiresIn) > new Date());
    }

    setDadosSession(dadosSession: RetornoAutenticacao) {
        debugger
        sessionStorage.setItem('session-information', JSON.stringify(dadosSession));
        UsuarioLogadoService.dadosSession = dadosSession;
        UsuarioLogadoService.observer.next(dadosSession);
    }

    private loadeDadosSession() {
        const dados = sessionStorage.getItem('session-information');
        if (dados) {
            UsuarioLogadoService.dadosSession = JSON.parse(dados);
        }
    }

    getDadosSession(): RetornoAutenticacao {
        return UsuarioLogadoService.dadosSession;
    }

    logout() {

    }

}
