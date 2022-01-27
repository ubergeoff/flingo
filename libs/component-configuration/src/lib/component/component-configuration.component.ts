import { Component, Input } from '@angular/core';

@Component({
    selector: 'rooi-component-config',
    templateUrl: './component-configuration.component.html',
    styleUrls: ['./component-configuration.component.scss']
})
export class ComponentConfigurationComponent {
    @Input() title: string | undefined;
    @Input() configComponent: any;
    @Input() componentConfiguration: any;
    @Input() htmlCode: string | undefined;
    @Input() tsCode: string | undefined;
    @Input() cssCode: string | undefined;

    showCode = false;
}
