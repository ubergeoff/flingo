import { Component, ElementRef, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'rooi-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
    constructor(private element: ElementRef) {}

    @Input() eventFunction;
    @Input() checked: boolean;

    get nativeElement() {
        return this.element.nativeElement;
    }

    doAction() {
        this.eventFunction();
    }

    changed($event: MatCheckboxChange) {
        this.eventFunction();
    }
}
