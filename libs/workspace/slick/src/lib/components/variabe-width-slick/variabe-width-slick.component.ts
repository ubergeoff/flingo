import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { CardService } from '@rooi/workspace/shared';
import { SlickerConfig } from '@rooi/slicker';

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

    slideConfig: SlickerConfig = {
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        dots: true,
        infinite: true
    };

    constructor(private platform: Platform, private cardService: CardService) {
        this.allCards$ = this.cards.asObservable();
    }

    isMobile() {
        return this.platform.ANDROID || this.platform.IOS;
    }

    ngOnInit(): void {
        this.cardService.createCard('Card 1', null, 250);
        this.cardService.createCard('Card 2', null, 360);
        this.cardService.createCard('Card 3', null, 230);
        this.cardService.createCard('Card 4', null, 450);
        this.cardService.createCard('Card 5', null, 250);
        this.cardService.createCard('Card 6', null, 500);

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

    generateRandomFloatInRange(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}
