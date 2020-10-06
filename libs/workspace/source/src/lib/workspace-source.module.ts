import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceComponent } from './source/source.component';
import { RouterModule } from '@angular/router';
import { SourceRoutes } from './workspace-source.routing';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(SourceRoutes)],
    declarations: [SourceComponent]
})
export class WorkspaceSourceModule {}
