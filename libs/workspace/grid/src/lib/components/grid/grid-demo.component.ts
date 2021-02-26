import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { OneDArray } from 'gridjs/dist/src/types';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { createDivContainer } from '@rooi/grid';

@Component({
    selector: 'rooi-grid-demo',
    templateUrl: './grid-demo.component.html',
    styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent implements OnInit {
    columns: OneDArray<any> = [
        'Name',
        'Email',
        'Phone Number',
        {
            name: 'Trend',
            sort: false,
            width: '100px',
            formatter: (cellData) => {
                return createDivContainer((div) => this.addButton(div, cellData));
            }
        }
    ];

    data$: Observable<any[]>;
    private dataSubject = new BehaviorSubject<any[]>([]);

    constructor(
        private dialog: MatDialog,
        private componentFactory: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit(): void {
        this.data$ = this.dataSubject.pipe(debounceTime(1000));

        this.dataSubject.next([
            ['John', 'john@example.com', '(353) 01 222 3333', 22],
            ['Mark', 'mark@gmail.com', '(01) 22 888 4444', 33]
        ]);
    }

    openModal(row) {
        //alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`);
        this.dialog.open(DialogComponent);
    }

    private createComponent(type: any): ComponentRef<any> {
        const componentFactory = this.componentFactory.resolveComponentFactory(type);
        return this.viewContainerRef.createComponent(componentFactory);
    }

    private addButton(div, cellData) {
        const button = this.createComponent(ActionButtonComponent);
        (button.instance as ActionButtonComponent).eventFunction = () => this.openModal(cellData);
        div.appendChild(button.location.nativeElement);
    }
}
