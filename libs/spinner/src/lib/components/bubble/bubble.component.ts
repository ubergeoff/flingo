import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'rooi-bubble-spinner',
    template: `<div class="preloader" *ngIf="isVisible">
        <div class="spinner" [style]="style">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>`,
    styleUrls: ['bubble.component.scss']
})
export class BubbleSpinnerComponent implements OnInit {
    @Input() isVisible = true;
    @Input() backgroundColor = 'rgba(0, 115, 170, 0.69)';

    @Input() width = 40;
    @Input() height = 40;

    style = {
        width: this.width + 'px',
        height: this.height + 'px'
    };

    constructor() {}

    ngOnInit(): void {
        if (this.width) {
            this.style.width = this.width + 'px';
        }

        if (this.height) {
            this.style.height = this.height + 'px';
        }
    }
}
