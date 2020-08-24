import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgoTileGridDirective } from '@flingo/muuri';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
    @ViewChild(NgoTileGridDirective) grid: NgoTileGridDirective;

    allCards$: Observable<any>;

    private counter = 1;
    private array = [];
    private cards = new BehaviorSubject<any>([]);

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
}
