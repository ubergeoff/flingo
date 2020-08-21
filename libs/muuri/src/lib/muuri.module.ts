import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AweTileGridDirective } from './directives/tile-grid.directive';
import { AweTileGridItemDirective } from './directives/tile-grid-item.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [AweTileGridDirective, AweTileGridItemDirective],
    exports: [AweTileGridDirective, AweTileGridItemDirective]
})
export class MuuriModule {}
