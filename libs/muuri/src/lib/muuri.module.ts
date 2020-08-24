import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgoTileGridDirective } from './directives/tile-grid.directive';
import { NgoTileGridItemDirective } from './directives/tile-grid-item.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [NgoTileGridDirective, NgoTileGridItemDirective],
    exports: [NgoTileGridDirective, NgoTileGridItemDirective]
})
export class MuuriModule {}
