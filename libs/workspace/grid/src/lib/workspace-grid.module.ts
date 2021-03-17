import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridRoutes } from './workspace-grid.routing';
import { GridDemoComponent } from './components/grid/grid-demo.component';
import { GridModule } from '@rooi/grid';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ActionButtonComponent } from './components/controls/action-button/action-button.component';
import { CheckboxComponent } from './components/controls/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GridService } from './services/grid.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GridRoutes),
        GridModule,
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule
    ],
    declarations: [GridDemoComponent, DialogComponent, ActionButtonComponent, CheckboxComponent],
    providers: [GridService]
})
export class WorkspaceGridModule {}
