import { NgModule } from '@angular/core';
import { MatTableConfigComponent } from './mat-table-config.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [MatSlideToggleModule, FormsModule, MatSelectModule],
    declarations: [MatTableConfigComponent]
})
export class MatTableConfigModule {}
