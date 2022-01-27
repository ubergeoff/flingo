import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { combineLatest, isObservable, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColumnConfiguration, TableConfiguration } from '../../models/mat-table.model';
import { MatTableService } from '../../services/mat-table.service';
import { MatTableSortDirection } from '../../enums/mat-table.enum';
import { expandRowAnimation, rotateIcon } from '../../animations/mat-table.animations';

@Component({
    selector: 'rooi-mat-table',
    templateUrl: 'mat-table.component.html',
    styleUrls: ['mat-table.component.scss'],
    animations: [expandRowAnimation, rotateIcon]
})
export class MatTableComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    @Output() download = new EventEmitter<any>();
    @Output() print = new EventEmitter<any>();
    @Output() email = new EventEmitter<any>();

    @Input() rowComponent?: any;
    @Input() expandedRowComponent?: any;
    @Input() footerComponent?: any;
    @Input() filterComponent?: any;

    @Input() tableData$: any;
    @Input() tableConfig: TableConfiguration;
    @Input() height?: number;

    @Input() enableSearch?: boolean;
    @Input() placeHolderText = 'Search';

    @Input() loading?: boolean;

    @Input() stickyHeader?: boolean;
    @Input() stickyFooter?: boolean;

    @Input() showPagination?: boolean;
    @Input() showSkipToPage?: boolean;
    @Input() pageSizeOptions = [5, 10, 20];
    @Input() pageSize;
    @Input() showFirstLastButtons?: boolean;

    @Input() showDownload?: boolean;
    @Input() showEmail?: boolean;
    @Input() showPrint?: boolean;

    dataSource: MatTableDataSource<any>;
    defaultSort: any;
    tableOverflow = '';
    tableHeight = '';
    showActions: boolean;
    pageCountArray: number[];
    searchInputFormGroup: FormGroup;
    skipToPageFormGroup: FormGroup;
    expandedElement: any;
    filterIsOpen = false;

    private subscriptions: Subscription = new Subscription();
    private currentPageSize: number;
    private currentPageIndex: number;

    constructor(
        private formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private staffWebTableService: MatTableService
    ) {
        this.buildSearchInputFormGroup();

        if (this.showPagination) {
            if (this.pageSize) {
                this.staffWebTableService.setPageSize(this.pageSize);
            } else {
                this.staffWebTableService.setPageSize(this.pageSizeOptions[0]);
            }
        }
    }

    ngOnInit() {
        this.setupSubscriptions();

        this.defaultSort = this.getDefaultSort();
        this.tableOverflow = this.getOverflow();
        this.tableHeight = this.height ? this.getHeight() : undefined;
        this.showActions = this.hasActions();
    }

    private setupSubscriptions() {
        this.subscriptions.add(
            this.tableData$.pipe(filter((t) => !!t)).subscribe((data) => {
                setTimeout(() => {
                    this.dataSource = new MatTableDataSource<any>(data);
                    this.dataSource.sort = this.sort;

                    if (this.showPagination && this.paginator) {
                        this.dataSource.paginator = this.paginator;

                        const numOfPages = this.paginator.getNumberOfPages();

                        this.pageCountArray = this.getPageCountArray(numOfPages);

                        this.changeDetectorRef.detectChanges();
                    }
                });
            })
        );

        if (this.showPagination) {
            this.subscriptions.add(
                combineLatest([
                    this.staffWebTableService.currentPageIndex$,
                    this.staffWebTableService.currentPageSize$
                ]).subscribe(([pageIndex, pageSize]) => {
                    if (!this.skipToPageFormGroup) {
                        this.buildSkipToPageForm(pageIndex + 1);
                    }

                    setTimeout(() => {
                        this.paginator.pageIndex = pageIndex;
                        this.paginator.pageSize = pageSize;

                        this.paginator.page.emit({
                            pageSize: pageSize,
                            pageIndex: pageIndex,
                            length: this.paginator.getNumberOfPages()
                        });
                    });
                })
            );
        }

        if (this.skipToPageFormGroup) {
            this.subscriptions.add(
                this.skipToPageFormGroup.get('pageIndex').valueChanges.subscribe((value: number) => {
                    const index = value - 1;
                    const size = this.paginator.pageSize;
                    const length = this.paginator.getNumberOfPages();

                    this.staffWebTableService.setPageIndex(index);

                    this.updatePageIndex(index, size, length);
                })
            );
        }
    }

    handlePageChange(event: PageEvent) {
        if (event.pageSize !== this.currentPageSize) {
            this.staffWebTableService.setPageSize(event.pageSize);

            this.currentPageSize = event.pageSize;

            const numOfPages = this.paginator.getNumberOfPages();

            if (this.currentPageIndex > numOfPages - 1) {
                this.skipToPageFormGroup.patchValue({
                    pageIndex: numOfPages
                });
            }

            this.pageCountArray = this.getPageCountArray(numOfPages);

            this.changeDetectorRef.detectChanges();
        } else if (event.pageIndex !== this.currentPageIndex) {
            this.currentPageIndex = event.pageIndex;

            this.skipToPageFormGroup.patchValue(
                {
                    pageIndex: event.pageIndex + 1
                },
                {
                    emitEvent: false
                }
            );
        }
    }

    private updatePageIndex(index: number, size: number, length: number): void {
        this.paginator.pageIndex = index;

        this.currentPageIndex = index;

        this.paginator.page.emit({
            pageSize: size,
            pageIndex: index,
            length: length
        });
    }

    buildSearchInputFormGroup(): void {
        this.searchInputFormGroup = this.formBuilder.group({
            searchInput: new FormControl('')
        });
    }

    clearSearchInput(): void {
        this.searchInputFormGroup.setValue({ searchInput: '' });
        this.dataSource.filter = '';
    }

    buildSkipToPageForm(index: number): void {
        this.skipToPageFormGroup = this.formBuilder.group({
            pageIndex: new FormControl(index)
        });
    }

    performCellAction(column: ColumnConfiguration, value?: any) {
        if (column.cellAction) {
            if (value) {
                column.cellAction(value);
            } else {
                column.cellAction();
            }
        }
    }

    getPipedValue(text: string, column: ColumnConfiguration) {
        return column.pipe.pipe.transform(text, column.pipe.pipeFormat);
    }

    applyFilter(value: string) {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    private getDefaultSort(): any {
        const sortConfig = {
            name: '',
            direction: ''
        };

        for (const column of this.tableConfig.columnConfig) {
            if (column.sortDirection) {
                sortConfig.name = column.columnKey;
                sortConfig.direction = column.sortDirection as MatTableSortDirection;
                break;
            }
        }

        return sortConfig;
    }

    private getHeight(): string {
        if (this.showPagination) {
            return 'auto';
        }

        return `${this.height}px`;
    }

    private getOverflow(): string {
        if (this.height && !this.showPagination) {
            return 'auto';
        }

        return '';
    }

    private hasActions(): boolean {
        return this.showPrint || this.showEmail || this.showDownload;
    }

    private getPageCountArray(numOfPages: number): number[] {
        return Array.from({ length: numOfPages }, (v, i) => i + 1);
    }

    filterTableData(tableData: any): void {
        this.dataSource = new MatTableDataSource<any>(tableData);
        this.dataSource.sort = this.sort;
    }

    emailAction(): void {
        this.email.emit();
    }

    downloadAction(): void {
        this.download.emit();
    }

    printAction(): void {
        this.print.emit();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
