import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'rooi-tick-button',
    templateUrl: './tick-button.component.html',
    styleUrls: ['./tick-button.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class TickButtonComponent implements OnChanges {
    @ViewChild('button') button: ElementRef;
    @Input() loading = false;
    @Input() finished = false;

    disabled = false;

    ngOnChanges(changes: SimpleChanges): void {
        const loading = changes['loading']?.currentValue;
        const finished = changes['finished']?.currentValue;

        if (loading) {
            this.disabled = true;
            this.button.nativeElement.classList.toggle('active');
        }

        if (finished) {
            this.button.nativeElement.classList.toggle('finished');
        }
    }
}
