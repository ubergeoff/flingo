import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-full-screen-slick',
    templateUrl: './full-screen-slick.component.html',
    styleUrls: ['./full-screen-slick.component.scss']
})
export class FullScreenSlickComponent implements OnInit {
    allCards$: Observable<any>;

    @ViewChild('container') container: ElementRef;

    private counter = 1;
    array = [];
    private cards = new BehaviorSubject<any>([]);
    width: any;

    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
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
