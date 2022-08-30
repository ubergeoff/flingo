import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDemoComponent } from './spinner-demo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '@rooi/spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContentLoaderModule } from '@ngneat/content-loader';

describe('SpinnerDemoComponent', () => {
    let component: SpinnerDemoComponent;
    let fixture: ComponentFixture<SpinnerDemoComponent>;

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
