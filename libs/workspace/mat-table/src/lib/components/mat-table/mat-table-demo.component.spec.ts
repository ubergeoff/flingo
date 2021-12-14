import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableDemoComponent } from './mat-table-demo.component';

describe('MatTableDemoComponent', () => {
    let component: MatTableDemoComponent;
    let fixture: ComponentFixture<MatTableDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MatTableDemoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatTableDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
