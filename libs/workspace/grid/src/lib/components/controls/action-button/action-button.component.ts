import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'rooi-new-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {
    constructor(private element: ElementRef) {}

    @Input() eventFunction;

    ngOnInit(): void {}

    get nativeElement() {
        return this.element.nativeElement;
    }

    doAction() {
        this.eventFunction();
    }
}
