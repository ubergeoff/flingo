import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate/donate.component';
import { RouterModule } from '@angular/router';
import { DonateRoutes } from './workspace-donate.routing';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(DonateRoutes)],
    declarations: [DonateComponent]
})
export class WorkspaceDonateModule {}
