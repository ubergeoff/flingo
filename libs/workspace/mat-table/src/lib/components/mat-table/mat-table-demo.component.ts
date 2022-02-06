import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { TableConfiguration } from '@rooi/mat-table';
import { MatTableSortDirection } from '@rooi/mat-table';
import { DatePipe } from '@angular/common';
import { MatTableRowDemoComponent } from '../mat-table-row/mat-table-row-demo.component';
import { MatTableExpansionRowDemoComponent } from '../mat-table-expantion-row/mat-table-expansion-row-demo.component';
import { MatTableFilterComponent } from '../filter-component/mat-table-filter.component';
import { MatTableConfigComponent } from '../mat-table-config-component/mat-table-config.component';
import { MatTableDemoService } from '../../services/mat-table-demo.service';

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
    selector: 'rooi-mat-table-demo',
    templateUrl: './mat-table-demo.component.html',
    styleUrls: ['./mat-table-demo.component.scss']
})
export class MatTableDemoComponent implements OnInit {
    data$: Observable<any[]>;
    enableExpandedRowComponent$: Observable<boolean>;

    config: TableConfiguration;
    componentConfig: any;

    expandedRowComponent: any;
    rowComponent: any;
    filterComponent: any;
    configComponent: any;

    htmlCode: string;
    tsCode: string;

    private subscriptions = new Subscription();

    constructor(private matTableDemoService: MatTableDemoService) {
        this.rowComponent = MatTableRowDemoComponent;
        // this.expandedRowComponent = MatTableExpansionRowDemoComponent;
        this.filterComponent = MatTableFilterComponent;
        this.configComponent = MatTableConfigComponent;

        this.enableExpandedRowComponent$ = this.matTableDemoService.enableExpandedRowComponent$;
    }

    ngOnInit(): void {
        this.data$ = of(this.getTableData());
        this.config = this.setupTableConfig();
        this.componentConfig = this.setupComponentConfig();
        this.setupSubscriptions();

        this.tsCode = this.matTableDemoService.getCodeString();
        this.htmlCode = this.matTableDemoService.getHtmlString();
    }

    private setupSubscriptions(): void {
        this.subscriptions.add(
            this.enableExpandedRowComponent$.subscribe((value) => {
                this.expandedRowComponent = value ? MatTableExpansionRowDemoComponent : undefined;
            })
        );
    }

    private getTableData(): any[] {
        const temp = [];
        let newArr;

        for (let i = 0; i < 20; i++) {
            newArr = JSON.parse(JSON.stringify(allRequests));
            temp.push(...newArr);
        }

        return temp;
    }

    private setupComponentConfig(): any {
        return {
            enableSearch: true,
            enableDownload: true,
            enableEmail: true,
            enablePrint: true,
            enablePagination: true,
            enableSkipToPage: true,
            showFirstLastButtons: true,
            pageSizeOption: 'Small',
            enableRowExpansion: true
        };
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

    print(): void {
        window.alert('You clicked the print action button!');
    }

    email(): void {
        window.alert('You clicked the print email button!');
    }

    download(): void {
        window.alert('You clicked the print download button!');
    }

    getPageSizeArray(option: string): number[] {
        switch (option) {
            case 'Small':
                return [5, 10, 20];
            case 'Medium':
                return [10, 20, 30];
            case 'Large':
                return [50, 100, 200];
        }
    }
}
