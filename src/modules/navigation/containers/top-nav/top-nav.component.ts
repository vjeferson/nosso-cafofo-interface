import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuarioAutenticado } from '@app/models/retorno-autenticacao';
import { mapTiposPerfis } from '@app/utils/consts';
import { UploadFileService } from '@app/utils/upload-file.service';
import { UsuarioLogadoService } from '@common/services';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    public usuario: IUsuarioAutenticado;
    public mapTiposPerfis = mapTiposPerfis;
    public profileUrlImage: string;

    constructor(
        private navigationService: NavigationService,
        private readonly _usuarioLogadoService: UsuarioLogadoService,
        private _uploadFileService: UploadFileService,
        private _cd : ChangeDetectorRef
    ) {
        this.usuario = this._usuarioLogadoService.getDadosSession().usuario;
        this.profileUrlImage =  (this.usuario as any)?.profileUrlImage || 'https://nosso-cafofo-public.s3.sa-east-1.amazonaws.com/images/profile/profile-default.png';
    }

    ngOnInit() {
        this._uploadFileService.changeImage.subscribe(()=>{
            this.usuario = this._usuarioLogadoService.getDadosSession().usuario;
            this.profileUrlImage =  (this.usuario as any)?.profileUrlImage || 'https://nosso-cafofo-public.s3.sa-east-1.amazonaws.com/images/profile/profile-default.png';
            this._cd.detectChanges();
        }); 

        this._usuarioLogadoService.change.subscribe(()=>{
            this.usuario = this._usuarioLogadoService.getDadosSession().usuario;
            this.profileUrlImage =  (this.usuario as any)?.profileUrlImage || 'https://nosso-cafofo-public.s3.sa-east-1.amazonaws.com/images/profile/profile-default.png';
            this._cd.detectChanges();
        }); 
    }

    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }

}
