import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TileGridDirective } from '@rooi/muuri';
import { CardService } from '../../../../../../../apps/flingo/src/app/services/card-service/card.service';
import { ICard } from '../../../../../../../apps/flingo/src/app/interfaces/card.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CardService]
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(TileGridDirective) grid: TileGridDirective;

    allCards$: Observable<ICard[]>;

    private counter = 1;

    private cards = new BehaviorSubject<ICard[]>([]);
    private moveData: { start: any; end: any };
    message = new BehaviorSubject<string>('');

    constructor(private cardService: CardService) {
        this.allCards$ = this.cards.asObservable();
    }

    ngOnInit(): void {
        this.cardService.createCard('Card 1');
        this.cardService.createCard('Card 2');
        this.cardService.createCard('Card 3');
        this.cardService.createCard('Card 4');
        this.cardService.createCard('Card 5');
        this.cardService.createCard('Card 6');

        this.counter = this.cardService.allCards().length + 1;

        this.cards.next(this.cardService.allCards());
    }

    remove(card: any) {
        this.cardService.remove(card);
        this.cards.next(this.cardService.allCards());
    }

    addCard() {
        this.cardService.createCard('Card ' + this.counter++);
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
            const cardElement = item._element as HTMLElement;
            const found = this.cardService.findCard(cardElement.id);

            this.message.next('You just moved: ' + found.title + ' to Pos: ' + this.moveData.end);
        }
    }
}
