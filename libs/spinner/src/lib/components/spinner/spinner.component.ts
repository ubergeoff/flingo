import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'rooi-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class SpinnerComponent implements OnInit {
    canStartSpinning1 = false;
    canStartSpinning2 = false;
    canShow = true;
    colour: ThemePalette = 'primary';
    private counterHandle;

    constructor() {}

    ngOnInit(): void {
        let count = 0;
        this.counterHandle = setInterval(() => {
            count++;
            this.showSpinner(count);
        }, 100);
    }

    private showSpinner(count: number) {
        switch (count) {
            case 1:
                this.canStartSpinning1 = true;
                break;

            case 2:
                this.canStartSpinning2 = true;
                break;

            default:
                clearInterval(this.counterHandle);
        }
    }
}
