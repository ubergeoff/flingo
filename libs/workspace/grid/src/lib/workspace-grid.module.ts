import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridRoutes } from './workspace-grid.routing';
import { GridDemoComponent } from './components/grid/grid-demo.component';
import { GridModule } from '@rooi/grid';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(GridRoutes), GridModule],
    declarations: [GridDemoComponent]
})
export class WorkspaceGridModule {}
