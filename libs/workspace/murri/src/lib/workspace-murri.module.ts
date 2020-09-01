import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MuuriRoutes } from './workspace-muuri.routing';
import { MuuriModule } from '@rooi/muuri';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StarWarsComponent } from './components/starwars/star-wars.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MuuriRoutes),
        MuuriModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [DashboardComponent, StarWarsComponent]
})
export class WorkspaceMurriModule {}
