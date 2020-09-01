import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickModule } from '@rooi/slick';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { VariableWidthSlickComponent } from './variabe-width-slick.component';

describe('VariableWidthSlickComponent', () => {
    let component: VariableWidthSlickComponent;
    let fixture: ComponentFixture<VariableWidthSlickComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SlickModule, MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatIconModule],
            declarations: [VariableWidthSlickComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariableWidthSlickComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
