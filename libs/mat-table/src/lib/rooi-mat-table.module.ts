import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from './components/table/mat-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRowDirective } from './directives/mat-table-row.directive';
import { MatTableService } from './services/mat-table.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableFilterDirective } from './directives/mat-table-filter.directive';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule
    ],
    declarations: [MatTableComponent, MatTableRowDirective, MatTableFilterDirective],
    exports: [MatTableComponent],
    providers: [MatTableService]
})
export class RooiMatTableModule {}
