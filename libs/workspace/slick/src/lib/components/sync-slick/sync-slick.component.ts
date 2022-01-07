import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { CardService } from '@rooi/workspace/shared';
import { SlickerConfig } from '@rooi/slicker';
import { SlickCarouselComponent } from '@rooi/slick';

@Component({
    selector: 'rooi-rows-slick',
    templateUrl: './sync-slick.component.html',
    styleUrls: ['./sync-slick.component.scss'],
    providers: [CardService]
})
export class SyncSlickComponent implements OnInit, AfterViewInit {
    allCards$: Observable<any>;

    @ViewChild('container') container: ElementRef;

    @ViewChild(SlickCarouselComponent) ForSlicker;
    @ViewChild(SlickCarouselComponent) NavSlicker;

    private counter = 1;
    array = [];
    private cards = new BehaviorSubject<any>([]);
    width: any;

    slideConfig1: SlickerConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: null
    };

    slideConfig2: SlickerConfig = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: null,
        dots: true,
        centerMode: true,
        focusOnSelect: true
    };

    constructor(private platform: Platform, private cardService: CardService) {
        this.allCards$ = this.cards.asObservable();
    }

    ngAfterViewInit(): void {
        //console.log('asNAV:', this.NavSlicker.slick);
        //console.log('ForNAV:', this.ForSlicker.slick);
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
