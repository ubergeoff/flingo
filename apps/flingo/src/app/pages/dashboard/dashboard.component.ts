import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AweTileGridDirective } from '@flingo/murri';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
    @ViewChild(AweTileGridDirective) grid: AweTileGridDirective;
    counter = 1;
    array = [];
    cards = new BehaviorSubject<any>([]);

    constructor() {}

    createCard(title) {
        this.array.push({
            id: uuid(),
            title: title
        });
    }

    ngOnInit(): void {
        this.createCard('Card 1');
        this.createCard('Card 2');
        this.createCard('Card 3');
        this.createCard('Card 4');

        this.counter = this.array.length + 1;

        this.cards.next(this.array);
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
