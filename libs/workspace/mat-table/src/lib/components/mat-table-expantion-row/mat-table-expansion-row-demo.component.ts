import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'roi-request-result-table-row',
    templateUrl: 'mat-table-expansion-row-demo.component.html',
    styleUrls: ['mat-table-expansion-row-demo.component.scss']
})
export class MatTableExpansionRowDemoComponent {
    @HostBinding('class') matTableInnerRowClass = 'mat-table-inner-row';

    listItem: any;
}
