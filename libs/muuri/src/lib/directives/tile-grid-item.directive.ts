import { Directive, ElementRef, Host, OnDestroy, OnInit } from '@angular/core';
import { TileGridDirective } from './tile-grid.directive';

@Directive({
    selector: '[roiTileGridItem]'
})
export class TileGridItemDirective implements OnInit, OnDestroy {
    constructor(@Host() private tileGrid: TileGridDirective, private elRef: ElementRef) {}

    ngOnInit(): void {
        this.tileGrid.addItem(this.elRef.nativeElement);
    }

    ngOnDestroy(): void {
        this.tileGrid.removeItem(this.elRef.nativeElement);
    }
}
