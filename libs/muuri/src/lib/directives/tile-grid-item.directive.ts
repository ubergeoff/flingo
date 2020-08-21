import { Directive, ElementRef, Host, OnDestroy, OnInit } from '@angular/core';
import { AweTileGridDirective } from './tile-grid.directive';

@Directive({
    selector: '[aweTileGridItem]'
})
export class AweTileGridItemDirective implements OnInit, OnDestroy {
    constructor(@Host() private tileGrid: AweTileGridDirective, private elRef: ElementRef) {}

    ngOnInit(): void {
        this.tileGrid.addItem(this.elRef.nativeElement);
    }

    ngOnDestroy(): void {
        this.tileGrid.removeItem(this.elRef.nativeElement);
    }
}
