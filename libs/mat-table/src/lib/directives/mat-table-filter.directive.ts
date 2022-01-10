import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnInit,
    Output,
    ViewContainerRef,
    EventEmitter
} from '@angular/core';

@Directive({
    selector: '[rooiMatTableFilter]'
})
export class MatTableFilterDirective implements OnInit {
    @Input() component: any;
    @Input() tableData: any;
    @Output() filteredData = new EventEmitter();

    rowComponentRef: ComponentRef<any>;

    constructor(private vc: ViewContainerRef, private resolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.setupRowComponent();
    }

    setupRowComponent() {
        const factory = this.resolver.resolveComponentFactory(this.component);
        this.rowComponentRef = this.vc.createComponent(factory);
        this.rowComponentRef.instance.tableDataInput = this.tableData;
        this.rowComponentRef.instance.filteredData = this.filteredData;
    }
}
