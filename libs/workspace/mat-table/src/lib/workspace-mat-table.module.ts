import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDemoComponent } from './components/mat-table/mat-table-demo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RooiMatTableModule } from '@rooi/mat-table';
import { MatTableRoutes } from './workspace-mat-table.routing';
import { MatTableRowDemoModule } from './components/mat-table-row/mat-table-row-demo.module';
import { MatTableExpansionRowDemoModule } from './components/mat-table-expantion-row/mat-table-expansion-row-demo.module';
import { MatTableFilterModule } from './components/filter-component/mat-table-filter.module';

@NgModule({
    imports: [
        RouterModule.forChild(MatTableRoutes),
        CommonModule,
        MatDialogModule,
        MatTableFilterModule,
        MatTableExpansionRowDemoModule,
        MatTableRowDemoModule,
        RooiMatTableModule
    ],
    declarations: [MatTableDemoComponent]
})
export class WorkspaceMatTableModule {}
