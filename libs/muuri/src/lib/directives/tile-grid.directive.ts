import {
    AfterViewChecked,
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IMoveData } from '../../lib/interfaces/move-data.interface';

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

    @Output() dragEnd = new EventEmitter<IMoveData>();

    private events: string[];
    private addItemChange = new Subject<ElementRef>();
    private subscription = new Subscription();
    private _isInit = false;
    private moveData = { fromIndex: 0, toIndex: 0 };

    constructor(private elRef: ElementRef) {
        this.events = [];
    }

    ngOnInit(): void {
        this.init();

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

        if (this.dragEnabled) {
            this.grid.on('dragEnd', (item, event) => {
                this.dragEnd.emit({ item, event, positions: this.moveData });
            });
            this.events.push('dragEnd');

            this.grid.on('move', (data) => {
                this.moveData = { fromIndex: data.fromIndex + 1, toIndex: data.toIndex + 1 };
            });
            this.events.push('move');
        }
    }

    init() {
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
        const found = this.grid.getItem(item.nativeElement);

        if (this._isInit && found) {
            this.grid.remove([found], { layout: true });
        }
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
