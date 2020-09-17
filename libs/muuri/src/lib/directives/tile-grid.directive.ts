import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

declare var Muuri: any;

@Directive({
    selector: '[roiTileGrid]'
})
export class TileGridDirective implements OnInit, OnDestroy, AfterViewInit {
    layoutConfig = {
        items: '*',
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
    @Input() fillGaps = false;
    @Input() sortAction = 'swap';
    @Input() threshold = 40;
    @Input() dragHandle = '.tile-handle';

    private events: string[];
    private addItemChange = new Subject<ElementRef>();
    private subscription = new Subscription();
    private _isInit = false;

    constructor(private elRef: ElementRef) {
        this.events = [];
    }

    ngOnInit(): void {
        this.init(this.elRef.nativeElement);

        this.subscription.add(
            this.addItemChange.pipe(debounceTime(10)).subscribe(() => {
                if (this._isInit) {
                    this.grid.layout();
                }
            })
        );
    }

    ngAfterViewInit(): void {
        this.grid = new Muuri(this.elRef.nativeElement, this.layoutConfig);
        this._isInit = true;
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
    }

    addItem(item: ElementRef) {
        if (this._isInit) {
            this.grid.add(item.nativeElement, { layout: true });
        } else {
            this.addItemChange.next(item);
        }
    }

    removeItem(item: ElementRef) {
        let found = null;
        if (item.nativeElement.id) {
            found = this.grid.getItems().find((t) => t._element === item.nativeElement);
        }

        if (this._isInit && found) {
            this.grid.remove([found], { layout: true });
        }
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
    }

    ngOnDestroy(): void {
        this.destroyEvents();
        this.destroyLayout();
        this.subscription.unsubscribe();
    }
}
