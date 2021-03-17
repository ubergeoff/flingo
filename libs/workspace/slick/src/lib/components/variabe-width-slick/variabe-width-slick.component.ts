import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { CardService } from '@rooi/workspace/shared';

@Component({
    selector: 'rooi-variable-width-slick',
    templateUrl: './variabe-width-slick.component.html',
    styleUrls: ['./variabe-width-slick.component.scss'],
    providers: [CardService]
})
export class VariableWidthSlickComponent implements OnInit {
    allCards$: Observable<any>;

    @ViewChild('container') container: ElementRef;

    private counter = 1;
    array = [];
    private cards = new BehaviorSubject<any>([]);
    width: any;

    slideConfig = {
        slidesToScroll: 1,
        variableWidth: true,
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        dots: true,
        infinite: false
    };

    constructor(private platform: Platform, private cardService: CardService) {
        this.allCards$ = this.cards.asObservable();
    }

    isMobile() {
        return this.platform.ANDROID || this.platform.IOS;
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

    createCard(title) {
        this.cardService.createCard(title);
    }

    remove(card: any) {
        this.cardService.remove(card);

        this.cards.next(this.cardService.allCards());
    }

    addCard() {
        this.createCard('Card ' + this.counter++);
    }
}
