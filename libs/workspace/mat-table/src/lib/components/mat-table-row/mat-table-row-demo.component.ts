import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'rooi-mat-table-row',
    templateUrl: 'mat-table-row-demo.component.html',
    styleUrls: ['mat-table-row-demo.component.scss']
})
export class MatTableRowDemoComponent {
    @HostBinding('class') matTableInnerRowClass = 'mat-table-inner-row';

    listItem: any;
}
