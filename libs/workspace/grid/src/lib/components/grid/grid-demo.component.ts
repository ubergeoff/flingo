import { Component, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActionButtonComponent } from '../controls/action-button/action-button.component';
import { createDivContainer } from '@rooi/grid';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'rooi-grid-demo',
    templateUrl: './grid-demo.component.html',
    styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent implements OnInit {
    columns: Array<any> = [
        {
            name: 'CheckBox',
            sort: false,
            width: '5px',
            formatter: (cellData) => {
                return createDivContainer((div) => {
                    div.appendChild(this.createCheckBox(cellData).location.nativeElement);
                });
            }
        },
        'Name',
        'Email',
        'Phone Number',
        {
            name: 'Button',
            sort: false,
            width: '30px',
            formatter: (cellData) => {
                return createDivContainer((div) => {
                    div.appendChild(this.createButton(cellData).location.nativeElement);
                });
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
            [true, 'John', 'john@example.com', '(353) 01 222 3333', 22],
            [false, 'Mark', 'mark@gmail.com', '(01) 22 888 4444', 33]
        ]);
    }

    openModal(rowData) {
        this.dialog.open(DialogComponent, { data: rowData });
    }

    createComponent<T>(type: Type<T>): ComponentRef<T> {
        const componentFactory = this.componentFactory.resolveComponentFactory(type);
        return this.viewContainerRef.createComponent<T>(componentFactory);
    }

    createButton(cellData) {
        const button = this.createComponent<ActionButtonComponent>(ActionButtonComponent);
        button.instance.eventFunction = () => this.openModal(cellData);

        return button;
    }

    createCheckBox(cellData) {
        const checkBox = this.createComponent<MatCheckbox>(MatCheckbox);
        checkBox.instance.checked = cellData;

        return checkBox;
    }
}
