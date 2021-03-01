import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'rooi-new-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {
    constructor() {}

    @Input() eventFunction;

    ngOnInit(): void {}

    doAction() {
        this.eventFunction();
    }
}
