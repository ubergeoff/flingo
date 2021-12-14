import { NgModule } from '@angular/core';
import { MatTableFilterComponent } from './mat-table-filter.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, MatCheckboxModule, FormsModule],
    declarations: [MatTableFilterComponent]
})
export class MatTableFilterModule {}
