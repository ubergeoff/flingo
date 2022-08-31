import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '@rooi/spinner';
import { SpinnerDemoComponent } from './components/spinners/spinner-demo.component';
import { SpinnersRoutes } from './spinners.routing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TickButtonModule } from '@rooi/buttons';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SpinnersRoutes),
        SpinnerModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
        ContentLoaderModule,
        TickButtonModule
    ],
    declarations: [SpinnerDemoComponent]
})
export class WorkspaceSpinnersModule {}
