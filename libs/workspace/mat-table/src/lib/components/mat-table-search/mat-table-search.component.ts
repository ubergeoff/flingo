import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableConfiguration } from '../../../../../../mat-table/src/lib/models/mat-table.model';
import { MatTableSortDirection } from '../../../../../../mat-table/src/lib/enums/mat-table.enum';
import { DatePipe } from '@angular/common';
import { MatTableRowDemoComponent } from '../mat-table-row/mat-table-row-demo.component';
import { MatTableExpansionRowDemoComponent } from '../mat-table-expantion-row/mat-table-expansion-row-demo.component';
import { MatTableFilterComponent } from '../filter-component/mat-table-filter.component';

const allRequests = [
    {
        requestCreated: '2015-12-11T12:56:44.706+0000',
        requestInfo: 'Group User Account Registration',
        requestInputter: 'Gerrit Burger',
        referenceNumber: 147817,
        requestStatus: 'CREATED',
        userEmail: 'gerrit.burger77@gmail.com'
    },
    {
        requestCreated: '2015-12-11T12:56:44.706+0000',
        requestInfo: 'Customer Password Activation',
        requestInputter: 'Geoffrey Le Roux',
        referenceNumber: 147818,
        requestStatus: 'APPROVED',
        userEmail: 'geoff@gmail.com'
    },
    {
        requestCreated: '2015-12-18T11:42:12.482+0000',
        requestInfo: 'Single User Account Registration',
        requestInputter: 'John Smith',
        referenceNumber: 148359,
        requestStatus: 'REQUESTED',
        userEmail: 'johnsmith@gmail.com'
    }
];

@Component({
    selector: 'rooi-mat-table-demo',
    templateUrl: './mat-table-search.component.html',
    styleUrls: ['./mat-table-search.component.scss']
})
export class MatTableSearchComponent implements OnInit {
    data$: Observable<any[]>;
    config: TableConfiguration;

    codeString = `
<rooi-mat-table
    [tableData$]="data$"
    [tableConfig]="config"
    [enableSearch]="true">
</rooi-mat-table>
    `;

    configString: string;
    checked: boolean = true;

    constructor() {}

    ngOnInit(): void {
        this.data$ = of(allRequests);
        this.config = this.setupTableConfig();
        this.configString = JSON.stringify(this.config, null, 4);
    }

    private setupTableConfig(): TableConfiguration {
        return {
            columnConfig: [
                {
                    columnKey: 'referenceNumber',
                    columnHeader: 'Req Number',
                    columnClass: 'request-number'
                },
                {
                    columnKey: 'requestInputter',
                    columnHeader: 'Created By',
                    columnClass: 'request-created-by'
                },
                {
                    columnKey: 'userEmail',
                    columnHeader: 'User Email',
                    columnClass: 'request-user-email'
                },
                {
                    columnKey: 'requestStatus',
                    columnHeader: 'Approval Status',
                    columnClass: 'request-status'
                },
                {
                    columnKey: 'requestInfo',
                    columnHeader: 'Description',
                    columnClass: 'request-info'
                },
                {
                    columnKey: 'requestCreated',
                    columnHeader: 'Created On',
                    columnClass: 'request-created-on',
                    pipe: {
                        pipe: new DatePipe('en-US'),
                        pipeFormat: 'yyyy-MM-dd HH:mm'
                    }
                }
            ],
            headers: {
                displayedColumns: [
                    'referenceNumber',
                    'requestInputter',
                    'userEmail',
                    'requestStatus',
                    'requestInfo',
                    'requestCreated'
                ]
            }
        };
    }
}
