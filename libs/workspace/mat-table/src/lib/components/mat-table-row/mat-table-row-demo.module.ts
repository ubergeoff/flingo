import { NgModule } from '@angular/core';
import { MatTableRowDemoComponent } from './mat-table-row-demo.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [MatTableRowDemoComponent]
})
export class MatTableRowDemoModule {}
