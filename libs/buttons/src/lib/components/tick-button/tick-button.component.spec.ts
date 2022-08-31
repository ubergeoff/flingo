import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TickButtonComponent } from './tick-button.component';
import { MatIconModule } from '@angular/material/icon';

describe('TickButtonComponent', () => {
    let component: TickButtonComponent;
    let fixture: ComponentFixture<TickButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [MatIconModule],
                declarations: [TickButtonComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TickButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
