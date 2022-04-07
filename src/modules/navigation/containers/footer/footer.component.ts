import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-footer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.scss'],
})
export class FooterComponent implements OnInit {
    public year: number;

    constructor() {
        this.year = new Date().getFullYear();
    }
    
    ngOnInit() { }
}
