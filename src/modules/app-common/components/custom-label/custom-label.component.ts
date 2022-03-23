import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'show-custom-label',
    templateUrl: './custom-label.component.html',
    styleUrls: ['custom-label.component.scss'],
})
export class CustomLabelComponent implements OnInit {
    @Input() required: boolean | any;
    @Input() textLabel: string | any;
    constructor() { }
    ngOnInit() { }
}