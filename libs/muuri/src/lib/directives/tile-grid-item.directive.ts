import { Directive, ElementRef, Host, OnDestroy, OnInit } from '@angular/core';
import { NgoTileGridDirective } from './tile-grid.directive';

@Directive({
    selector: '[roiTileGridItem]'
})
export class NgoTileGridItemDirective implements OnInit, OnDestroy {
    constructor(@Host() private tileGrid: NgoTileGridDirective, private elRef: ElementRef) {}

    ngOnInit(): void {
        this.tileGrid.addItem(this.elRef.nativeElement);
    }

    ngOnDestroy(): void {
        this.tileGrid.removeItem(this.elRef.nativeElement);
    }
}
