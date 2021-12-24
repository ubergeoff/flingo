import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridDemoComponent } from './grid-demo.component';
import { GridModule } from '@rooi/grid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('GridDemoComponent', () => {
    let component: GridDemoComponent;
    let fixture: ComponentFixture<GridDemoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GridModule, MatDialogModule, MatButtonModule],
            declarations: [GridDemoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
