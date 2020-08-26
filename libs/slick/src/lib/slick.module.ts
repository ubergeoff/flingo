import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselComponent } from './components/slick.component';
import { SlickItemDirective } from './directives/slick-item.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [SlickCarouselComponent, SlickItemDirective],
    exports: [SlickItemDirective, SlickCarouselComponent]
})
export class SlickModule {}
