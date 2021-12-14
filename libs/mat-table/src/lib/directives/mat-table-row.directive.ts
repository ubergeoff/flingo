import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[rooiMatTableRow]'
})
export class MatTableRowDirective implements OnInit {
    @Input() component: any;
    @Input() listItem: any;

    rowComponentRef: ComponentRef<any>;

    constructor(private vc: ViewContainerRef, private resolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.setupRowComponent();
    }

    setupRowComponent() {
        const factory = this.resolver.resolveComponentFactory(this.component);
        this.rowComponentRef = this.vc.createComponent(factory);
        this.rowComponentRef.instance.listItem = this.listItem;
    }
}
