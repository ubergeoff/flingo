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
import { LibsComponentConfigurationModule } from '../../../../component-configuration/src';
import { MatTableConfigModule } from './components/mat-table-config-component/mat-table-config.module';
import { MatTableDemoService } from './services/mat-table-demo.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        RouterModule.forChild(MatTableRoutes),
        CommonModule,
        MatDialogModule,
        MatTableFilterModule,
        MatTableConfigModule,
        MatTableExpansionRowDemoModule,
        MatTableRowDemoModule,
        RooiMatTableModule,
        LibsComponentConfigurationModule,
        HttpClientModule
    ],
    declarations: [MatTableDemoComponent],
    providers: [MatTableDemoService]
})
export class WorkspaceMatTableModule {}
