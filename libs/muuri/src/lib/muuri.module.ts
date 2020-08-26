import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileGridDirective } from './directives/tile-grid.directive';
import { TileGridItemDirective } from './directives/tile-grid-item.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TileGridDirective, TileGridItemDirective],
    exports: [TileGridDirective, TileGridItemDirective]
})
export class MuuriModule {}
