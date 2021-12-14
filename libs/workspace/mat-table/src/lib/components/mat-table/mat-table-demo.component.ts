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
        linkedReferenceNumber: '50463280',
        requestInfo: 'Customer Password Activation',
        requestInputter: '50463280',
        referenceNumber: 147817,
        requestStatus: 'CREATED',
        requestType: 'activatePassword',
        requestAuthoriser: '',
        requestUpdated: null
    },
    {
        requestCreated: '2015-12-11T12:56:44.706+0000',
        linkedReferenceNumber: '50463280',
        requestInfo: 'Customer Password Activation',
        requestInputter: '50463280',
        referenceNumber: 147818,
        requestStatus: 'CREATED',
        requestType: 'activatePassword',
        requestAuthoriser: '',
        requestUpdated: null
    },
    {
        requestCreated: '2015-12-18T11:42:12.482+0000',
        linkedReferenceNumber: 'New',
        requestInfo: 'Group Registration',
        requestInputter: 'firthn',
        referenceNumber: 148359,
        requestStatus: 'REQUESTED',
        requestType: 'createGroup',
        requestAuthoriser: '',
        requestUpdated: null
    },
    {
        requestCreated: '2015-12-18T11:42:12.482+0000',
        linkedReferenceNumber: 'New',
        requestInfo: 'Group Registration',
        requestInputter: 'firthn',
        referenceNumber: 148339,
        requestStatus: 'CREATED',
        requestType: 'createGroup',
        requestAuthoriser: '',
        requestUpdated: null
    },
    {
        requestCreated: '2015-12-18T11:42:12.482+0000',
        linkedReferenceNumber: 'Test',
        requestInfo: 'Group Registration',
        requestInputter: 'firthn',
        referenceNumber: 142359,
        requestStatus: 'REQUESTED',
        requestType: 'createGroup',
        requestAuthoriser: '',
        requestUpdated: null
    }
];

@Component({
    selector: 'rooi-grid-demo',
    templateUrl: './mat-table-demo.component.html',
    styleUrls: ['./mat-table-demo.component.scss']
})
export class MatTableDemoComponent implements OnInit {
    data$: Observable<any[]>;
    config: TableConfiguration;

    expandedRowComponent: any;
    rowComponent: any;
    filterComponent: any;

    constructor() {
        this.rowComponent = MatTableRowDemoComponent;
        this.expandedRowComponent = MatTableExpansionRowDemoComponent;
        this.filterComponent = MatTableFilterComponent;
    }

    ngOnInit(): void {
        this.data$ = of(allRequests);
        this.config = this.setupTableConfig();
    }

    private setupTableConfig(): TableConfiguration {
        return {
            columnConfig: [
                {
                    columnKey: 'referenceNumber',
                    columnHeader: 'Req Number',
                    columnClass: 'request-number',
                    sortDirection: MatTableSortDirection.desc,
                    cellAction: (cellContent) => {
                        this.performCellAction(cellContent);
                    }
                },
                {
                    columnKey: 'requestType',
                    columnHeader: 'Type',
                    columnClass: 'request-type'
                },
                {
                    columnKey: 'requestStatus',
                    columnHeader: 'Status',
                    columnClass: 'request-status'
                },
                {
                    columnKey: 'requestInfo',
                    columnHeader: 'Info',
                    columnClass: 'request-info'
                },
                {
                    columnKey: 'requestInputter',
                    columnHeader: 'Created By',
                    columnClass: 'request-created-by'
                },
                {
                    columnKey: 'requestCreated',
                    columnHeader: 'Created On',
                    columnClass: 'request-created-on',
                    pipe: {
                        pipe: new DatePipe('en-US'),
                        pipeFormat: 'yyyy-MM-dd HH:mm'
                    }
                },
                {
                    columnKey: 'linkedReferenceNumber',
                    columnHeader: 'External Ref',
                    columnClass: 'request-external-ref'
                }
            ],
            headers: {
                displayedColumns: [
                    'referenceNumber',
                    'requestType',
                    'requestStatus',
                    'requestInfo',
                    'requestInputter',
                    'requestCreated',
                    'linkedReferenceNumber'
                ]
            }
        };
    }

    private performCellAction(cellContent: string): void {
        alert(`You clicked on the cell with value ${cellContent}`);
    }
}
