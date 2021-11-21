import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from '@common/loader/loader.interceptor';
import { LoaderModule } from '@common/loader/loader.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ApiConfiguration } from './api/api-configuration';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
        INIT_LOADER_INTERCEPTOR_APPLICATION
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
