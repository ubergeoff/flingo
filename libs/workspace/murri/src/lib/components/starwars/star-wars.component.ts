import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMoveData, TileGridDirective } from '@rooi/muuri';
import { CardService, ICard, ProgressService } from '@rooi/workspace/shared';
import { delay, tap } from 'rxjs/operators';

@Component({
    selector: 'rooi-star-wars',
    templateUrl: './star-wars.component.html',
    styleUrls: ['./star-wars.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CardService]
})
export class StarWarsComponent implements OnInit {
    @ViewChild(TileGridDirective) grid: TileGridDirective;

    allCards$: Observable<ICard[]>;

    private counter = 1;

    private cards = new BehaviorSubject<ICard[]>([]);
    message = new BehaviorSubject<string>('');

    constructor(private cardService: CardService, private progress: ProgressService) {
        this.progress.isLoading(true);
        this.allCards$ = this.cards.pipe(
            delay(1000),
            tap(() => {
                this.progress.isLoading(false);
            })
        );
    }

    ngOnInit(): void {
        this.cardService.createCard('Card 1', 'assets/images/starwars/episodeI.jpg');
        this.cardService.createCard('Card 2', 'assets/images/starwars/episodeII.jpg');
        this.cardService.createCard('Card 3', 'assets/images/starwars/episodeIII.jpg');
        this.cardService.createCard('Card 4', 'assets/images/starwars/episodeIV.jpg');
        this.cardService.createCard('Card 5', 'assets/images/starwars/episodeVI.jpg');
        this.cardService.createCard('Card 6', 'assets/images/starwars/empire-strikes-back-poster-big.jpg');

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

    dragEnd(info: IMoveData) {
        if (info.item._element) {
            const cardElement = info.item._element as HTMLElement;
            const found = this.cardService.findCard(cardElement.id);

            this.message.next('Force pushed: ' + found.title + ' to Pos: ' + info.positions.toIndex);
        }
    }
}
