import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableSearchComponent } from './mat-table-search.component';

describe('MatTableDemoComponent', () => {
    let component: MatTableSearchComponent;
    let fixture: ComponentFixture<MatTableSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MatTableSearchComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatTableSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
