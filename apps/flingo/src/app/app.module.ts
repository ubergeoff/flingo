import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { FullComponent } from './layouts/full/full.component';
import { SharedModule } from './shared/shared.module';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { SpinnerComponent } from './shared/spinner.component';
import { MatListModule } from '@angular/material/list';
import { MuuriModule } from '@flingo/muuri';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

@NgModule({
    declarations: [
        AppComponent,
        AppBreadcrumbComponent,
        DashboardComponent,
        FullComponent,
        AppSidebarComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        PerfectScrollbarModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        MatSidenavModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatListModule,
        MuuriModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
