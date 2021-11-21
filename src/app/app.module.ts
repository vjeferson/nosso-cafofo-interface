import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
        })
    ],
    providers: [
        INIT_API_CONFIGURATION
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
