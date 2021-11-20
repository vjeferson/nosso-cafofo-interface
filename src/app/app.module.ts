import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'environments/environment';
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

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        INIT_API_CONFIGURATION
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
