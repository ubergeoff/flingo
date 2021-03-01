import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridRoutes } from './workspace-grid.routing';
import { GridDemoComponent } from './components/grid/grid-demo.component';
import { GridModule } from '@rooi/grid';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ActionButtonComponent } from './components/action-button/action-button.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(GridRoutes), GridModule, MatDialogModule, MatButtonModule],
    declarations: [GridDemoComponent, DialogComponent, ActionButtonComponent]
})
export class WorkspaceGridModule {}
