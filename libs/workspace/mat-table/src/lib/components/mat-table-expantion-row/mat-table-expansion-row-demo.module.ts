import { NgModule } from '@angular/core';
import { MatTableExpansionRowDemoComponent } from './mat-table-expansion-row-demo.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [MatTableExpansionRowDemoComponent]
})
export class MatTableExpansionRowDemoModule {}
