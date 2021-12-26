import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionButtonComponent } from './action-button.component';

describe('NewButtonComponent', () => {
    let component: ActionButtonComponent;
    let fixture: ComponentFixture<ActionButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ActionButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
