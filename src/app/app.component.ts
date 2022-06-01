import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'nosso-cafofo';
    constructor(public router: Router, private titleService: Title) {
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                let snapshot = (event as ChildActivationEnd).snapshot;
                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }
                this.titleService.setTitle('Nosso Cafofo');
            });
    }

    ngOnInit() {
        if (environment.production) {
            // No servidor 48 esta ocorrendo erro.
            // this.installPwa();
        }
        console.log('Nosso Cafofo - Versão 2.0.0');
    }
}
