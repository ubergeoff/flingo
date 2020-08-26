import { Directive, ElementRef, Host, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SlickCarouselComponent } from '../components/slick.component';

@Directive({
    selector: '[roiSlickItem]'
})
export class SlickItemDirective implements OnInit, OnDestroy {
    constructor(
        public el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: string,
        @Host() private carousel: SlickCarouselComponent
    ) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.carousel.addSlide(this);
        }
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            this.carousel.removeSlide(this);
        }
    }
}
