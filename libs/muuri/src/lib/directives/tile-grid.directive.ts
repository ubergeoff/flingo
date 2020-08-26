import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

declare var Muuri: any;

@Directive({
    selector: '[roiTileGrid]'
})
export class NgoTileGridDirective implements OnInit, OnDestroy {
    layoutConfig = {
        items: [],
        layoutOnInit: false,
        dragEnabled: false,
        layout: {
            fillGaps: true,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: true
        },
        dragStartPredicate: {
            distance: 0,
            delay: 70,
            handle: ''
        },
        dragSortHeuristics: {
            sortInterval: 0,
            minDragDistance: 8,
            minBounceBackAngle: Math.PI / 2
        },
        dragSortPredicate: {
            threshold: 40,
            action: 'swap'
        }
    };
    grid: any;

    @Input() dragEnabled = true;
    @Input() fillGaps = true;
    @Input() threshold = 40;
    @Input() sortAction = 'swap';
    @Input() dragHandle = '.tile-handle';

    private events: string[];
    private subscription = new Subscription();

    constructor(private elRef: ElementRef) {
        this.events = [];
    }

    ngOnInit(): void {
        this.init(this.elRef.nativeElement);
    }

    init(element: ElementRef) {
        this.layoutConfig.layout.fillGaps = this.fillGaps;
        this.layoutConfig.dragEnabled = this.dragEnabled;
        if (this.dragEnabled) {
            this.layoutConfig.dragSortPredicate = {
                ...this.layoutConfig.dragSortPredicate,
                threshold: this.threshold,
                action: this.sortAction
            };

            this.layoutConfig.dragStartPredicate = {
                ...this.layoutConfig.dragStartPredicate,
                handle: this.dragHandle
            };
        }

        this.grid = new Muuri(element, this.layoutConfig);
    }

    addItem(item: ElementRef) {
        this.grid.add(item, { layout: true });
    }

    removeItem(item: ElementRef) {
        this.grid.remove(item, { layout: true });
    }

    on(eventName: string, action: any) {
        if (this.events.find((x) => x === eventName)) {
            return;
        }

        this.grid.on(eventName, function (item, event) {
            action(item, event);
        });
        this.events.push(eventName);
    }

    destroyEvents() {
        if (this.events && this.events.length > 0) {
            this.events.forEach((eventName) => {
                this.grid.off(eventName);
            });
        }
        this.events = [];
    }

    destroyLayout() {
        if (this.grid) {
            this.grid.destroy(true);
        }
        this.grid = null;
    }

    refresh() {
        this.grid.refreshItems();
        this.grid.layout();
    }

    ngOnDestroy(): void {
        this.destroyEvents();
        this.destroyLayout();
        this.subscription.unsubscribe();
    }
}
