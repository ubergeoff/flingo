import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ProgressService } from '@rooi/workspace/shared';
import { Observable } from 'rxjs';

/** @title Responsive sidenav */
@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: []
})
export class FullComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    dir = 'ltr';
    green = false;
    blue = false;
    dark = false;
    minisidebar = false;
    boxed = false;
    danger = false;
    showHide = false;
    url = '';
    sidebarOpened = false;
    status = false;
    isLoading$: Observable<boolean>;
    showSearch = false;
    config: PerfectScrollbarConfigInterface = {};

    private _mobileQueryListener: () => void;

    clickEvent() {
        this.status = !this.status;
    }

    constructor(
        public router: Router,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public menuItems: MenuItems,
        private progress: ProgressService
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 920px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.isLoading$ = this.progress.progress$;
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    // Mini sidebar
}
