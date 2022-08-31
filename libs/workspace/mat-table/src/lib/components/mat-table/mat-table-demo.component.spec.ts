import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatTableDemoComponent } from './mat-table-demo.component';
import { RooiMatTableModule } from '@rooi/mat-table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('MatTableDemoComponent', () => {
    let component: MatTableDemoComponent;
    let fixture: ComponentFixture<MatTableDemoComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RooiMatTableModule, NoopAnimationsModule, CommonModule],
                declarations: [MatTableDemoComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MatTableDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
