import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AutenticacaoService } from '@app/api/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    public subscription: Subscription = new Subscription();
    public routeDataSubscription!: Subscription;
    public year: number;

    constructor(public navigationService: NavigationService, public userService: AutenticacaoService) {
        this.year = new Date().getFullYear();
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
