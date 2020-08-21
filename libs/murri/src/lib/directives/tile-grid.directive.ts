import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

declare var Muuri: any;

@Directive({
    selector: '[aweTileGrid]'
})
export class AweTileGridDirective implements OnInit, OnDestroy {
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
    @Input() sortAction = 'swap';
    @Input() dragHandle = '.tile-handle';

    private events: string[];
    private items: ElementRef[];
    private addItemChange = new Subject<ElementRef>();
    private removeItemChange = new Subject<ElementRef>();
    private subscription = new Subscription();

    constructor(private elRef: ElementRef) {
        this.events = [];
        this.items = [];
    }

    ngOnInit(): void {
        this.init(this.elRef.nativeElement);

        this.subscription.add(
            this.addItemChange
                .pipe(
                    filter((item) => !!item),
                    tap((item) => this.items.push(item)),
                    debounceTime(15),
                    filter((t) => this.items.length > 0)
                )
                .subscribe(() => {
                    this.finalizeLayoutItems(this.items);
                    this.refresh();
                })
        );

        this.subscription.add(
            this.removeItemChange
                .pipe(
                    filter((item) => !!item),
                    tap((item) => {
                        const index = this.items.indexOf(item);
                        if (index > -1) {
                            this.items.splice(index, 1);
                        }
                    }),
                    debounceTime(15),
                    filter((t) => this.items.length > 0)
                )
                .subscribe(() => {
                    this.finalizeLayoutItems(this.items);
                    this.refresh();
                })
        );
    }

    init(element: ElementRef) {
        this.layoutConfig.layout.fillGaps = this.fillGaps;
        this.layoutConfig.dragEnabled = this.dragEnabled;
        if (this.dragEnabled) {
            this.layoutConfig.dragSortPredicate.action = this.sortAction;
            this.layoutConfig.dragStartPredicate.handle = this.dragHandle;
        }

        this.grid = new Muuri(element, this.layoutConfig);
    }

    private finalizeLayoutItems(items: ElementRef[]) {
        const existingItems = this.grid.getItems();

        if (existingItems && existingItems.length > 0) {
            this.grid.remove(existingItems, { layout: false });
        }

        this.grid.add(items, { layout: false });
        return true;
    }

    addItem(item: ElementRef) {
        this.addItemChange.next(item);
    }

    removeItem(nativeElement: ElementRef) {
        this.removeItemChange.next(nativeElement);
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
