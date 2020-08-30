import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TileGridDirective } from '@rooi/muuri';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(TileGridDirective) grid: TileGridDirective;

    allCards$: Observable<ICard[]>;

    private counter = 1;
    private array: ICard[] = [];
    private cards = new BehaviorSubject<ICard[]>([]);
    private moveData: { start: any; end: any };
    message = new BehaviorSubject<string>('');

    constructor() {
        this.allCards$ = this.cards.asObservable();
    }

    ngOnInit(): void {
        this.createCard('Card 1');
        this.createCard('Card 2');
        this.createCard('Card 3');
        this.createCard('Card 4');
        this.createCard('Card 5');
        this.createCard('Card 6');

        this.counter = this.array.length + 1;

        this.cards.next(this.array);
    }

    createCard(title) {
        this.array.push({
            id: uuid(),
            title: title
        });
    }

    remove(card: any) {
        const index = this.array.indexOf(card);
        if (index > -1) {
            this.array.splice(index, 1);
        }

        this.cards.next(this.array);
    }

    addCard() {
        this.createCard('Card ' + this.counter++);
    }

    trackByCardId(index, item: ICard) {
        return item.id;
    }

    ngAfterViewInit(): void {
        if (this.grid && this.grid.dragEnabled) {
            this.grid.on('dragStart', (item, event) => {});

            this.grid.on('dragEnd', (item, event) => {
                this.updateTileOrder(item);
            });

            this.grid.on('move', (data) => {
                this.moveData = { start: data.fromIndex + 1, end: data.toIndex + 1 };
            });
        }
    }

    updateTileOrder(item) {
        if (item._element && this.moveData) {
            const cardElement = item._element;
            const found = this.array.find((t) => t.id === cardElement.id);

            this.message.next('You just moved: ' + found.title + ' to Pos: ' + this.moveData.end);
        }
    }
}

export interface ICard {
    id: string;
    title: string;
}
