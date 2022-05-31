import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService{
    private readonly BASE_URL = environment.apiUrl;

    public changeImage: Subject<any> = new Subject();

    constructor(private _http: HttpClient){}

    public upload(file: any): Observable<any>{
        const url = `${this.BASE_URL}/usuario/troca-imagem-profile`;
        
        const formData =  new FormData();

        debugger
        formData.append("avatar", file.fileSource, file.fileSource.name);
          
        return this._http.post(url, formData, {responseType: 'text'});
    }

}