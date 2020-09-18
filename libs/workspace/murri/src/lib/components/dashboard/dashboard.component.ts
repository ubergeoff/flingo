import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMoveData, TileGridDirective } from '@rooi/muuri';
import { CardService, ICard } from '@rooi/workspace/shared';

@Component({
    selector: 'rooi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CardService]
})
export class DashboardComponent implements OnInit {
    @ViewChild(TileGridDirective) grid: TileGridDirective;

    allCards$: Observable<ICard[]>;

    private counter = 1;
    private cards = new BehaviorSubject<ICard[]>([]);

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

    dragEnded(event: IMoveData) {
        if (event.item._element) {
            const cardElement = event.item._element as HTMLElement;
            const found = this.cardService.findCard(cardElement.id);

            this.message.next('You just moved: ' + found.title + ' to Pos: ' + event.positions.toIndex);
        }
    }
}
