import { Component, HostBinding, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

interface CheckBox {
    text: string;
    checked: boolean;
}

@Component({
    selector: 'roi-request-result-table-row',
    templateUrl: 'mat-table-filter.component.html',
    styleUrls: ['mat-table-filter.component.scss']
})
export class MatTableFilterComponent implements OnInit {
    @HostBinding('class') matTableInnerRowClass = 'mat-table-inner-row';
    @Output() filteredData = new EventEmitter();
    tableDataInput: Observable<any>;

    private tableData: any;

    checkBoxes: CheckBox[] = [
        {
            text: 'CREATED',
            checked: true
        },
        {
            text: 'REQUESTED',
            checked: true
        }
    ];

    ngOnInit() {
        this.tableDataInput.subscribe((data) => {
            this.tableData = data;
        });
    }

    filter(): void {
        const filteredTableDataItems = this.checkBoxes
            .filter((checkBox: CheckBox) => checkBox.checked)
            .reduce((acc, currentValue) => {
                return acc.concat(
                    this.tableData.filter((row) => {
                        return row.requestStatus === currentValue.text && currentValue.checked;
                    })
                );
            }, []);

        this.filteredData.emit(filteredTableDataItems);
    }
}
