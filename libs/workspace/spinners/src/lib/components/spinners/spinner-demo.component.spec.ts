import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDemoComponent } from './spinner-demo.component';
import { GridModule } from '@rooi/grid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('GridDemoComponent', () => {
    let component: SpinnerDemoComponent;
    let fixture: ComponentFixture<SpinnerDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [GridModule, MatDialogModule, MatButtonModule],
            declarations: [SpinnerDemoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinnerDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
