import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'rooi-fixed-width-slick',
    templateUrl: './fixed-width.component.html',
    styleUrls: ['./fixed-width.component.scss']
})
export class FixedWidthComponent implements OnInit {
    allCards$: Observable<any>;

    @ViewChild('container') container: ElementRef;

    private counter = 1;
    array = [];
    private cards = new BehaviorSubject<any>([]);
    width: any;

    slideConfig = {
        slidesToScroll: 1,
        variableWidth: false,
        slideWidth: 280,
        dots: true,
        infinite: false
    };

    constructor(private platform: Platform) {
        this.allCards$ = this.cards.asObservable();
    }

    isMobile() {
        return this.platform.ANDROID || this.platform.IOS;
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
