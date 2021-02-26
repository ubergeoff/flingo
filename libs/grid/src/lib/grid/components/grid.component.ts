import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Grid, h, PluginPosition } from 'gridjs';
import { OneDArray, TColumn, TData } from 'gridjs/dist/src/types';

@Component({
    selector: 'rooi-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
    @Input() columns: OneDArray<TColumn>;
    @Input() data: TData[];
    @Input() search = false;

    private grid: Grid;
    private resolver: (data: TData[]) => void;

    isLoading = true;

    constructor() {}

    ngOnInit(): void {
        this.grid = new Grid({
            search: this.search,
            columns: this.columns,
            data: () =>
                new Promise((resolve) => {
                    this.resolver = resolve;
                })
        });

        this.grid.render(document.getElementById('gridjs_wrapper'));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data?.currentValue && this.isLoading && this.resolver) {
            this.isLoading = false;
            this.resolver(this.data);
        }
    }
}
