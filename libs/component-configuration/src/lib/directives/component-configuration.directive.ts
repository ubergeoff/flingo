import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[rooiComponentConfig]'
})
export class ComponentConfigurationDirective implements OnInit {
    @Input() component: any;
    @Input() config: any;

    configurationComponentRef: ComponentRef<any> | undefined;

    constructor(private vc: ViewContainerRef, private resolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.setupRowComponent();
    }

    setupRowComponent() {
        const factory = this.resolver.resolveComponentFactory(this.component);
        this.configurationComponentRef = this.vc.createComponent(factory);
        this.configurationComponentRef.instance.componentConfiguration = this.config;
    }
}
