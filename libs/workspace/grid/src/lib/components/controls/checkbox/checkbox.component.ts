import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'rooi-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
    constructor(private element: ElementRef) {}

    @Input() eventFunction;
    @Input() checked: boolean;

    ngOnInit(): void {}

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
