import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from '@common/loader/loader.module';
import { UsuarioLogadoService } from '@common/services';
import { environment } from 'environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ApiConfiguration } from './api/api-configuration';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

declare module "@angular/core" {
    interface ModuleWithProviders<T = any> {
        ngModule: Type<T>;
        providers?: Provider[];
    }
}

export function initApiConfiguration(config: ApiConfiguration) {
    return () => {
        config.rootUrl = environment.apiUrl;
    };
}

export const INIT_API_CONFIGURATION: Provider = {
    provide: APP_INITIALIZER,
    useFactory: initApiConfiguration,
    deps: [ApiConfiguration],
    multi: true
};

export const INIT_API_INTERCEPTOR: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
    deps: [UsuarioLogadoService],
};

export const INIT_LOADER_INTERCEPTOR_APPLICATION: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        LoaderModule
    ],
    providers: [
        INIT_API_CONFIGURATION,
        INIT_API_INTERCEPTOR,
        INIT_LOADER_INTERCEPTOR_APPLICATION
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
