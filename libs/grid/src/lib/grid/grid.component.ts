import { Component, OnInit } from '@angular/core';
import { Grid, h } from 'gridjs';

@Component({
    selector: 'rooi-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        const grid = new Grid({
            columns: [
                'Name',
                'Email',
                'Phone Number',
                {
                    name: 'Actions',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className: 'mat-raised-button mat-button-base mat-primary',
                                onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                            },
                            'Edit'
                        );
                    }
                }
            ],
            data: [
                ['John', 'john@example.com', '(353) 01 222 3333', null],
                ['Mark', 'mark@gmail.com', '(01) 22 888 4444', null]
            ]
        }).render(document.getElementById('gridjs_wrapper'));
    }
}
