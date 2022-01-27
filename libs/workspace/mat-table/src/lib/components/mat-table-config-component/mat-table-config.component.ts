import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDemoService } from '../../services/mat-table-demo.service';

@Component({
    templateUrl: './mat-table-config.component.html',
    styleUrls: ['./mat-table-config.component.scss']
})
export class MatTableConfigComponent {
    @Output() updatedComponentConfig = new EventEmitter();

    componentConfiguration: any;

    constructor(private matTableDemoService: MatTableDemoService) {}

    toggleRowExpansion(): void {
        this.componentConfiguration.enableRowExpansion = !this.componentConfiguration.enableRowExpansion;
        this.matTableDemoService.setExpandedRowComponent(this.componentConfiguration.enableRowExpansion);
    }
}
