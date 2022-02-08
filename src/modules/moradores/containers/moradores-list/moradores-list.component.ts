import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-moradores',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './moradores-list.component.html',
    styleUrls: ['./moradores-list.component.scss'],
})
export class MoradoresComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() { }

}