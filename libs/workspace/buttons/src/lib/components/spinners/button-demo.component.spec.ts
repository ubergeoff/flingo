import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '@rooi/spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { ButtonDemoComponent } from './button-demo.component';

describe('SpinnerDemoComponent', () => {
    let component: ButtonDemoComponent;
    let fixture: ComponentFixture<ButtonDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SpinnerModule,
                MatDialogModule,
                MatButtonModule,
                MatCardModule,
                MatProgressBarModule,
                ContentLoaderModule
            ],
            declarations: [ButtonDemoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
