import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Grid } from 'gridjs';

@Component({
    selector: 'rooi-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
    @Input() columns: Array<any>;
    @Input() data: any[];
    @Input() search = false;

    private grid: Grid;
    private resolver: (data: any[]) => void;

    isLoading = true;

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
