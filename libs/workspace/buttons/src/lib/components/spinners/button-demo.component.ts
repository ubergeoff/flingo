import { Component } from '@angular/core';

@Component({
    selector: 'rooi-buttons-demo',
    templateUrl: './button-demo.component.html',
    styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent {
    isLoadingOne = false;
    successOne = false;
    isLoadingTwo = false;
    successTwo = false;

    submit() {
        this.isLoadingOne = true;

        setTimeout(() => {
            this.successOne = true;
        }, 2000);
    }
}
