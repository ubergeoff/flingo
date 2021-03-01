import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/components/grid.component';

@NgModule({
    imports: [CommonModule],
    declarations: [GridComponent],
    exports: [GridComponent]
})
export class GridModule {}
