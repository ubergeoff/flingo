import { isPlatformServer } from '@angular/common';
import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    PLATFORM_ID,
    SimpleChanges
} from '@angular/core';
import { SlickItemDirective } from '../directives/slick-item.directive';
import { Slicker } from '../helpers/slicker';

/**
 * Slick component
 */
@Component({
    selector: 'roi-slick-carousel',
    exportAs: 'slick-carousel',
    template: '<ng-content></ng-content>'
})
export class SlickCarouselComponent implements OnDestroy, OnChanges, AfterViewInit, AfterViewChecked {
    @Input() config: any;
    @Output() afterChange: EventEmitter<{
        event: any;
        slick: any;
        currentSlide: number;
        first: boolean;
        last: boolean;
    }> = new EventEmitter();
    @Output() beforeChange: EventEmitter<{
        event: any;
        slick: any;
        currentSlide: number;
        nextSlide: number;
    }> = new EventEmitter();
    @Output() breakpoint: EventEmitter<{ event: any; slick: any; breakpoint: any }> = new EventEmitter();
    @Output() destroy: EventEmitter<{ event: any; slick: any }> = new EventEmitter();
    @Output() init: EventEmitter<{ event: any; slick: any }> = new EventEmitter();

    public slick: any;

    // access from parent component can be a problem with change detection timing. Please use afterChange output
    private currentIndex = 0;

    public slides: any[] = [];
    public initialized = false;
    private _removedSlides: SlickItemDirective[] = [];
    private _addedSlides: SlickItemDirective[] = [];

    /**
     * Constructor
     */
    constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: string) {}

    /**
     * On component destroy
     */
    ngOnDestroy() {
        this.unslick();
    }

    ngAfterViewInit(): void {
        this.ngAfterViewChecked();
    }

    /**
     * On component view checked
     */
    ngAfterViewChecked() {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        if (this._addedSlides.length > 0 || this._removedSlides.length > 0) {
            const nextSlidesLength = this.slides.length - this._removedSlides.length + this._addedSlides.length;
            if (!this.initialized) {
                if (nextSlidesLength > 0) {
                    this.initSlick();
                }
                // if nextSlidesLength is zere, do nothing
            } else if (nextSlidesLength === 0) {
                // unslick case
                this.unslick();
            } else {
                this._addedSlides.forEach((slickItem) => {
                    this.slides.push(slickItem);

                    this.slick.addSlide(slickItem.el.nativeElement);
                });
                this._addedSlides = [];

                this._removedSlides.forEach((slickItem) => {
                    const idx = this.slides.indexOf(slickItem);
                    this.slides = this.slides.filter((s) => s !== slickItem);

                    this.slick.removeSlide(idx);
                });
                this._removedSlides = [];
            }
        }
    }

    /**
     * init slick
     */
    initSlick() {
        this.slides = this._addedSlides;
        this._addedSlides = [];
        this._removedSlides = [];

        this.slick = new Slicker(this.el.nativeElement, this.config);
        this.initialized = true;

        this.slick.$slider.addEventListener('afterChange', (a, b, c) => {
            if (a) {
            }
        });

        this.slick.$slider.addEventListener('init', (a, b, c) => {
            if (a) {
            }
        });
    }

    addSlide(slickItem: SlickItemDirective) {
        this._addedSlides.push(slickItem);
    }

    removeSlide(slickItem: SlickItemDirective) {
        this._removedSlides.push(slickItem);
    }

    public unslick() {
        if (this.slick) {
            /*this.zone.runOutsideAngular(() => {*/
            this.slick.unslick();
            /*});*/
            this.slick = undefined;
        }
        this.initialized = false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.initialized) {
            const config = changes['config'];
            /*if (config.previousValue !== config.currentValue && config.currentValue !== undefined) {
                const refresh = config.currentValue['refresh'];
                const newOptions = Object.assign({}, config.currentValue);
                delete newOptions['refresh'];

                this.zone.runOutsideAngular(() => {
                    this.$instance.slick('slickSetOption', newOptions, refresh);
                });
            }*/
        }
    }
}
