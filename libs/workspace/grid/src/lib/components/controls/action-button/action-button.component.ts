import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'rooi-new-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {
    constructor(private element: ElementRef) {}

    @Input() eventFunction;

    get nativeElement() {
        return this.element.nativeElement;
    }

    doAction() {
        this.eventFunction();
    }
}
