import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SlickRoutes } from './workspace-slick.routing';
import { FixedWidthComponent } from './components/fixed-width-slick/fixed-width.component';
import { CenterSlickComponent } from './components/center-slick/center-slick.component';
import { FullScreenSlickComponent } from './components/full-screen-slick/full-screen-slick.component';
import { ShowThreeSlickComponent } from './components/show-three-slick/show-three-slick.component';
import { VariableWidthSlickComponent } from './components/variabe-width-slick/variabe-width-slick.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SlickModule } from '@rooi/slick';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SlickRoutes),
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        SlickModule,
        MatButtonModule
    ],
    declarations: [
        FixedWidthComponent,
        CenterSlickComponent,
        FullScreenSlickComponent,
        ShowThreeSlickComponent,
        VariableWidthSlickComponent
    ]
})
export class WorkspaceSlickModule {}
